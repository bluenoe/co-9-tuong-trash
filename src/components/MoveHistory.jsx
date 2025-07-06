import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore, PIECE_TYPES } from '../store/gameStore'
import { Clock, Target, Sword } from 'lucide-react'

const PIECE_NAMES = {
  [PIECE_TYPES.GENERAL]: 'General',
  [PIECE_TYPES.ADVISOR]: 'Advisor',
  [PIECE_TYPES.ELEPHANT]: 'Elephant',
  [PIECE_TYPES.HORSE]: 'Horse',
  [PIECE_TYPES.CHARIOT]: 'Chariot',
  [PIECE_TYPES.CANNON]: 'Cannon',
  [PIECE_TYPES.SOLDIER]: 'Soldier'
}

const MoveHistory = () => {
  const { moveHistory, currentPlayer } = useGameStore()

  const formatPosition = (row, col) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    const ranks = ['9', '8', '7', '6', '5', '4', '3', '2', '1']
    return `${files[col]}${ranks[row]}`
  }

  const formatMove = (move, index) => {
    const fromPos = formatPosition(move.from[0], move.from[1])
    const toPos = formatPosition(move.to[0], move.to[1])
    const pieceName = PIECE_NAMES[move.piece]
    const captured = move.captured ? ` x${PIECE_NAMES[move.captured]}` : ''
    
    return {
      moveNumber: Math.floor(index / 2) + 1,
      player: move.player,
      notation: `${pieceName} ${fromPos}-${toPos}${captured}`,
      isCapture: !!move.captured
    }
  }

  const groupedMoves = []
  for (let i = 0; i < moveHistory.length; i += 2) {
    const redMove = moveHistory[i] ? formatMove(moveHistory[i], i) : null
    const blackMove = moveHistory[i + 1] ? formatMove(moveHistory[i + 1], i + 1) : null
    groupedMoves.push({ red: redMove, black: blackMove })
  }

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 h-fit"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Move History</h2>
      </div>

      {moveHistory.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🎯</div>
          <p>No moves yet</p>
          <p className="text-sm">Start playing to see move history</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600 border-b pb-2">
            <div className="col-span-2">#</div>
            <div className="col-span-5">Red</div>
            <div className="col-span-5">Black</div>
          </div>

          {/* Moves */}
          {groupedMoves.map((movePair, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-12 gap-2 py-2 text-sm hover:bg-gray-50 rounded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="col-span-2 text-gray-500 font-medium">
                {index + 1}
              </div>
              
              {/* Red Move */}
              <div className="col-span-5">
                {movePair.red && (
                  <div className={`flex items-center space-x-1 ${
                    movePair.red.isCapture ? 'text-red-600 font-medium' : 'text-gray-700'
                  }`}>
                    {movePair.red.isCapture && <Sword className="h-3 w-3" />}
                    <span className="text-xs">{movePair.red.notation}</span>
                  </div>
                )}
              </div>
              
              {/* Black Move */}
              <div className="col-span-5">
                {movePair.black && (
                  <div className={`flex items-center space-x-1 ${
                    movePair.black.isCapture ? 'text-red-600 font-medium' : 'text-gray-700'
                  }`}>
                    {movePair.black.isCapture && <Sword className="h-3 w-3" />}
                    <span className="text-xs">{movePair.black.notation}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Current Turn Indicator */}
      {moveHistory.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Next to move:</span>
            <div className={`flex items-center space-x-2 font-medium ${
              currentPlayer === 'red' ? 'text-red-600' : 'text-gray-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                currentPlayer === 'red' ? 'bg-vietnamese-red' : 'bg-gray-800'
              }`}></div>
              <span>{currentPlayer === 'red' ? 'Red' : 'Black'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Move Statistics */}
      {moveHistory.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold mb-2">Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-gray-600">Total Moves</div>
              <div className="font-semibold text-lg">{moveHistory.length}</div>
            </div>
            <div>
              <div className="text-gray-600">Captures</div>
              <div className="font-semibold text-lg">
                {moveHistory.filter(move => move.captured).length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export/Import Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        <button 
          className="w-full text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          onClick={() => {
            const gameData = JSON.stringify(moveHistory, null, 2)
            navigator.clipboard.writeText(gameData)
            // Could show a toast notification here
          }}
        >
          Copy Game Data
        </button>
      </div>
    </motion.div>
  )
}

export default MoveHistory