import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import MoveHistory from './components/MoveHistory'
import CapturedPieces from './components/CapturedPieces'
import GameModeSelector from './components/GameModeSelector'
import Tutorial from './components/Tutorial'
import ThemeSelector from './components/ThemeSelector'
import { useGameStore } from './store/gameStore'
import { Crown, Settings, HelpCircle, Volume2, VolumeX } from 'lucide-react'

function App() {
  const {
    gameStatus,
    winner,
    showTutorial,
    setShowTutorial,
    soundEnabled,
    setSoundEnabled,
    theme
  } = useGameStore()
  
  const [showSettings, setShowSettings] = useState(false)
  const [showModeSelector, setShowModeSelector] = useState(false)

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-vietnamese-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-vietnamese-red" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 text-shadow">
                  Nine Generals Chess
                </h1>
                <p className="text-sm text-gray-600 font-vietnamese">
                  Cờ 9 Tướng - Vietnamese Chess Variant
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-gray-600" />
                ) : (
                  <VolumeX className="h-5 w-5 text-gray-600" />
                )}
              </button>
              
              <button
                onClick={() => setShowTutorial(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Show Tutorial"
              >
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Settings"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowModeSelector(true)}
                className="game-button primary"
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Captured Pieces & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <CapturedPieces />
            <GameControls />
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <h3 className="text-lg font-semibold mb-4">Settings</h3>
                <ThemeSelector />
              </motion.div>
            )}
          </div>
          
          {/* Center - Game Board */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              <GameBoard />
              
              {/* Game Status Overlay */}
              <AnimatePresence>
                {(gameStatus === 'checkmate' || gameStatus === 'check') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
                  >
                    <div className="bg-white rounded-lg p-6 text-center shadow-xl">
                      {gameStatus === 'checkmate' ? (
                        <div>
                          <h2 className="text-2xl font-bold text-vietnamese-red mb-2">
                            Checkmate!
                          </h2>
                          <p className="text-lg text-gray-700">
                            {winner === 'red' ? 'Red' : 'Black'} wins!
                          </p>
                          <button
                            onClick={() => setShowModeSelector(true)}
                            className="game-button primary mt-4"
                          >
                            Play Again
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h2 className="text-xl font-bold text-yellow-600 mb-2">
                            Check!
                          </h2>
                          <p className="text-gray-700">
                            The General is under attack
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Right Sidebar - Move History */}
          <div className="lg:col-span-1">
            <MoveHistory />
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showTutorial && <Tutorial />}
        {showModeSelector && (
          <GameModeSelector onClose={() => setShowModeSelector(false)} />
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Nine Generals Chess - A Vietnamese Chess Variant
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Built with React, TailwindCSS, and Framer Motion
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App