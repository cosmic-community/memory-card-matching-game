'use client'

import { GameState } from '@/types'
import { formatTime, DIFFICULTY_CONFIGS } from '@/lib/gameLogic'

interface GameStatsProps {
  gameState: GameState
  gameTime: number
}

export default function GameStats({ gameState, gameTime }: GameStatsProps) {
  const config = DIFFICULTY_CONFIGS[gameState.difficulty]
  const matchedPairs = gameState.matchedPairs.length
  const totalPairs = config.pairs
  const progressPercentage = (matchedPairs / totalPairs) * 100

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Moves */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{gameState.moves}</div>
          <div className="text-sm text-gray-600">Moves</div>
        </div>

        {/* Time */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{formatTime(gameTime)}</div>
          <div className="text-sm text-gray-600">Time</div>
        </div>

        {/* Matches */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {matchedPairs}/{totalPairs}
          </div>
          <div className="text-sm text-gray-600">Pairs</div>
        </div>

        {/* Score */}
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">{gameState.score}</div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}