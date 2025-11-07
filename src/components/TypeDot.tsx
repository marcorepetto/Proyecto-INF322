import React from 'react';

interface TypeDotProps {
  type: string;
}

export const TypeDot: React.FC<TypeDotProps> = ({ type }) => {
  const colors: Record<string, string> = {
    plastic: 'bg-blue-500',
    glass: 'bg-emerald-600',
    paper: 'bg-amber-500',
    metal: 'bg-gray-600',
    organic: 'bg-green-700'
  };
  return <div className={`w-2 h-2 rounded-full ${colors[type]}`} />;
};