import { create } from 'zustand'

// Define piece types for Nine Generals Chess (simplified Xiangqi)
const PIECE_TYPES = {
  GENERAL: 'general',
  ADVISOR: 'advisor', 
  ELEPHANT: 'elephant',
  HORSE: 'horse',
  CHARIOT: 'chariot',
  CANNON: 'cannon',
  SOLDIER: 'soldier'
}

const PLAYERS = {
  RED: 'red',
  BLACK: 'black'
}

const GAME_MODES = {
  PVP: 'pvp',
  PVE: 'pve'
}

const AI_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
}

// Initial board setup for Nine Generals Chess (9x9 board with simplified pieces)
const createInitialBoard = () => {
  const board = Array(9).fill(null).map(() => Array(9).fill(null))
  
  // Red pieces (bottom)
  board[8][4] = { type: PIECE_TYPES.GENERAL, player: PLAYERS.RED }
  board[8][3] = { type: PIECE_TYPES.ADVISOR, player: PLAYERS.RED }
  board[8][5] = { type: PIECE_TYPES.ADVISOR, player: PLAYERS.RED }
  board[8][2] = { type: PIECE_TYPES.ELEPHANT, player: PLAYERS.RED }
  board[8][6] = { type: PIECE_TYPES.ELEPHANT, player: PLAYERS.RED }
  board[8][1] = { type: PIECE_TYPES.HORSE, player: PLAYERS.RED }
  board[8][7] = { type: PIECE_TYPES.HORSE, player: PLAYERS.RED }
  board[8][0] = { type: PIECE_TYPES.CHARIOT, player: PLAYERS.RED }
  board[8][8] = { type: PIECE_TYPES.CHARIOT, player: PLAYERS.RED }
  
  // Red cannons and soldiers
  board[6][1] = { type: PIECE_TYPES.CANNON, player: PLAYERS.RED }
  board[6][7] = { type: PIECE_TYPES.CANNON, player: PLAYERS.RED }
  board[6][0] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.RED }
  board[6][2] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.RED }
  board[6][4] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.RED }
  board[6][6] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.RED }
  board[6][8] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.RED }
  
  // Black pieces (top)
  board[0][4] = { type: PIECE_TYPES.GENERAL, player: PLAYERS.BLACK }
  board[0][3] = { type: PIECE_TYPES.ADVISOR, player: PLAYERS.BLACK }
  board[0][5] = { type: PIECE_TYPES.ADVISOR, player: PLAYERS.BLACK }
  board[0][2] = { type: PIECE_TYPES.ELEPHANT, player: PLAYERS.BLACK }
  board[0][6] = { type: PIECE_TYPES.ELEPHANT, player: PLAYERS.BLACK }
  board[0][1] = { type: PIECE_TYPES.HORSE, player: PLAYERS.BLACK }
  board[0][7] = { type: PIECE_TYPES.HORSE, player: PLAYERS.BLACK }
  board[0][0] = { type: PIECE_TYPES.CHARIOT, player: PLAYERS.BLACK }
  board[0][8] = { type: PIECE_TYPES.CHARIOT, player: PLAYERS.BLACK }
  
  // Black cannons and soldiers
  board[2][1] = { type: PIECE_TYPES.CANNON, player: PLAYERS.BLACK }
  board[2][7] = { type: PIECE_TYPES.CANNON, player: PLAYERS.BLACK }
  board[2][0] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.BLACK }
  board[2][2] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.BLACK }
  board[2][4] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.BLACK }
  board[2][6] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.BLACK }
  board[2][8] = { type: PIECE_TYPES.SOLDIER, player: PLAYERS.BLACK }
  
  return board
}

