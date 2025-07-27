'use client'

import { Difficulty } from '@/types'
import { getDifficultyDisplayName, getDifficultyDescription } from '@/lib/gameLogic'

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
  disabled?: boolean
}

const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert']

export default function DifficultySelector({
  selectedDifficulty,
  onDifficultyChange,
  disabled = false,
}: DifficultySelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Choose Difficulty Level
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => onDifficultyChange(difficulty)}
            disabled={disabled}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedDifficulty === difficulty
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
              }
              ${disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer hover:shadow-md'
              }
              focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50
            `}
          >
            <div className={`font-semibold mb-1 ${
              selectedDifficulty === difficulty ? 'text-primary-700' : 'text-gray-900'
            }`}>
              {getDifficultyDisplayName(difficulty)}
            </div>
            <div className="text-sm text-gray-600">
              {getDifficultyDescription(difficulty)}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}