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
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t border-gray-200 shadow-[0_-6px_20px_rgba(16,185,129,0.12)] z-50">
      <div className="flex justify-around items-center py-2.5 px-2 [padding-bottom:env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className={`absolute -inset-x-2 -top-1 bottom-0 rounded-xl transition-transform ${
                isActive ? 'bg-emerald-50 scale-100' : 'scale-95'
              }`} aria-hidden/>
              <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'text-emerald-700' : ''}`} />
              <span className="text-[11px] font-semibold relative z-10">{tab.label}</span>
              {tab.id === 'alertas' && activeAlerts > 0 && (
                <span className="absolute -top-1.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold shadow">
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