'use client'

import { GameStatus, Difficulty } from '@/types'

interface GameControlsProps {
  gameStatus: GameStatus
  difficulty: Difficulty
  onNewGame: () => void
  onPause?: () => void
  isGameActive: boolean
}

export default function GameControls({
  gameStatus,
  difficulty,
  onNewGame,
  onPause,
  isGameActive,
}: GameControlsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-4 mb-6">
      {/* New Game Button */}
      <button
        onClick={onNewGame}
        className="
          px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg
          transition-colors duration-200 shadow-md hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50
        "
      >
        New Game
      </button>

      {/* Pause/Resume Button */}
      {(gameStatus === 'playing' || gameStatus === 'paused') && onPause && (
        <button
          onClick={onPause}
          className="
            px-6 py-3 bg-warning-500 hover:bg-warning-600 text-white font-semibold rounded-lg
            transition-colors duration-200 shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-warning-400 focus:ring-opacity-50
          "
        >
          {gameStatus === 'paused' ? 'Resume' : 'Pause'}
        </button>
      )}

      {/* Game Status Indicator */}
      <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
        <div className="flex items-center">
          <div
            className={`
              w-3 h-3 rounded-full mr-2
              ${gameStatus === 'playing' ? 'bg-success-500 animate-pulse' : ''}
              ${gameStatus === 'paused' ? 'bg-warning-500' : ''}
              ${gameStatus === 'won' ? 'bg-primary-500' : ''}
              ${gameStatus === 'idle' ? 'bg-gray-400' : ''}
            `}
          />
          <span className="text-sm font-medium text-gray-700 capitalize">
            {gameStatus === 'idle' ? 'Ready to Play' : gameStatus}
          </span>
        </div>
      </div>
    </div>
  )
}