import React from 'react'

interface NotificationProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose?: () => void
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  onClose,
}) => {
  const typeClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  }

  return (
    <div className={`p-4 rounded-md ${typeClasses[type]} flex justify-between items-center`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-lg">
          ×
        </button>
      )}
    </div>
  )
}

export default Notification