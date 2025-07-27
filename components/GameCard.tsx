'use client'

import { Card } from '@/types'

interface GameCardProps {
  card: Card
  onClick: (cardId: number) => void
  isClickable: boolean
}

export default function GameCard({ card, onClick, isClickable }: GameCardProps) {
  const handleClick = () => {
    if (isClickable && !card.isFlipped && !card.isMatched) {
      onClick(card.id)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isClickable || card.isFlipped || card.isMatched}
      className={`
        relative w-full aspect-square rounded-lg border-2 transition-all duration-300 transform
        ${card.isFlipped || card.isMatched
          ? 'bg-white border-blue-500 shadow-lg'
          : 'bg-blue-600 border-blue-700 hover:bg-blue-500 shadow-md'
        }
        ${card.isMatched
          ? 'animate-pulse ring-2 ring-green-500 ring-opacity-50'
          : ''
        }
        ${isClickable && !card.isFlipped && !card.isMatched
          ? 'hover:scale-105 cursor-pointer hover:shadow-lg active:scale-95'
          : 'cursor-default'
        }
        disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
      `}
    >
      {/* Card back */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center rounded-lg transition-opacity duration-300
          ${card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100'}
        `}
      >
        <div className="text-2xl font-bold text-white">?</div>
      </div>

      {/* Card front */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center rounded-lg transition-all duration-300
          ${card.isFlipped || card.isMatched ? 'opacity-100 transform rotate-0' : 'opacity-0 transform rotate-180'}
        `}
      >
        <div className="text-3xl select-none">{card.symbol}</div>
      </div>

      {/* Matched indicator */}
      {card.isMatched && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </button>
  )
}