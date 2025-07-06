import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { Palette, X, Check } from 'lucide-react'

const THEMES = {
  classic: {
    name: 'Classic Vietnamese',
    description: 'Traditional red and gold colors',
    boardColors: {
      light: 'bg-amber-50',
      dark: 'bg-amber-100',
      border: 'border-amber-800',
      river: 'bg-blue-100',
      palace: 'bg-red-100'
    },
    pieceColors: {
      red: 'text-red-700 bg-red-50 border-red-300',
      black: 'text-gray-800 bg-gray-50 border-gray-400'
    },
    accent: 'vietnamese-red'
  },
  modern: {
    name: 'Modern Blue',
    description: 'Clean blue and white design',
    boardColors: {
      light: 'bg-slate-50',
      dark: 'bg-slate-100',
      border: 'border-slate-600',
      river: 'bg-blue-200',
      palace: 'bg-blue-100'
    },
    pieceColors: {
      red: 'text-blue-700 bg-blue-50 border-blue-300',
      black: 'text-slate-800 bg-slate-50 border-slate-400'
    },
    accent: 'blue-600'
  },
  elegant: {
    name: 'Elegant Dark',
    description: 'Sophisticated dark theme',
    boardColors: {
      light: 'bg-gray-700',
      dark: 'bg-gray-800',
      border: 'border-gray-300',
      river: 'bg-indigo-800',
      palace: 'bg-purple-800'
    },
    pieceColors: {
      red: 'text-red-300 bg-red-900 border-red-400',
      black: 'text-gray-200 bg-gray-600 border-gray-300'
    },
    accent: 'purple-600'
  },
  nature: {
    name: 'Nature Green',
    description: 'Earth tones and green accents',
    boardColors: {
      light: 'bg-green-50',
      dark: 'bg-green-100',
      border: 'border-green-800',
      river: 'bg-teal-200',
      palace: 'bg-emerald-100'
    },
    pieceColors: {
      red: 'text-red-700 bg-red-50 border-red-400',
      black: 'text-green-800 bg-green-50 border-green-400'
    },
    accent: 'green-600'
  },
  royal: {
    name: 'Royal Purple',
    description: 'Luxurious purple and gold',
    boardColors: {
      light: 'bg-purple-50',
      dark: 'bg-purple-100',
      border: 'border-purple-800',
      river: 'bg-indigo-200',
      palace: 'bg-yellow-100'
    },
    pieceColors: {
      red: 'text-purple-700 bg-purple-50 border-purple-300',
      black: 'text-gray-800 bg-gray-50 border-gray-400'
    },
    accent: 'purple-600'
  }
}

const ThemeSelector = ({ isOpen, onClose }) => {
  const { currentTheme, setTheme } = useGameStore()

  const handleThemeSelect = (themeKey) => {
    setTheme(themeKey)
  }

  if (!isOpen) return null

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Palette className="h-6 w-6" />
              <div>
                <h2 className="text-xl font-bold">Theme Selection</h2>
                <p className="text-purple-100 text-sm">
                  Choose your preferred board style
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Theme Grid */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(THEMES).map(([themeKey, theme]) => {
              const isSelected = currentTheme === themeKey
              
              return (
                <motion.div
                  key={themeKey}
                  className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-purple-500 shadow-lg ring-2 ring-purple-200' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => handleThemeSelect(themeKey)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Theme Preview */}
                  <div className="h-32 p-4 relative">
                    {/* Mini Board Preview */}
                    <div className="grid grid-cols-3 gap-1 h-full">
                      {Array.from({ length: 9 }).map((_, i) => {
                        const isLight = (Math.floor(i / 3) + (i % 3)) % 2 === 0
                        const isRiver = Math.floor(i / 3) === 1
                        const isPalace = i === 0 || i === 2 || i === 6 || i === 8
                        
                        let bgClass = isLight ? theme.boardColors.light : theme.boardColors.dark
                        if (isRiver) bgClass = theme.boardColors.river
                        if (isPalace) bgClass = theme.boardColors.palace
                        
                        return (
                          <div
                            key={i}
                            className={`${bgClass} ${theme.boardColors.border} border rounded-sm flex items-center justify-center`}
                          >
                            {/* Sample pieces */}
                            {i === 0 && (
                              <div className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${theme.pieceColors.red}`}>
                                將
                              </div>
                            )}
                            {i === 8 && (
                              <div className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${theme.pieceColors.black}`}>
                                帥
                              </div>
                            )}
                            {i === 3 && (
                              <div className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${theme.pieceColors.red}`}>
                                車
                              </div>
                            )}
                            {i === 5 && (
                              <div className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${theme.pieceColors.black}`}>
                                俥
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Check className="h-3 w-3" />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Theme Info */}
                  <div className="p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {theme.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {theme.description}
                    </p>
                    
                    {/* Color Palette */}
                    <div className="flex space-x-2 mt-3">
                      <div className={`w-4 h-4 rounded-full ${theme.boardColors.light} border`} title="Light squares" />
                      <div className={`w-4 h-4 rounded-full ${theme.boardColors.dark} border`} title="Dark squares" />
                      <div className={`w-4 h-4 rounded-full ${theme.boardColors.river} border`} title="River" />
                      <div className={`w-4 h-4 rounded-full ${theme.boardColors.palace} border`} title="Palace" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Current theme: <span className="font-medium">{THEMES[currentTheme]?.name || 'Classic Vietnamese'}</span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleThemeSelect('classic')}
              className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Reset to Default
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Apply Theme
            </button>
          </div>
        </div>

        {/* Theme Tips */}
        <div className="px-6 pb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-800 mb-1">💡 Theme Tips</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Themes change board colors and piece styling</li>
              <li>• Dark themes are easier on the eyes in low light</li>
              <li>• Classic theme maintains traditional Vietnamese aesthetics</li>
              <li>• Your theme preference is saved automatically</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ThemeSelector