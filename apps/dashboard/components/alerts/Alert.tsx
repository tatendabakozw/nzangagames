
import React from 'react';

type Props = {
  message: string;
  type: string;
};

const Alert = ({ type, message = 'Alert' }: Props) => {
  const getStyleClass = (type: string) => {
    if (type === 'error') return 'bg-red-100 border-red-400 text-red-500';
    if (type === 'success')
      return 'bg-green-100 border-green-400 text-green-500';

    return 'bg-blue-100 border-blue-400 text-blue-500';
  };

  const styleClass = getStyleClass(type);

  return (
    <div className={`${styleClass} p-2 rounded-md border`}>
      <p className="text-xs text-center">{message}</p>
    </div>
  );
};

export default Alert;
