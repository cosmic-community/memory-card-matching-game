'use client'

import { useState } from 'react'
import DifficultySelector from '@/components/DifficultySelector'
import GameBoard from '@/components/GameBoard'
import GameControls from '@/components/GameControls'
import GameStats from '@/components/GameStats'
import HighScoreDisplay from '@/components/HighScoreDisplay'
import WinModal from '@/components/WinModal'
import { useGameState } from '@/hooks/useGameState'
import { Difficulty } from '@/types'

export default function HomePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [gameStarted, setGameStarted] = useState(false)
  
  const {
    cards,
    flippedCards,
    matchedCards,
    moves,
    timeElapsed,
    gameWon,
    startGame,
    flipCard,
    resetGame
  } = useGameState(difficulty)

  const handleStartGame = () => {
    startGame()
    setGameStarted(true)
  }

  const handleResetGame = () => {
    resetGame()
    setGameStarted(false)
  }

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
    if (gameStarted) {
      handleResetGame()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🧠 Memory Card Game
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow">
            Test your memory by matching pairs of cards!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Controls Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Game Settings</h2>
              <DifficultySelector
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                disabled={gameStarted}
              />
              <GameControls
                onStartGame={handleStartGame}
                onResetGame={handleResetGame}
                gameStarted={gameStarted}
                gameWon={gameWon}
              />
            </div>

            {gameStarted && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Stats</h2>
                <GameStats
                  moves={moves}
                  timeElapsed={timeElapsed}
                  matchedPairs={matchedCards.length / 2}
                  totalPairs={cards.length / 2}
                />
              </div>
            )}

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">High Scores</h2>
              <HighScoreDisplay difficulty={difficulty} />
            </div>
          </div>

          {/* Game Board Section */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl">
              {gameStarted ? (
                <GameBoard
                  cards={cards}
                  flippedCards={flippedCards}
                  matchedCards={matchedCards}
                  onCardClick={flipCard}
                />
              ) : (
                <div className="flex items-center justify-center h-96 text-center">
                  <div>
                    <div className="text-6xl mb-4">🎮</div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                      Ready to Play?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Select your difficulty level and click "Start Game" to begin!
                    </p>
                    <div className="text-sm text-gray-500">
                      <p><strong>Easy:</strong> 4×3 grid (12 cards)</p>
                      <p><strong>Medium:</strong> 4×4 grid (16 cards)</p>
                      <p><strong>Hard:</strong> 6×4 grid (24 cards)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Win Modal */}
        {gameWon && (
          <WinModal
            moves={moves}
            timeElapsed={timeElapsed}
            difficulty={difficulty}
            onPlayAgain={handleResetGame}
          />
        )}
      </div>
    </main>
  )
}