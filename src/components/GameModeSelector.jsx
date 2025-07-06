import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore, GAME_MODES, AI_DIFFICULTY } from '../store/gameStore'
import { Users, Bot, Settings, X, Play } from 'lucide-react'

const GameModeSelector = ({ isOpen, onClose }) => {
  const { 
    gameMode, 
    aiDifficulty, 
    setGameMode, 
    setAiDifficulty, 
    resetGame 
  } = useGameStore()

  const handleModeSelect = (mode) => {
    setGameMode(mode)
    if (mode === GAME_MODES.PVP) {
      // Start game immediately for PvP
      resetGame()
      onClose()
    }
  }

  const handleAiDifficultySelect = (difficulty) => {
    setAiDifficulty(difficulty)
    resetGame()
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-vietnamese-red" />
            <h2 className="text-2xl font-bold text-gray-800">Game Mode</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Game Mode Selection */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Choose Game Mode</h3>
          
          {/* Player vs Player */}
          <motion.button
            onClick={() => handleModeSelect(GAME_MODES.PVP)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
              gameMode === GAME_MODES.PVP
                ? 'border-vietnamese-red bg-red-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${
                gameMode === GAME_MODES.PVP ? 'bg-vietnamese-red text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <Users className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">Player vs Player</h4>
                <p className="text-sm text-gray-600">Play with a friend on the same device</p>
              </div>
            </div>
          </motion.button>

          {/* Player vs AI */}
          <motion.button
            onClick={() => handleModeSelect(GAME_MODES.PVE)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
              gameMode === GAME_MODES.PVE
                ? 'border-vietnamese-red bg-red-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${
                gameMode === GAME_MODES.PVE ? 'bg-vietnamese-red text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <Bot className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">Player vs AI</h4>
                <p className="text-sm text-gray-600">Challenge the computer opponent</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* AI Difficulty Selection (only show if PvE is selected) */}
        {gameMode === GAME_MODES.PVE && (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-3">AI Difficulty</h3>
            
            <div className="grid grid-cols-3 gap-3">
              {Object.values(AI_DIFFICULTY).map((difficulty) => {
                const isSelected = aiDifficulty === difficulty
                const difficultyConfig = {
                  [AI_DIFFICULTY.EASY]: {
                    label: 'Easy',
                    description: 'Beginner friendly',
                    color: 'green'
                  },
                  [AI_DIFFICULTY.MEDIUM]: {
                    label: 'Medium',
                    description: 'Balanced challenge',
                    color: 'yellow'
                  },
                  [AI_DIFFICULTY.HARD]: {
                    label: 'Hard',
                    description: 'Expert level',
                    color: 'red'
                  }
                }[difficulty]

                return (
                  <motion.button
                    key={difficulty}
                    onClick={() => handleAiDifficultySelect(difficulty)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? `border-${difficultyConfig.color}-500 bg-${difficultyConfig.color}-50 shadow-md`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${
                        isSelected ? `text-${difficultyConfig.color}-700` : 'text-gray-700'
                      }`}>
                        {difficultyConfig.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {difficultyConfig.description}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Start AI Game Button */}
            <motion.button
              onClick={() => {
                resetGame()
                onClose()
              }}
              className="w-full mt-6 bg-vietnamese-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="h-5 w-5" />
              <span>Start AI Game</span>
            </motion.button>
          </motion.div>
        )}

        {/* Current Settings Display */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Current Settings</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Game Mode:</span>
              <span className="font-medium">
                {gameMode === GAME_MODES.PVP ? 'Player vs Player' : 'Player vs AI'}
              </span>
            </div>
            {gameMode === GAME_MODES.PVE && (
              <div className="flex justify-between">
                <span>AI Difficulty:</span>
                <span className="font-medium capitalize">{aiDifficulty}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800 mb-1">💡 Tips</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• PvP mode: Take turns on the same device</li>
            <li>• AI mode: You play as Red, AI plays as Black</li>
            <li>• Easy AI makes random moves with basic rules</li>
            <li>• Hard AI uses advanced strategy algorithms</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GameModeSelector