export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

export type GameStatus = 'idle' | 'playing' | 'won' | 'paused'

export interface Card {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
  pairId: number
}

export interface GameState {
  cards: Card[]
  flippedCards: number[]
  matchedPairs: number[]
  moves: number
  score: number
  gameStatus: GameStatus
  startTime: number
  endTime?: number
  difficulty: Difficulty
}

export interface GameStats {
  moves: number
  time: number
  score: number
  accuracy: number
  difficulty: Difficulty
  completionDate: string
}

export interface HighScores {
  easy: number
  medium: number
  hard: number
  expert: number
}

export interface DifficultyConfig {
  pairs: number
  gridCols: number
  gridRows: number
  baseScore: number
  timeBonus: number
  difficultyMultiplier: number
}

export type DifficultyConfigs = {
  [K in Difficulty]: DifficultyConfig
}

export interface GameSessionData {
  difficulty: Difficulty
  moves: number
  time: number
  score: number
  accuracy: number
  isNewRecord: boolean
}