'use client'

import { Difficulty, GameSessionData } from '@/types'
import { getDifficultyDisplayName } from '@/lib/gameLogic'

interface WinModalProps {
  isOpen: boolean
  gameData: GameSessionData
  onNewGame: () => void
  onChangeDifficulty: (difficulty: Difficulty) => void
  difficulty?: Difficulty
}

export default function WinModal({
  isOpen,
  gameData,
  onNewGame,
  onChangeDifficulty,
  difficulty
}: WinModalProps) {
  if (!isOpen) return null

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert']

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Congratulations!
          </h2>
          <p className="text-gray-600">
            You completed the {getDifficultyDisplayName(gameData.difficulty)} level!
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {gameData.moves}
              </div>
              <div className="text-sm text-gray-600">Moves</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formatTime(gameData.time)}
              </div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {gameData.score}
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {gameData.accuracy.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>
          
          {gameData.isNewRecord && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                🏆 New High Score!
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={onNewGame}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Play Again
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => onChangeDifficulty(diff)}
                className={`
                  py-2 px-3 rounded-lg font-medium text-sm transition-colors duration-200
                  ${diff === gameData.difficulty
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }
                `}
                disabled={diff === gameData.difficulty}
              >
                {getDifficultyDisplayName(diff)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}