const useGameStore = create((set, get) => ({
  // Game state
  board: createInitialBoard(),
  currentPlayer: PLAYERS.RED,
  selectedPosition: null,
  validMoves: [],
  gameMode: GAME_MODES.PVP,
  aiDifficulty: AI_DIFFICULTY.MEDIUM,
  gameStatus: 'playing', // 'playing', 'check', 'checkmate', 'stalemate'
  winner: null,
  moveHistory: [],
  capturedPieces: { [PLAYERS.RED]: [], [PLAYERS.BLACK]: [] },
  soundEnabled: true,
  animationsEnabled: true,
  showTutorial: false,
  theme: 'traditional',
  
  // Game actions
  selectPosition: (row, col) => {
    const state = get()
    const piece = state.board[row][col]
    
    if (state.selectedPosition) {
      const [selectedRow, selectedCol] = state.selectedPosition
      
      // If clicking the same position, deselect
      if (selectedRow === row && selectedCol === col) {
        set({ selectedPosition: null, validMoves: [] })
        return
      }
      
      // Try to make a move
      const isValidMove = state.validMoves.some(move => move.row === row && move.col === col)
      if (isValidMove) {
        state.makeMove(selectedRow, selectedCol, row, col)
        return
      }
    }
    
    // Select new piece if it belongs to current player
    if (piece && piece.player === state.currentPlayer) {
      const validMoves = state.getValidMoves(row, col)
      set({ selectedPosition: [row, col], validMoves })
    } else {
      set({ selectedPosition: null, validMoves: [] })
    }
  },
  
  makeMove: (fromRow, fromCol, toRow, toCol) => {
    const state = get()
    const newBoard = state.board.map(row => [...row])
    const piece = newBoard[fromRow][fromCol]
    const capturedPiece = newBoard[toRow][toCol]
    
    // Move the piece
    newBoard[toRow][toCol] = piece
    newBoard[fromRow][fromCol] = null
    
    // Update captured pieces
    const newCapturedPieces = { ...state.capturedPieces }
    if (capturedPiece) {
      newCapturedPieces[capturedPiece.player].push(capturedPiece)
    }
    
    // Add to move history
    const move = {
      from: [fromRow, fromCol],
      to: [toRow, toCol],
      piece: piece.type,
      captured: capturedPiece?.type || null,
      player: state.currentPlayer
    }
    
    const newMoveHistory = [...state.moveHistory, move]
    const nextPlayer = state.currentPlayer === PLAYERS.RED ? PLAYERS.BLACK : PLAYERS.RED
    
    // Check for game end conditions
    const gameStatus = state.checkGameStatus(newBoard, nextPlayer)
    
    set({
      board: newBoard,
      currentPlayer: nextPlayer,
      selectedPosition: null,
      validMoves: [],
      moveHistory: newMoveHistory,
      capturedPieces: newCapturedPieces,
      gameStatus: gameStatus.status,
      winner: gameStatus.winner
    })
    
    // Play sound effect
    if (state.soundEnabled) {
      state.playSound(capturedPiece ? 'capture' : 'move')
    }
    
    // AI move if in PvE mode
    if (state.gameMode === GAME_MODES.PVE && nextPlayer === PLAYERS.BLACK && gameStatus.status === 'playing') {
      setTimeout(() => {
        state.makeAIMove()
      }, 500)
    }
  },
  
  getValidMoves: (row, col) => {
    const state = get()
    const piece = state.board[row][col]
    if (!piece) return []
    
    const moves = []
    
    switch (piece.type) {
      case PIECE_TYPES.GENERAL:
        // General moves one step orthogonally within palace
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const newRow = row + dr
          const newCol = col + dc
          if (state.isInPalace(newRow, newCol, piece.player) && state.isValidDestination(newRow, newCol, piece.player)) {
            moves.push({ row: newRow, col: newCol })
          }
        }
        break
        
      case PIECE_TYPES.ADVISOR:
        // Advisor moves diagonally within palace
        for (const [dr, dc] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
          const newRow = row + dr
          const newCol = col + dc
          if (state.isInPalace(newRow, newCol, piece.player) && state.isValidDestination(newRow, newCol, piece.player)) {
            moves.push({ row: newRow, col: newCol })
          }
        }
        break
        
      case PIECE_TYPES.ELEPHANT:
        // Elephant moves exactly 2 points diagonally, cannot cross river
        for (const [dr, dc] of [[-2, -2], [-2, 2], [2, -2], [2, 2]]) {
          const newRow = row + dr
          const newCol = col + dc
          const blockRow = row + dr / 2
          const blockCol = col + dc / 2
          
          if (state.isValidPosition(newRow, newCol) && 
              !state.board[blockRow][blockCol] && 
              state.isOnSameSideOfRiver(row, newRow, piece.player) &&
              state.isValidDestination(newRow, newCol, piece.player)) {
            moves.push({ row: newRow, col: newCol })
          }
        }
        break
        
      case PIECE_TYPES.HORSE:
        // Horse moves in L-shape but can be blocked
        const horseMoves = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ]
        for (const [dr, dc] of horseMoves) {
          const newRow = row + dr
          const newCol = col + dc
          
          // Check blocking position
          let blockRow, blockCol
          if (Math.abs(dr) === 2) {
            blockRow = row + dr / 2
            blockCol = col
          } else {
            blockRow = row
            blockCol = col + dc / 2
          }
          
          if (state.isValidPosition(newRow, newCol) && 
              !state.board[blockRow][blockCol] &&
              state.isValidDestination(newRow, newCol, piece.player)) {
            moves.push({ row: newRow, col: newCol })
          }
        }
        break
        
      case PIECE_TYPES.CHARIOT:
        // Chariot moves orthogonally any distance
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          for (let i = 1; i < 9; i++) {
            const newRow = row + dr * i
            const newCol = col + dc * i
            
            if (!state.isValidPosition(newRow, newCol)) break
            
            if (state.board[newRow][newCol]) {
              if (state.board[newRow][newCol].player !== piece.player) {
                moves.push({ row: newRow, col: newCol })
              }
              break
            }
            
            moves.push({ row: newRow, col: newCol })
          }
        }
        break
        
      case PIECE_TYPES.CANNON:
        // Cannon moves like chariot but needs to jump to capture
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          let jumpedOver = false
          
          for (let i = 1; i < 9; i++) {
            const newRow = row + dr * i
            const newCol = col + dc * i
            
            if (!state.isValidPosition(newRow, newCol)) break
            
            if (state.board[newRow][newCol]) {
              if (!jumpedOver) {
                jumpedOver = true
              } else {
                // Can capture after jumping
                if (state.board[newRow][newCol].player !== piece.player) {
                  moves.push({ row: newRow, col: newCol })
                }
                break
              }
            } else if (!jumpedOver) {
              // Can move to empty space without jumping
              moves.push({ row: newRow, col: newCol })
            }
          }
        }
        break
        
      case PIECE_TYPES.SOLDIER:
        // Soldier moves forward, and sideways after crossing river
        const forward = piece.player === PLAYERS.RED ? -1 : 1
        const newRow = row + forward
        
        // Move forward
        if (state.isValidPosition(newRow, col) && state.isValidDestination(newRow, col, piece.player)) {
          moves.push({ row: newRow, col })
        }
        
        // Move sideways if crossed river
        if (state.hasCrossedRiver(row, piece.player)) {
          for (const dc of [-1, 1]) {
            const newCol = col + dc
            if (state.isValidPosition(row, newCol) && state.isValidDestination(row, newCol, piece.player)) {
              moves.push({ row, col: newCol })
            }
          }
        }
        break
    }
    
    return moves
  },
  
  // Helper functions
  isValidPosition: (row, col) => row >= 0 && row < 9 && col >= 0 && col < 9,
  
  isValidDestination: (row, col, player) => {
    const state = get()
    if (!state.isValidPosition(row, col)) return false
    const piece = state.board[row][col]
    return !piece || piece.player !== player
  },
  
  isInPalace: (row, col, player) => {
    const state = get()
    if (!state.isValidPosition(row, col)) return false
    
    if (player === PLAYERS.RED) {
      return row >= 7 && row <= 8 && col >= 3 && col <= 5
    } else {
      return row >= 0 && row <= 1 && col >= 3 && col <= 5
    }
  },
  
  isOnSameSideOfRiver: (row1, row2, player) => {
    const riverRow = 4
    if (player === PLAYERS.RED) {
      return row1 >= riverRow && row2 >= riverRow
    } else {
      return row1 <= riverRow && row2 <= riverRow
    }
  },
  
  hasCrossedRiver: (row, player) => {
    const riverRow = 4
    if (player === PLAYERS.RED) {
      return row < riverRow
    } else {
      return row > riverRow
    }
  },
  
  checkGameStatus: (board, player) => {
    const state = get()
    
    // Find the general
    let generalPos = null
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const piece = board[row][col]
        if (piece && piece.type === PIECE_TYPES.GENERAL && piece.player === player) {
          generalPos = [row, col]
          break
        }
      }
      if (generalPos) break
    }
    
    if (!generalPos) {
      return { status: 'checkmate', winner: player === PLAYERS.RED ? PLAYERS.BLACK : PLAYERS.RED }
    }
    
    // Check if general is in check
    const inCheck = state.isPositionUnderAttack(generalPos[0], generalPos[1], player, board)
    
    // Check if player has any valid moves
    let hasValidMoves = false
    for (let row = 0; row < 9 && !hasValidMoves; row++) {
      for (let col = 0; col < 9 && !hasValidMoves; col++) {
        const piece = board[row][col]
        if (piece && piece.player === player) {
          const moves = state.getValidMovesForPosition(row, col, board)
          if (moves.length > 0) {
            hasValidMoves = true
          }
        }
      }
    }
    
    if (!hasValidMoves) {
      return { status: 'checkmate', winner: player === PLAYERS.RED ? PLAYERS.BLACK : PLAYERS.RED }
    }
    
    if (inCheck) {
      return { status: 'check', winner: null }
    }
    
    return { status: 'playing', winner: null }
  },
  
  isPositionUnderAttack: (row, col, player, board) => {
    const state = get()
    const opponent = player === PLAYERS.RED ? PLAYERS.BLACK : PLAYERS.RED
    
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const piece = board[r][c]
        if (piece && piece.player === opponent) {
          const moves = state.getValidMovesForPosition(r, c, board)
          if (moves.some(move => move.row === row && move.col === col)) {
            return true
          }
        }
      }
    }
    
    return false
  },
  
  getValidMovesForPosition: (row, col, board) => {
    // Similar to getValidMoves but works with any board state
    // Implementation would be similar to getValidMoves but using the provided board
    return []
  },
  
  makeAIMove: () => {
    const state = get()
    // Simple AI implementation - random valid move
    const allMoves = []
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const piece = state.board[row][col]
        if (piece && piece.player === PLAYERS.BLACK) {
          const moves = state.getValidMoves(row, col)
          moves.forEach(move => {
            allMoves.push({ from: [row, col], to: [move.row, move.col] })
          })
        }
      }
    }
    
    if (allMoves.length > 0) {
      const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)]
      state.makeMove(randomMove.from[0], randomMove.from[1], randomMove.to[0], randomMove.to[1])
    }
  },
  
  playSound: (type) => {
    // Sound implementation would go here
    console.log(`Playing ${type} sound`)
  },
  
  // Game control actions
  resetGame: () => {
    set({
      board: createInitialBoard(),
      currentPlayer: PLAYERS.RED,
      selectedPosition: null,
      validMoves: [],
      gameStatus: 'playing',
      winner: null,
      moveHistory: [],
      capturedPieces: { [PLAYERS.RED]: [], [PLAYERS.BLACK]: [] }
    })
  },
  
  undoMove: () => {
    const state = get()
    if (state.moveHistory.length === 0) return
    
    // Implementation for undo would restore previous board state
    console.log('Undo move')
  },
  
  setGameMode: (mode) => set({ gameMode: mode }),
  setAIDifficulty: (difficulty) => set({ aiDifficulty: difficulty }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setAnimationsEnabled: (enabled) => set({ animationsEnabled: enabled }),
  setShowTutorial: (show) => set({ showTutorial: show }),
  setTheme: (theme) => set({ theme: theme })
}))

export { useGameStore, PIECE_TYPES, PLAYERS, GAME_MODES, AI_DIFFICULTY }