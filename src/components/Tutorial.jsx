import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Target, 
  Shield, 
  Zap,
  Crown,
  Users,
  Flag
} from 'lucide-react'

const Tutorial = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const tutorialSteps = [
    {
      title: "Welcome to Nine Generals Chess!",
      icon: <Crown className="h-8 w-8" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Nine Generals Chess (Cờ 9 Tướng) is a Vietnamese variant of Xiangqi (Chinese Chess). 
            The goal is to checkmate your opponent's General.
          </p>
          <div className="bg-vietnamese-gold bg-opacity-20 p-4 rounded-lg">
            <h4 className="font-semibold text-vietnamese-red mb-2">Key Differences:</h4>
            <ul className="text-sm space-y-1">
              <li>• 9x9 board instead of traditional 9x10</li>
              <li>• Simplified piece movement rules</li>
              <li>• Vietnamese cultural styling</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "The Game Board",
      icon: <Target className="h-8 w-8" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            The board consists of a 9x9 grid with special areas:
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-red-200 border border-red-400 rounded mt-1"></div>
              <div>
                <h4 className="font-semibold">Palace (3x3)</h4>
                <p className="text-sm text-gray-600">The General and Advisors must stay within this area</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded mt-1"></div>
              <div>
                <h4 className="font-semibold">River (Middle row)</h4>
                <p className="text-sm text-gray-600">Elephants cannot cross the river</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Piece Movements - Part 1",
      icon: <Zap className="h-8 w-8" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <span className="text-red-600 text-lg">將</span>
                <span>General (將/帥)</span>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Moves one point orthogonally within the palace. Cannot face the enemy General directly.
              </p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <span className="text-red-600 text-lg">士</span>
                <span>Advisor (士/仕)</span>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Moves one point diagonally within the palace only.
              </p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <span className="text-red-600 text-lg">象</span>
                <span>Elephant (象/相)</span>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Moves two points diagonally. Cannot cross the river or jump over pieces.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Piece Movements - Part 2",
      icon: <Zap className="h-8 w-8" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <span className="text-red-600 text-lg">馬</span>
                <span>Horse (馬/傌)</span>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Moves like a knight in chess but can be blocked by adjacent pieces.
              </p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <span className="text-red-600 text-lg">車</span>
                <span>Chariot (車/俥)</span>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Moves any number of points orthogonally, like a rook in chess.
              </p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <span className="text-red-600 text-lg">炮</span>
                <span>Cannon (炮/砲)</span>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Moves like a chariot but must jump over exactly one piece to capture.
              </p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <span className="text-red-600 text-lg">兵</span>
                <span>Soldier (兵/卒)</span>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Moves forward one point. After crossing the river, can also move sideways.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How to Play",
      icon: <Users className="h-8 w-8" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-vietnamese-red text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold">Select a Piece</h4>
                <p className="text-sm text-gray-600">Click on one of your pieces to select it</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-vietnamese-red text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold">See Valid Moves</h4>
                <p className="text-sm text-gray-600">Valid moves will be highlighted in green</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-vietnamese-red text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold">Make Your Move</h4>
                <p className="text-sm text-gray-600">Click on a highlighted square to move your piece</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-vietnamese-red text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h4 className="font-semibold">Capture Pieces</h4>
                <p className="text-sm text-gray-600">Move to a square occupied by an enemy piece to capture it</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Winning the Game",
      icon: <Flag className="h-8 w-8" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Victory Conditions:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <strong>Checkmate:</strong> The enemy General is in check and cannot escape</li>
                <li>• <strong>Stalemate:</strong> The opponent has no legal moves (you win)</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Special Rules:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Generals cannot face each other directly</li>
                <li>• Perpetual check is not allowed</li>
                <li>• You must move out of check immediately</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Game Controls:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use "Undo" to take back your last move</li>
                <li>• Use "Reset" to start a new game</li>
                <li>• Check move history to review the game</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(0)
    onClose()
  }

  if (!isOpen) return null

  const currentTutorial = tutorialSteps[currentStep]

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-vietnamese-red to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-vietnamese-gold">
                {currentTutorial.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentTutorial.title}</h2>
                <p className="text-red-100 text-sm">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-red-400 bg-opacity-30 rounded-full h-2">
              <motion.div 
                className="bg-vietnamese-gold h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentTutorial.content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-vietnamese-red'
                    : index < currentStep
                    ? 'bg-vietnamese-gold'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep === tutorialSteps.length - 1 ? (
            <button
              onClick={handleClose}
              className="flex items-center space-x-2 px-6 py-2 bg-vietnamese-red text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <span>Start Playing!</span>
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-4 py-2 text-vietnamese-red hover:bg-red-50 rounded-lg transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Tutorial