'use client'

import { useState } from 'react'
import { Difficulty, GameSessionData } from '@/types'
import { getDifficultyDisplayName } from '@/lib/gameLogic'

interface WinModalProps {
  isOpen: boolean
  gameData: GameSessionData
  difficulty: Difficulty
  onNewGame: () => void
  onChangeDifficulty: (difficulty: Difficulty) => void
}

const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert']

export default function WinModal({
  isOpen,
  gameData,
  difficulty,
  onNewGame,
  onChangeDifficulty,
}: WinModalProps) {
  const [showDifficultySelector, setShowDifficultySelector] = useState(false)

  if (!isOpen) return null

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    onChangeDifficulty(newDifficulty)
    setShowDifficultySelector(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div className="text-center">
          {/* Celebration Icon */}
          <div className="text-6xl mb-4">🎉</div>
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Congratulations!
          </h2>
          
          {/* New Record Badge */}
          {gameData.isNewRecord && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
              🏆 New High Score!
            </div>
          )}

          {/* Game Stats */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{gameData.moves}</div>
                <div className="text-gray-600">Moves</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{formatTime(gameData.time)}</div>
                <div className="text-gray-600">Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{gameData.score}</div>
                <div className="text-gray-600">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{gameData.accuracy}%</div>
                <div className="text-gray-600">Accuracy</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-sm text-gray-600">Difficulty</div>
                <div className="text-lg font-semibold text-gray-800">
                  {getDifficultyDisplayName(gameData.difficulty)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onNewGame}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Play Again
            </button>
            
            <button
              onClick={() => setShowDifficultySelector(!showDifficultySelector)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Change Difficulty
            </button>

            {/* Difficulty Selector */}
            {showDifficultySelector && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => handleDifficultyChange(diff)}
                      className={`p-2 rounded text-sm font-medium transition-colors duration-200 ${
                        diff === difficulty
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {getDifficultyDisplayName(diff)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}