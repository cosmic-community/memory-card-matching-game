'use client'

import { useEffect, useState } from 'react'
import { HighScores, Difficulty } from '@/types'
import { getHighScores, getDifficultyDisplayName } from '@/lib/gameLogic'

export default function HighScoreDisplay() {
  const [highScores, setHighScores] = useState<HighScores | null>(null)

  useEffect(() => {
    setHighScores(getHighScores())
  }, [])

  if (!highScores) {
    return null
  }

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert']
  const hasAnyScores = difficulties.some((diff) => highScores[diff] > 0)

  if (!hasAnyScores) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          🏆 High Scores
        </h3>
        <div className="text-center text-gray-500">
          No high scores yet. Play a game to set your first record!
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        🏆 High Scores
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {difficulties.map((difficulty) => (
          <div
            key={difficulty}
            className="text-center p-4 bg-gray-50 rounded-lg border"
          >
            <div className="text-sm font-medium text-gray-600 mb-1">
              {getDifficultyDisplayName(difficulty)}
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {highScores[difficulty] || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}