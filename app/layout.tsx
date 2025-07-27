import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Memory Card Matching Game',
  description: 'A fun and challenging memory card matching game built with Next.js',
  keywords: ['memory game', 'card matching', 'brain training', 'puzzle game'],
  authors: [{ name: 'Cosmic Community' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
          {children}
        </main>
      </body>
    </html>
  )
}