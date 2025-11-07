import React from 'react';
import { Bell, Book, Home, Map } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  activeAlerts: number;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, activeAlerts, onTabChange }) => {
  const tabs = [
    { id: 'inicio', icon: Home, label: 'Inicio' },
    { id: 'mapa', icon: Map, label: 'Mapa' },
    { id: 'guia', icon: Book, label: 'Guía' },
    { id: 'alertas', icon: Bell, label: 'Alertas' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-3 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors relative ${
                isActive ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{tab.label}</span>
              {tab.id === 'alertas' && activeAlerts > 0 && (
                <span className="absolute top-1 right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {activeAlerts}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};