'use client'

import { GameSessionData, Difficulty } from '@/types'
import { formatTime, getDifficultyDisplayName } from '@/lib/gameLogic'

interface WinModalProps {
  isOpen: boolean
  gameData: GameSessionData
  onNewGame: () => void
  onChangeDifficulty: (difficulty: Difficulty) => void
}

export default function WinModal({
  isOpen,
  gameData,
  onNewGame,
  onChangeDifficulty,
}: WinModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-bounce-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Congratulations!
          </h2>
          {gameData.isNewRecord && (
            <div className="inline-flex items-center px-3 py-1 bg-warning-100 text-warning-800 rounded-full text-sm font-medium">
              🏆 New High Score!
            </div>
          )}
        </div>

        {/* Game Statistics */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Difficulty:</span>
            <span className="font-semibold">
              {getDifficultyDisplayName(gameData.difficulty)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Final Score:</span>
            <span className="font-bold text-primary-600 text-lg">
              {gameData.score}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Time:</span>
            <span className="font-semibold">{formatTime(gameData.time)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Moves:</span>
            <span className="font-semibold">{gameData.moves}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Accuracy:</span>
            <span className="font-semibold">{gameData.accuracy}%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onNewGame}
            className="
              flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg
              transition-colors duration-200 shadow-md hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50
            "
          >
            Play Again
          </button>
          
          <div className="flex gap-2">
            {gameData.difficulty !== 'easy' && (
              <button
                onClick={() => {
                  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert']
                  const currentIndex = difficulties.indexOf(gameData.difficulty)
                  const easierDifficulty = difficulties[currentIndex - 1]
                  if (easierDifficulty) {
                    onChangeDifficulty(easierDifficulty)
                  }
                }}
                className="
                  px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
                "
              >
                Easier
              </button>
            )}
            
            {gameData.difficulty !== 'expert' && (
              <button
                onClick={() => {
                  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert']
                  const currentIndex = difficulties.indexOf(gameData.difficulty)
                  const harderDifficulty = difficulties[currentIndex + 1]
                  if (harderDifficulty) {
                    onChangeDifficulty(harderDifficulty)
                  }
                }}
                className="
                  px-4 py-3 bg-success-500 hover:bg-success-600 text-white font-medium rounded-lg
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-success-400 focus:ring-opacity-50
                "
              >
                Harder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}