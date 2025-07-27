# Memory Card Matching Game

![Memory Card Game Preview](https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1200&h=300&fit=crop&auto=format)

A challenging and entertaining memory card matching game with multiple difficulty levels, score tracking, and smooth animations. Test your memory skills and compete for high scores!

## Features

- 🎮 **Multiple Difficulty Levels**: Easy (4x3), Medium (4x4), Hard (6x4), Expert (6x6)
- 🏆 **Score Tracking**: Points system with time bonuses and difficulty multipliers
- 📊 **High Score Records**: Persistent storage of best scores for each difficulty
- ⚡ **Smooth Animations**: Card flip effects and match celebrations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 📈 **Game Statistics**: Track moves, time, accuracy, and more
- 🎯 **Smart Matching**: Intelligent card pairing and validation system

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6885b571ee2d058c7a57c105&clone_repository=6885bf50e62f297e7fb604ce)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Create a memory card matching game with different difficulty levels and score tracking

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and effects
- **Local Storage** - Persistent high score tracking
- **CSS Animations** - Smooth card flip transitions

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A modern web browser

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd memory-card-game
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Start the development server
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

This game demonstrates several development patterns:

```typescript
// Game state management with TypeScript
interface GameState {
  cards: Card[]
  flippedCards: number[]
  matchedPairs: number[]
  moves: number
  score: number
  gameStatus: 'playing' | 'won' | 'paused'
  startTime: number
  endTime?: number
}

// Local storage integration
const saveHighScore = (difficulty: Difficulty, score: number) => {
  const highScores = getHighScores()
  const currentBest = highScores[difficulty] || 0
  if (score > currentBest) {
    highScores[difficulty] = score
    localStorage.setItem('memoryGameHighScores', JSON.stringify(highScores))
  }
}

// Dynamic grid generation
const generateCards = (difficulty: Difficulty): Card[] => {
  const gridSizes = {
    easy: { pairs: 6, grid: '4x3' },
    medium: { pairs: 8, grid: '4x4' },
    hard: { pairs: 12, grid: '6x4' },
    expert: { pairs: 18, grid: '6x6' }
  }
  // Generate and shuffle card pairs
}
```

## Cosmic CMS Integration

While this game runs independently, it demonstrates patterns that work well with Cosmic:

- **Dynamic Content**: Game symbols and themes could be managed through Cosmic
- **User Profiles**: High scores and achievements could be stored in Cosmic
- **Game Configuration**: Difficulty settings and scoring rules via Cosmic
- **Analytics**: Game statistics and user behavior tracking

## Game Rules

1. **Objective**: Match all pairs of cards in the fewest moves possible
2. **Gameplay**: Click cards to flip them and reveal symbols
3. **Matching**: Find two cards with matching symbols
4. **Scoring**: Earn points for matches, with bonuses for speed and accuracy
5. **Winning**: Complete all pairs to win and record your score

## Scoring System

- **Base Points**: 100 points per matched pair
- **Time Bonus**: Extra points for quick completion
- **Difficulty Multiplier**: Higher difficulties award more points
- **Accuracy Bonus**: Fewer wrong moves = higher score

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify

### Self-Hosted
1. Build: `bun run build`
2. Start: `bun run start`
3. Access on port 3000

The game works entirely client-side with no external dependencies required for basic functionality.

<!-- README_END -->