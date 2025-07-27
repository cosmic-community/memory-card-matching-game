'use client'

import { GameState } from '@/types'
import { DIFFICULTY_CONFIGS } from '@/lib/gameLogic'
import GameCard from './GameCard'

interface GameBoardProps {
  gameState: GameState
  onCardClick: (cardId: number) => void
}

export default function GameBoard({ gameState, onCardClick }: GameBoardProps) {
  const config = DIFFICULTY_CONFIGS[gameState.difficulty]
  const isClickable = gameState.gameStatus === 'playing' && gameState.flippedCards.length < 2

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div
        className={`
          grid gap-3 mx-auto
          ${gameState.difficulty === 'easy' ? 'grid-cols-4 max-w-lg' : ''}
          ${gameState.difficulty === 'medium' ? 'grid-cols-4 max-w-xl' : ''}
          ${gameState.difficulty === 'hard' ? 'grid-cols-6 max-w-3xl' : ''}
          ${gameState.difficulty === 'expert' ? 'grid-cols-6 max-w-4xl' : ''}
        `}
        style={{
          gridTemplateRows: `repeat(${config.gridRows}, minmax(0, 1fr))`,
        }}
      >
        {gameState.cards.map((card) => (
          <GameCard
            key={card.id}
            card={card}
            onClick={onCardClick}
            isClickable={isClickable}
          />
        ))}
      </div>
    </div>
  )
}