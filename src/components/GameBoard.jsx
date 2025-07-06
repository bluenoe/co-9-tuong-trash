import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore, PIECE_TYPES, PLAYERS } from '../store/gameStore'

// Piece symbols for visual representation
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

const GameBoard = () => {
  const {
    board,
    selectedPosition,
    validMoves,
    selectPosition,
    moveHistory,
    gameStatus,
    animationsEnabled
  } = useGameStore()

  const isSelected = (row, col) => {
    return selectedPosition && selectedPosition[0] === row && selectedPosition[1] === col
  }

  const isValidMove = (row, col) => {
    return validMoves.some(move => move.row === row && move.col === col)
  }

  const isLastMove = (row, col) => {
    if (moveHistory.length === 0) return false
    const lastMove = moveHistory[moveHistory.length - 1]
    return (lastMove.from[0] === row && lastMove.from[1] === col) ||
           (lastMove.to[0] === row && lastMove.to[1] === col)
  }

  const isInPalace = (row, col) => {
    return (row >= 0 && row <= 1 && col >= 3 && col <= 5) ||
           (row >= 7 && row <= 8 && col >= 3 && col <= 5)
  }

  const isRiver = (row) => {
    return row === 4
  }

  const renderPiece = (piece, row, col) => {
    if (!piece) return null

    const symbol = piece.player === PLAYERS.RED 
      ? PIECE_SYMBOLS[piece.type] 
      : PIECE_SYMBOLS_BLACK[piece.type]

    const isInCheck = piece.type === PIECE_TYPES.GENERAL && gameStatus === 'check'

    return (
      <motion.div
        key={`${piece.type}-${piece.player}-${row}-${col}`}
        className={`piece ${piece.player} ${isInCheck ? 'in-check' : ''}`}
        initial={animationsEnabled ? { scale: 0, rotate: 180 } : false}
        animate={animationsEnabled ? { scale: 1, rotate: 0 } : false}
        whileHover={animationsEnabled ? { scale: 1.1 } : false}
        whileTap={animationsEnabled ? { scale: 0.95 } : false}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {symbol}
      </motion.div>
    )
  }

  const renderIntersection = (row, col) => {
    const piece = board[row][col]
    const selected = isSelected(row, col)
    const validMove = isValidMove(row, col)
    const lastMove = isLastMove(row, col)
    const inPalace = isInPalace(row, col)
    const river = isRiver(row)

    let intersectionClasses = 'board-intersection'
    if (selected) intersectionClasses += ' selected'
    if (validMove) intersectionClasses += ' valid-move'
    if (lastMove) intersectionClasses += ' last-move'
    if (inPalace) intersectionClasses += ' palace'
    if (river) intersectionClasses += ' river'

    return (
      <motion.div
        key={`${row}-${col}`}
        className={intersectionClasses}
        onClick={() => selectPosition(row, col)}
        whileHover={animationsEnabled ? { scale: 1.05 } : false}
        whileTap={animationsEnabled ? { scale: 0.95 } : false}
      >
        {renderPiece(piece, row, col)}
        
        {/* Palace diagonal lines */}
        {inPalace && (
          <>
            {/* Top-left palace */}
            {row <= 1 && col >= 3 && col <= 5 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {row === 0 && col === 3 && (
                  <line x1="100%" y1="0%" x2="100%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                )}
                {row === 0 && col === 4 && (
                  <>
                    <line x1="0%" y1="100%" x2="100%" y2="0%" stroke="#8B4513" strokeWidth="1" />
                    <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                  </>
                )}
                {row === 0 && col === 5 && (
                  <line x1="0%" y1="0%" x2="0%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                )}
                {row === 1 && col === 3 && (
                  <line x1="100%" y1="0%" x2="100%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                )}
                {row === 1 && col === 5 && (
                  <line x1="0%" y1="0%" x2="0%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                )}
              </svg>
            )}
            
            {/* Bottom-right palace */}
            {row >= 7 && col >= 3 && col <= 5 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {row === 7 && col === 3 && (
                  <line x1="100%" y1="0%" x2="100%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                )}
                {row === 7 && col === 5 && (
                  <line x1="0%" y1="0%" x2="0%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                )}
                {row === 8 && col === 3 && (
                  <line x1="100%" y1="0%" x2="100%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                )}
                {row === 8 && col === 4 && (
                  <>
                    <line x1="0%" y1="100%" x2="100%" y2="0%" stroke="#8B4513" strokeWidth="1" />
                    <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                  </>
                )}
                {row === 8 && col === 5 && (
                  <line x1="0%" y1="0%" x2="0%" y2="100%" stroke="#8B4513" strokeWidth="1" />
                )}
              </svg>
            )}
          </>
        )}
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Player indicator */}
      <div className="mb-4 text-center">
        <div className="text-sm text-gray-600 mb-1">Black Player (上方)</div>
      </div>
      
      {/* Game Board */}
      <motion.div 
        className="board-shadow bg-board-light p-4 rounded-lg"
        initial={animationsEnabled ? { opacity: 0, scale: 0.8 } : false}
        animate={animationsEnabled ? { opacity: 1, scale: 1 } : false}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-9 gap-0 border-2 border-gray-800">
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: 9 }, (_, col) => renderIntersection(row, col))
          )}
        </div>
        
        {/* River label */}
        <div className="flex justify-between mt-2 px-2">
          <div className="text-xs text-gray-600 font-vietnamese">
            楚河 (Chu River)
          </div>
          <div className="text-xs text-gray-600 font-vietnamese">
            漢界 (Han Border)
          </div>
        </div>
      </motion.div>
      
      {/* Player indicator */}
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600">Red Player (下方)</div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 bg-white rounded-lg p-4 shadow-lg max-w-md">
        <h3 className="text-sm font-semibold mb-3 text-center">Piece Legend</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="piece red text-sm">將</span>
              <span>General (Red)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="piece red text-sm">士</span>
              <span>Advisor</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="piece red text-sm">象</span>
              <span>Elephant</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="piece red text-sm">馬</span>
              <span>Horse</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="piece black text-sm">帥</span>
              <span>General (Black)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="piece red text-sm">車</span>
              <span>Chariot</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="piece red text-sm">炮</span>
              <span>Cannon</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="piece red text-sm">兵</span>
              <span>Soldier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameBoard