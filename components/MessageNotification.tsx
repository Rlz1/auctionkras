import React from 'react';

interface MessageNotificationProps {
  message: string;
  type: 'success' | 'error';
}

const MessageNotification: React.FC<MessageNotificationProps> = ({ message, type }) => {
  const baseClasses = 'p-4 rounded-md mb-4 text-sm font-medium border';
  const typeClasses = {
    success: 'bg-green-100 text-green-800 border-green-200',
    error: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      {message}
    </div>
  );
};

export default MessageNotification;