import { Card, Difficulty, GameState, DifficultyConfigs, HighScores } from '@/types'

// Game symbols using emojis for better visual appeal
const GAME_SYMBOLS = [
  '🎮', '🎯', '🎲', '🃏', '🎪', '🎨', '🎭', '🎸', '🎹', '🎤',
  '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🥅', '⛳',
  '🍎', '🍌', '🍇', '🍓', '🥝', '🍑', '🥭', '🍍', '🥥', '🍊',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🌟', '⭐', '✨', '💫', '🌙', '☀️', '⚡', '🔥', '💎', '🎈',
  '🚀', '✈️', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑'
]

// Difficulty configurations
export const DIFFICULTY_CONFIGS: DifficultyConfigs = {
  easy: {
    pairs: 6,
    gridCols: 4,
    gridRows: 3,
    baseScore: 100,
    timeBonus: 10,
    difficultyMultiplier: 1,
  },
  medium: {
    pairs: 8,
    gridCols: 4,
    gridRows: 4,
    baseScore: 150,
    timeBonus: 15,
    difficultyMultiplier: 1.5,
  },
  hard: {
    pairs: 12,
    gridCols: 6,
    gridRows: 4,
    baseScore: 200,
    timeBonus: 20,
    difficultyMultiplier: 2,
  },
  expert: {
    pairs: 18,
    gridCols: 6,
    gridRows: 6,
    baseScore: 300,
    timeBonus: 25,
    difficultyMultiplier: 3,
  },
}

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    const other = shuffled[j]
    if (temp !== undefined && other !== undefined) {
      shuffled[i] = other
      shuffled[j] = temp
    }
  }
  return shuffled
}

// Generate cards for a given difficulty
export function generateCards(difficulty: Difficulty): Card[] {
  const config = DIFFICULTY_CONFIGS[difficulty]
  const selectedSymbols = GAME_SYMBOLS.slice(0, config.pairs)
  
  // Create pairs of cards
  const cardPairs: Card[] = []
  selectedSymbols.forEach((symbol, index) => {
    // First card of the pair
    cardPairs.push({
      id: index * 2,
      symbol,
      isFlipped: false,
      isMatched: false,
      pairId: index,
    })
    
    // Second card of the pair
    cardPairs.push({
      id: index * 2 + 1,
      symbol,
      isFlipped: false,
      isMatched: false,
      pairId: index,
    })
  })
  
  // Shuffle the cards
  return shuffleArray(cardPairs)
}

// Check if two cards are a match
export function areCardsMatching(card1: Card, card2: Card): boolean {
  return card1.pairId === card2.pairId && card1.id !== card2.id
}

// Calculate score based on game performance
export function calculateScore(
  difficulty: Difficulty,
  moves: number,
  timeInSeconds: number,
  matchedPairs: number
): number {
  const config = DIFFICULTY_CONFIGS[difficulty]
  const totalPairs = config.pairs
  
  // Base score for each matched pair
  const baseScore = matchedPairs * config.baseScore
  
  // Time bonus (faster completion = higher bonus)
  const maxTime = totalPairs * 30 // 30 seconds per pair as baseline
  const timeBonus = Math.max(0, (maxTime - timeInSeconds) * config.timeBonus)
  
  // Accuracy bonus (fewer moves = higher bonus)
  const minMoves = totalPairs * 2 // Perfect game would be exactly 2 moves per pair
  const accuracyBonus = Math.max(0, (minMoves * 2 - moves) * 10)
  
  // Apply difficulty multiplier
  const totalScore = (baseScore + timeBonus + accuracyBonus) * config.difficultyMultiplier
  
  return Math.round(Math.max(0, totalScore))
}

// Calculate accuracy percentage
export function calculateAccuracy(moves: number, totalPairs: number): number {
  const perfectMoves = totalPairs * 2
  const accuracy = (perfectMoves / Math.max(moves, perfectMoves)) * 100
  return Math.round(Math.min(100, accuracy))
}

// Get high scores from localStorage
export function getHighScores(): HighScores {
  if (typeof window === 'undefined') {
    return { easy: 0, medium: 0, hard: 0, expert: 0 }
  }
  
  try {
    const stored = localStorage.getItem('memoryGameHighScores')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error reading high scores from localStorage:', error)
  }
  
  return { easy: 0, medium: 0, hard: 0, expert: 0 }
}

// Save high score to localStorage
export function saveHighScore(difficulty: Difficulty, score: number): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const highScores = getHighScores()
    const currentBest = highScores[difficulty] || 0
    
    if (score > currentBest) {
      highScores[difficulty] = score
      localStorage.setItem('memoryGameHighScores', JSON.stringify(highScores))
      return true // New record!
    }
  } catch (error) {
    console.error('Error saving high score to localStorage:', error)
  }
  
  return false
}

// Format time in MM:SS format
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Create initial game state - now starts in 'playing' state for immediate interaction
export function createInitialGameState(difficulty: Difficulty): GameState {
  return {
    cards: generateCards(difficulty),
    flippedCards: [],
    matchedPairs: [],
    moves: 0,
    score: 0,
    gameStatus: 'idle', // Will be set to 'playing' in useGameState
    startTime: 0,
    endTime: undefined,
    difficulty,
  }
}

// Check if game is won
export function isGameWon(gameState: GameState): boolean {
  const config = DIFFICULTY_CONFIGS[gameState.difficulty]
  return gameState.matchedPairs.length === config.pairs
}

// Get difficulty display name
export function getDifficultyDisplayName(difficulty: Difficulty): string {
  const names = {
    easy: 'Easy (4×3)',
    medium: 'Medium (4×4)',
    hard: 'Hard (6×4)',
    expert: 'Expert (6×6)',
  }
  return names[difficulty]
}

// Get difficulty description
export function getDifficultyDescription(difficulty: Difficulty): string {
  const descriptions = {
    easy: 'Perfect for beginners - 12 cards to match',
    medium: 'A balanced challenge - 16 cards to match',
    hard: 'Getting serious - 24 cards to match',
    expert: 'Ultimate challenge - 36 cards to match',
  }
  return descriptions[difficulty]
}