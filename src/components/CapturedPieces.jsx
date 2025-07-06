import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore, PIECE_TYPES, PLAYERS } from '../store/gameStore'
import { Trophy, Target } from 'lucide-react'

// Piece symbols for captured pieces display
const PIECE_SYMBOLS = {
  [PIECE_TYPES.GENERAL]: '將',
  [PIECE_TYPES.ADVISOR]: '士',
  [PIECE_TYPES.ELEPHANT]: '象',
  [PIECE_TYPES.HORSE]: '馬',
  [PIECE_TYPES.CHARIOT]: '車',
  [PIECE_TYPES.CANNON]: '炮',
  [PIECE_TYPES.SOLDIER]: '兵'
}

const PIECE_SYMBOLS_BLACK = {
  [PIECE_TYPES.GENERAL]: '帥',
  [PIECE_TYPES.ADVISOR]: '仕',
  [PIECE_TYPES.ELEPHANT]: '相',
  [PIECE_TYPES.HORSE]: '傌',
  [PIECE_TYPES.CHARIOT]: '俥',
  [PIECE_TYPES.CANNON]: '砲',
  [PIECE_TYPES.SOLDIER]: '卒'
}

const PIECE_VALUES = {
  [PIECE_TYPES.GENERAL]: 1000,
  [PIECE_TYPES.ADVISOR]: 2,
  [PIECE_TYPES.ELEPHANT]: 2,
  [PIECE_TYPES.HORSE]: 4,
  [PIECE_TYPES.CHARIOT]: 9,
  [PIECE_TYPES.CANNON]: 4.5,
  [PIECE_TYPES.SOLDIER]: 1
}

const CapturedPieces = () => {
  const { capturedPieces, animationsEnabled } = useGameStore()

  const calculateMaterialAdvantage = () => {
    const redValue = capturedPieces[PLAYERS.BLACK].reduce((sum, piece) => sum + PIECE_VALUES[piece.type], 0)
    const blackValue = capturedPieces[PLAYERS.RED].reduce((sum, piece) => sum + PIECE_VALUES[piece.type], 0)
    return redValue - blackValue
  }

  const materialAdvantage = calculateMaterialAdvantage()

  const renderCapturedPiece = (piece, index, player) => {
    const symbol = player === PLAYERS.RED 
      ? PIECE_SYMBOLS[piece.type] 
      : PIECE_SYMBOLS_BLACK[piece.type]

    return (
      <motion.div
        key={`captured-${player}-${piece.type}-${index}`}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
          player === PLAYERS.RED 
            ? 'bg-red-100 text-red-800 border-red-300' 
            : 'bg-gray-100 text-gray-800 border-gray-300'
        }`}
        initial={animationsEnabled ? { scale: 0, rotate: 180, opacity: 0 } : false}
        animate={animationsEnabled ? { scale: 1, rotate: 0, opacity: 1 } : false}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          delay: index * 0.1 
        }}
        title={`Captured ${piece.type}`}
      >
        {symbol}
      </motion.div>
    )
  }

  const renderPlayerSection = (player, capturedByOpponent) => {
    const playerName = player === PLAYERS.RED ? 'Red' : 'Black'
    const pieces = capturedByOpponent
    
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-semibold ${
            player === PLAYERS.RED ? 'text-red-600' : 'text-gray-800'
          }`}>
            {playerName} Captured
          </h3>
          <div className="text-xs text-gray-500">
            {pieces.length} pieces
          </div>
        </div>
        
        {pieces.length === 0 ? (
          <div className="text-center py-4 text-gray-400 text-xs">
            No captures yet
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pieces.map((piece, index) => 
              renderCapturedPiece(piece, index, piece.player)
            )}
          </div>
        )}
        
        {/* Piece count by type */}
        {pieces.length > 0 && (
          <div className="mt-3 text-xs text-gray-600">
            {Object.entries(
              pieces.reduce((acc, piece) => {
                acc[piece.type] = (acc[piece.type] || 0) + 1
                return acc
              }, {})
            ).map(([type, count]) => (
              <div key={type} className="flex justify-between">
                <span className="capitalize">{type}:</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Captured Pieces</h2>
      </div>

      {/* Material Advantage Indicator */}
      {(capturedPieces[PLAYERS.RED].length > 0 || capturedPieces[PLAYERS.BLACK].length > 0) && (
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Material Balance</div>
          <div className="flex items-center justify-center">
            {materialAdvantage === 0 ? (
              <div className="text-sm font-medium text-gray-700">Equal</div>
            ) : (
              <div className={`text-sm font-medium ${
                materialAdvantage > 0 ? 'text-red-600' : 'text-gray-800'
              }`}>
                {materialAdvantage > 0 ? 'Red' : 'Black'} +{Math.abs(materialAdvantage)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Captured by Red (Black pieces) */}
      {renderPlayerSection(PLAYERS.BLACK, capturedPieces[PLAYERS.BLACK])}
      
      {/* Captured by Black (Red pieces) */}
      {renderPlayerSection(PLAYERS.RED, capturedPieces[PLAYERS.RED])}

      {/* Overall Statistics */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold mb-3">Battle Statistics</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Captures:</span>
            <span className="font-medium">
              {capturedPieces[PLAYERS.RED].length + capturedPieces[PLAYERS.BLACK].length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Red Captures:</span>
            <span className="font-medium text-red-600">
              {capturedPieces[PLAYERS.BLACK].length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Black Captures:</span>
            <span className="font-medium text-gray-800">
              {capturedPieces[PLAYERS.RED].length}
            </span>
          </div>
        </div>
      </div>

      {/* Piece Values Reference */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <details className="text-xs">
          <summary className="cursor-pointer text-gray-600 hover:text-gray-800 font-medium">
            Piece Values
          </summary>
          <div className="mt-2 space-y-1 text-gray-600">
            <div className="flex justify-between">
              <span>Chariot:</span><span>9 points</span>
            </div>
            <div className="flex justify-between">
              <span>Cannon:</span><span>4.5 points</span>
            </div>
            <div className="flex justify-between">
              <span>Horse:</span><span>4 points</span>
            </div>
            <div className="flex justify-between">
              <span>Advisor/Elephant:</span><span>2 points</span>
            </div>
            <div className="flex justify-between">
              <span>Soldier:</span><span>1 point</span>
            </div>
          </div>
        </details>
      </div>
    </motion.div>
  )
}

export default CapturedPieces