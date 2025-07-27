'use client'

import { useState, useCallback, useEffect } from 'react'
import { GameState, Difficulty, Card, GameSessionData } from '@/types'
import {
  createInitialGameState,
  areCardsMatching,
  calculateScore,
  calculateAccuracy,
  saveHighScore,
  isGameWon,
  DIFFICULTY_CONFIGS,
} from '@/lib/gameLogic'

export function useGameState(initialDifficulty: Difficulty = 'easy') {
  const [gameState, setGameState] = useState<GameState>(() => {
    const initial = createInitialGameState(initialDifficulty)
    // Ensure the game starts in a playing state so cards are clickable
    return {
      ...initial,
      gameStatus: 'playing'
    }
  })
  const [gameTime, setGameTime] = useState<number>(0)
  const [isGameActive, setIsGameActive] = useState<boolean>(false)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isGameActive && gameState.gameStatus === 'playing') {
      interval = setInterval(() => {
        setGameTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isGameActive, gameState.gameStatus])

  // Start a new game
  const startNewGame = useCallback((difficulty: Difficulty) => {
    const newState = createInitialGameState(difficulty)
    setGameState({
      ...newState,
      gameStatus: 'playing' // Ensure new games start in playing state
    })
    setGameTime(0)
    setIsGameActive(false)
  }, [])

  // Start the timer when first card is flipped
  const startTimer = useCallback(() => {
    if (!isGameActive) {
      setIsGameActive(true)
      setGameState((prev) => ({
        ...prev,
        gameStatus: 'playing',
        startTime: Date.now(),
      }))
    }
  }, [isGameActive])

  // Flip a card
  const flipCard = useCallback((cardId: number) => {
    setGameState((prevState) => {
      // Don't allow flipping if game is won
      if (prevState.gameStatus === 'won') return prevState

      const cardToFlip = prevState.cards.find((card) => card.id === cardId)
      if (!cardToFlip || cardToFlip.isFlipped || cardToFlip.isMatched) {
        return prevState
      }

      // Don't allow more than 2 cards to be flipped at once
      if (prevState.flippedCards.length >= 2) {
        return prevState
      }

      // If this is the first move, start the timer
      if (prevState.moves === 0) {
        setIsGameActive(true)
      }

      const newFlippedCards = [...prevState.flippedCards, cardId]
      
      // Update cards state
      const newCards = prevState.cards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )

      let newGameState: GameState = {
        ...prevState,
        cards: newCards,
        flippedCards: newFlippedCards,
        gameStatus: 'playing',
        startTime: prevState.startTime || Date.now(),
        moves: prevState.moves + 1,
      }

      // Check for matches when two cards are flipped
      if (newFlippedCards.length === 2) {
        const [firstCardId, secondCardId] = newFlippedCards
        const firstCard = newCards.find((card) => card.id === firstCardId)
        const secondCard = newCards.find((card) => card.id === secondCardId)

        if (firstCard && secondCard && areCardsMatching(firstCard, secondCard)) {
          // Cards match!
          const updatedCards = newCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          )

          const newMatchedPairs = [...prevState.matchedPairs, firstCard.pairId]

          newGameState = {
            ...newGameState,
            cards: updatedCards,
            flippedCards: [],
            matchedPairs: newMatchedPairs,
          }

          // Check if game is won
          const config = DIFFICULTY_CONFIGS[prevState.difficulty]
          if (newMatchedPairs.length === config.pairs) {
            const endTime = Date.now()
            const timeInSeconds = Math.floor((endTime - newGameState.startTime) / 1000)
            const finalScore = calculateScore(
              prevState.difficulty,
              newGameState.moves,
              timeInSeconds,
              newMatchedPairs.length
            )

            newGameState = {
              ...newGameState,
              gameStatus: 'won',
              endTime,
              score: finalScore,
            }

            setIsGameActive(false)
          }
        } else {
          // Cards don't match - flip them back after a delay
          setTimeout(() => {
            setGameState((current) => ({
              ...current,
              cards: current.cards.map((card) =>
                card.id === firstCardId || card.id === secondCardId
                  ? { ...card, isFlipped: false }
                  : card
              ),
              flippedCards: [],
            }))
          }, 1000)
        }
      }

      return newGameState
    })
  }, [])

  // Pause/resume game
  const togglePause = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: prev.gameStatus === 'paused' ? 'playing' : 'paused',
    }))
    setIsGameActive((prev) => !prev)
  }, [])

  // Get game session data for statistics
  const getGameSessionData = useCallback((): GameSessionData | null => {
    if (gameState.gameStatus !== 'won' || !gameState.endTime) {
      return null
    }

    const timeInSeconds = Math.floor((gameState.endTime - gameState.startTime) / 1000)
    const config = DIFFICULTY_CONFIGS[gameState.difficulty]
    const accuracy = calculateAccuracy(gameState.moves, config.pairs)
    const isNewRecord = saveHighScore(gameState.difficulty, gameState.score)

    return {
      difficulty: gameState.difficulty,
      moves: gameState.moves,
      time: timeInSeconds,
      score: gameState.score,
      accuracy,
      isNewRecord,
    }
  }, [gameState])

  return {
    gameState,
    gameTime,
    isGameActive,
    startNewGame,
    flipCard,
    togglePause,
    getGameSessionData,
  }
}