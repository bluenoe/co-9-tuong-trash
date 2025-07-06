import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore, PLAYERS } from '../store/gameStore'
import { RotateCcw, Undo, Play, Pause, SkipForward } from 'lucide-react'

const GameControls = () => {
  const {
    currentPlayer,
    gameStatus,
    moveHistory,
    resetGame,
    undoMove,
    gameMode,
    aiDifficulty
  } = useGameStore()

  const canUndo = moveHistory.length > 0 && gameStatus === 'playing'
  const isGameActive = gameStatus === 'playing' || gameStatus === 'check'

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Game Controls</h2>
      
      {/* Current Player Indicator */}
      <div className="mb-6 text-center">
        <div className="text-sm text-gray-600 mb-2">Current Turn</div>
        <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${
          currentPlayer === PLAYERS.RED 
            ? 'bg-red-100 text-red-800 border border-red-200' 
            : 'bg-gray-100 text-gray-800 border border-gray-200'
        }`}>
          <div className={`w-3 h-3 rounded-full mr-2 ${
            currentPlayer === PLAYERS.RED ? 'bg-vietnamese-red' : 'bg-gray-800'
          }`}></div>
          {currentPlayer === PLAYERS.RED ? 'Red Player' : 'Black Player'}
        </div>
      </div>

      {/* Game Mode Info */}
      <div className="mb-6 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Game Mode</div>
        <div className="font-medium">
          {gameMode === 'pvp' ? 'Player vs Player' : `Player vs AI (${aiDifficulty})`}
        </div>
      </div>

      {/* Game Status */}
      {gameStatus !== 'playing' && (
        <div className="mb-6 p-3 rounded-lg text-center font-medium">
          {gameStatus === 'check' && (
            <div className="bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-lg p-2">
              <div className="font-semibold">Check!</div>
              <div className="text-sm">The General is under attack</div>
            </div>
          )}
          {gameStatus === 'checkmate' && (
            <div className="bg-red-100 text-red-800 border border-red-200 rounded-lg p-2">
              <div className="font-semibold">Checkmate!</div>
              <div className="text-sm">Game Over</div>
            </div>
          )}
        </div>
      )}

      {/* Control Buttons */}
      <div className="space-y-3">
        <button
          onClick={resetGame}
          className="game-button primary w-full flex items-center justify-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset Game</span>
        </button>
        
        <button
          onClick={undoMove}
          disabled={!canUndo}
          className="game-button secondary w-full flex items-center justify-center space-x-2"
          title={!canUndo ? 'No moves to undo' : 'Undo last move'}
        >
          <Undo className="h-4 w-4" />
          <span>Undo Move</span>
        </button>
      </div>

      {/* Game Statistics */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold mb-3">Game Statistics</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Moves:</span>
            <span className="font-medium">{moveHistory.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Game Status:</span>
            <span className={`font-medium capitalize ${
              gameStatus === 'playing' ? 'text-green-600' :
              gameStatus === 'check' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {gameStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Rules */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold mb-3">Quick Rules</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>• Click a piece to select it</div>
          <div>• Green dots show valid moves</div>
          <div>• Protect your General at all costs</div>
          <div>• Soldiers gain mobility after crossing the river</div>
          <div>• Cannons must jump to capture</div>
        </div>
      </div>
    </motion.div>
  )
}

export default GameControls