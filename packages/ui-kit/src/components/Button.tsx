import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 transition-all duration-300 shadow-md hover:shadow-lg'
  const variantClasses = variant === 'primary'
    ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 border-2 border-black hover:border-gray-800'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 border-2 border-black hover:border-gray-800'

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button