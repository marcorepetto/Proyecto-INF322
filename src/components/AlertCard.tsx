import React from 'react';
import { AlertTriangle, Bell, CheckCircle, Clock, MapPin, X } from 'lucide-react';
import type{ Alert } from '../data/recyclingData';

interface AlertCardProps {
  alert: Alert;
  onMarkAsRead: (id: number) => void;
  onCoordinate: (alert: Alert) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onMarkAsRead, onCoordinate }) => {
  const getIconAndColor = () => {
    switch(alert.type) {
      case 'urgent':
        return { icon: AlertTriangle, color: 'red', bg: 'bg-red-50', border: 'border-red-200', iconBg: 'bg-red-100', iconColor: 'text-red-600' };
      case 'warning':
        return { icon: AlertTriangle, color: 'yellow', bg: 'bg-yellow-50', border: 'border-yellow-200', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' };
      case 'scheduled':
        return { icon: CheckCircle, color: 'green', bg: 'bg-green-50', border: 'border-green-200', iconBg: 'bg-green-100', iconColor: 'text-green-600' };
      default:
        return { icon: Bell, color: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' };
    }
  };

  const { icon: Icon, bg, border, iconBg, iconColor } = getIconAndColor();

  return (
    <div className={`${bg} ${border} border-2 rounded-2xl p-5 mb-4 hover:shadow-md transition-all`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-gray-800 text-lg">{alert.title}</h3>
            <div className="flex items-center gap-2">
              {alert.status === 'nuevo' && (
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Nuevo
                </span>
              )}
              <button
                onClick={() => onMarkAsRead(alert.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-3">{alert.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{alert.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{alert.time}</span>
            </div>
          </div>

          {(alert.type === 'urgent' || alert.type === 'warning') && (
            <button 
              onClick={() => onCoordinate(alert)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Coordinar retiro
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
