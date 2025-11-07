import React from 'react';
import { Calendar, CheckCircle, Clock, MapPin, Package, Trash2, X } from 'lucide-react';
import type { Alert } from '../data/recyclingData';

interface Schedule {
  id: number;
  day: string;
  time: string;
  available: boolean;
}

interface MapModalProps {
  show: boolean;
  alert: Alert | null;
  schedules: Schedule[];
  selectedSchedule: Schedule | null;
  mapZoom: number;
  onClose: () => void;
  onScheduleSelect: (schedule: Schedule) => void;
  onConfirm: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({
  show,
  alert,
  schedules,
  selectedSchedule,
  mapZoom,
  onClose,
  onScheduleSelect,
  onConfirm,
  onZoomIn,
  onZoomOut,
  onResetZoom
}) => {
  if (!show || !alert) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold">Coordinar Retiro</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{alert.location}</span>
          </div>
        </div>

        <div className="relative h-[400px] bg-gradient-to-br from-green-100 to-emerald-200 overflow-hidden">
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
            style={{ transform: `scale(${mapZoom})` }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-600"></div>
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-700"></div>
                <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-600"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-600"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-600"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-600"></div>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative animate-bounce">
                  <div className={`w-16 h-16 ${
                    alert.type === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'
                  } rounded-full flex items-center justify-center shadow-2xl`}>
                    <Trash2 className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 ${
                    alert.type === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'
                  } rotate-45`}></div>
                </div>
              </div>

              <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg z-10 relative">
                    <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 33% 75% Q 40% 60%, 50% 50%"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="10,5"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex flex-col gap-3">
            <button 
              onClick={onZoomIn}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl font-bold">+</span>
            </button>
            <button 
              onClick={onZoomOut}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl font-bold">−</span>
            </button>
            <button 
              onClick={onResetZoom}
              className="w-12 h-12 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 text-white transition-colors"
            >
              <MapPin className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Tiempo estimado</p>
                <p className="font-bold text-gray-800">12 minutos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Detalles del contenedor
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className={`font-semibold ${
                  alert.type === 'urgent' ? 'text-red-600' : 'text-yellow-600'
                }`}>{alert.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Capacidad:</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        alert.capacity >= 90 ? 'bg-red-500' : 
                        alert.capacity >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${alert.capacity}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-800">{alert.capacity}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Última recolección:</span>
                <span className="font-semibold text-gray-800">{alert.lastCollection}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Selecciona horario de retiro
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {schedules.map(schedule => (
                <button
                  key={schedule.id}
                  onClick={() => onScheduleSelect(schedule)}
                  className={`${
                    selectedSchedule?.id === schedule.id
                      ? 'bg-green-100 border-green-500 ring-2 ring-green-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                  } border-2 rounded-xl p-3 transition-all`}
                >
                  <p className="font-semibold text-gray-800">{schedule.day}</p>
                  <p className="text-sm text-gray-600">{schedule.time}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={onConfirm}
              disabled={!selectedSchedule}
              className={`flex-1 ${
                selectedSchedule
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-300 cursor-not-allowed'
              } text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2`}
            >
              <CheckCircle className="w-5 h-5" />
              Confirmar Retiro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
