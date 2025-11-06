import React, { useState } from 'react';
import { Bell, Map, Book, Home, AlertTriangle, MapPin, Clock, CheckCircle, Trash2, X, Calendar, Package, Wine, Newspaper, Apple, ChevronRight, Info, Wrench, Search, Filter, Navigation, User } from 'lucide-react';

const RecyclingApp = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [notifications, setNotifications] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showContainersList, setShowContainersList] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);
  
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Contenedor lleno',
      description: 'El contenedor está lleno y requiere retiro inmediato',
      location: 'Reciclaje Express',
      time: 'Hace 5 min',
      status: 'nuevo',
      capacity: 100,
      lastCollection: 'Hace 3 días',
      position: { top: '50%', left: '50%' }
    },
    {
      id: 2,
      type: 'warning',
      title: 'Casi lleno',
      description: 'El contenedor está al 80% de capacidad',
      location: 'Punto Verde Norte',
      time: 'Hace 30 min',
      status: 'nuevo',
      capacity: 80,
      lastCollection: 'Hace 2 días',
      position: { top: '30%', left: '60%' }
    },
    {
      id: 3,
      type: 'scheduled',
      title: 'Retiro programado',
      description: 'Retiro confirmado para mañana a las 10:00',
      location: 'Contenedor Central',
      time: 'Hace 2 horas',
      status: 'programado',
      capacity: 65,
      lastCollection: 'Hace 1 día',
      position: { top: '65%', left: '35%' }
    },
    {
      id: 4,
      type: 'info',
      title: 'Nuevo contenedor disponible',
      description: 'Se ha agregado un nuevo punto de reciclaje cerca de ti',
      location: 'Eco Centro Sur',
      time: 'Hace 1 día',
      status: 'info',
      capacity: 0,
      lastCollection: 'Nunca',
      position: { top: '40%', left: '25%' }
    }
  ]);

  const schedules = [
    { id: 1, day: 'Hoy', time: '14:00 - 16:00', available: true },
    { id: 2, day: 'Hoy', time: '16:00 - 18:00', available: true },
    { id: 3, day: 'Mañana', time: '09:00 - 11:00', available: true },
    { id: 4, day: 'Mañana', time: '11:00 - 13:00', available: true },
  ];

  const containers = [
    {
      id: 1,
      name: 'Contenedor Central',
      address: 'Av. Principal #123',
      distance: '150m',
      status: 'available',
      types: ['plastic', 'glass', 'paper'],
      position: { top: '35%', left: '25%' }
    },
    {
      id: 2,
      name: 'Punto Verde Norte',
      address: 'Calle Los Pinos #45',
      distance: '320m',
      status: 'available',
      types: ['plastic', 'glass'],
      position: { top: '48%', right: '30%' }
    },
    {
      id: 3,
      name: 'Eco Centro Sur',
      address: 'Av. Las Flores #890',
      distance: '580m',
      status: 'available',
      types: ['plastic', 'glass', 'paper'],
      position: { top: '62%', left: '35%' }
    },
    {
      id: 4,
      name: 'Reciclaje Express',
      address: 'Calle Verde #234',
      distance: '720m',
      status: 'full',
      types: ['plastic', 'glass', 'paper', 'metal'],
      position: { top: '72%', right: '25%' }
    }
  ];

  const filters = [
    { id: 'all', label: 'Todos', icon: Filter },
    { id: 'plastic', label: 'Plástico', icon: Package },
    { id: 'glass', label: 'Vidrio', icon: Wine },
    { id: 'paper', label: 'Papel', icon: Newspaper },
    { id: 'metal', label: 'Metal', icon: Wrench },
    { id: 'organic', label: 'Orgánico', icon: Apple }
  ];

  const guideCategories = [
    {
      id: 'plastic',
      name: 'Plástico',
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      description: 'Envases y productos fabricados con plásticos como botellas y envases de alimentación.',
      steps: [
        { icon: '🍾', label: 'Vacía', desc: 'el envase completamente' },
        { icon: '💧', label: 'Enjuaga', desc: 'con agua limpia' },
        { icon: '👋', label: 'Aplasta', desc: 'para ahorrar espacio' },
        { icon: '♻️', label: 'Deposita', desc: 'en contenedor azul' }
      ]
    },
    {
      id: 'glass',
      name: 'Vidrio',
      icon: Wine,
      color: 'bg-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-600',
      description: 'Envases de vidrio, como las botellas de bebidas alcohólicas, refresco y agua.',
      steps: [
        { icon: '🍷', label: 'Retira', desc: 'tapas y etiquetas' },
        { icon: '💧', label: 'Enjuaga', desc: 'el interior' },
        { icon: '🚫', label: 'Separa', desc: 'vidrio roto aparte' },
        { icon: '♻️', label: 'Deposita', desc: 'en contenedor verde' }
      ]
    },
    {
      id: 'paper',
      name: 'Papel y Cartón',
      icon: Newspaper,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-500',
      description: 'Papeles y cartones, como cajas o envases de alimentos. Periódicos, revistas, papeles de envolver o folletos publicitarios.',
      steps: [
        { icon: '📦', label: 'Aplana', desc: 'cajas de cartón' },
        { icon: '✂️', label: 'Retira', desc: 'cintas y grapas' },
        { icon: '💦', label: 'Mantén', desc: 'seco y limpio' },
        { icon: '♻️', label: 'Deposita', desc: 'en contenedor amarillo' }
      ]
    },
    {
      id: 'metal',
      name: 'Metal',
      icon: Wrench,
      color: 'bg-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-600',
      description: 'Latas de bebidas, conservas y envases metálicos.',
      steps: [
        { icon: '🥫', label: 'Vacía', desc: 'el contenido' },
        { icon: '💧', label: 'Enjuaga', desc: 'bien el interior' },
        { icon: '👋', label: 'Aplasta', desc: 'latas si es posible' },
        { icon: '♻️', label: 'Deposita', desc: 'en contenedor gris' }
      ]
    },
    {
      id: 'organic',
      name: 'Orgánico',
      icon: Apple,
      color: 'bg-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-700',
      description: 'Restos de frutas, verduras, cáscaras, posos de café y restos de comida.',
      steps: [
        { icon: '🍎', label: 'Separa', desc: 'restos orgánicos' },
        { icon: '🚫', label: 'Sin', desc: 'plásticos ni metal' },
        { icon: '🗑️', label: 'Usa', desc: 'bolsa compostable' },
        { icon: '♻️', label: 'Deposita', desc: 'en contenedor marrón' }
      ]
    }
  ];

  const handleConfirmPickup = () => {
    if (!selectedSchedule || !selectedAlert) return;

    setAlerts(prevAlerts => prevAlerts.map(alert => {
      if (alert.id === selectedAlert.id) {
        return {
          ...alert,
          type: 'scheduled',
          status: 'programado',
          title: 'Retiro programado',
          description: `Retiro confirmado para ${selectedSchedule.day.toLowerCase()} ${selectedSchedule.time}`,
          time: 'Ahora'
        };
      }
      return alert;
    }));

    setShowMapModal(false);
    setSelectedAlert(null);
    setSelectedSchedule(null);
    alert('✅ Retiro confirmado exitosamente');
  };

  const handleMarkAsRead = (alertId) => {
    setAlerts(prevAlerts => prevAlerts.map(alert => {
      if (alert.id === alertId) {
        return { ...alert, status: 'leido' };
      }
      return alert;
    }));
  };

  const handleMarkAllAsRead = () => {
    setAlerts(prevAlerts => prevAlerts.map(alert => ({
      ...alert,
      status: 'leido'
    })));
  };

  const getStatusColor = (status) => {
    return status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700';
  };

  const getStatusText = (status) => {
    return status === 'available' ? 'Disponible' : 'Lleno';
  };

  const TypeDot = ({ type }) => {
    const colors = {
      plastic: 'bg-blue-500',
      glass: 'bg-emerald-600',
      paper: 'bg-amber-500',
      metal: 'bg-gray-600',
      organic: 'bg-green-700'
    };
    return <div className={`w-2 h-2 rounded-full ${colors[type]}`} />;
  };

  const MapModal = () => {
    if (!showMapModal || !selectedAlert) return null;

    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 sticky top-0 z-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-bold">Coordinar Retiro</h2>
              <button
                onClick={() => {
                  setShowMapModal(false);
                  setSelectedAlert(null);
                  setSelectedSchedule(null);
                }}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{selectedAlert.location}</span>
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
                      selectedAlert.type === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'
                    } rounded-full flex items-center justify-center shadow-2xl`}>
                      <Trash2 className="w-8 h-8 text-white" />
                    </div>
                    <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 ${
                      selectedAlert.type === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'
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
                onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 2))}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl font-bold">+</span>
              </button>
              <button 
                onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.5))}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl font-bold">−</span>
              </button>
              <button 
                onClick={() => setMapZoom(1)}
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
                    selectedAlert.type === 'urgent' ? 'text-red-600' : 'text-yellow-600'
                  }`}>{selectedAlert.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Capacidad:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          selectedAlert.capacity >= 90 ? 'bg-red-500' : 
                          selectedAlert.capacity >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${selectedAlert.capacity}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-800">{selectedAlert.capacity}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Última recolección:</span>
                  <span className="font-semibold text-gray-800">{selectedAlert.lastCollection}</span>
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
                    onClick={() => setSelectedSchedule(schedule)}
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
                onClick={() => {
                  setShowMapModal(false);
                  setSelectedAlert(null);
                  setSelectedSchedule(null);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmPickup}
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

  const AlertCard = ({ alert }) => {
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
                  onClick={() => handleMarkAsRead(alert.id)}
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
                onClick={() => {
                  setSelectedAlert(alert);
                  setShowMapModal(true);
                }}
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

  const activeAlerts = alerts.filter(a => a.status === 'nuevo').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <MapModal />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">MI CAMIÓN</h1>
              <p className="text-sm text-green-100">Quilpué, Valparaíso</p>
            </div>
          </div>
          <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === 'inicio' && (
          <div>
            {/* Header con branding */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-6 mb-6 text-white shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <div className="text-3xl">♻️</div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">Reciclaje Inteligente</h2>
                  <p className="text-green-100 text-sm">Cuida el planeta, recicla con inteligencia</p>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{containers.length}</div>
                <div className="text-xs text-gray-600">Contenedores cercanos</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Package className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{guideCategories.length}</div>
                <div className="text-xs text-gray-600">Materiales clasificados</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Bell className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{activeAlerts}</div>
                <div className="text-xs text-gray-600">Alertas activas</div>
              </div>
            </div>

            {/* Consejo del día */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 mb-6 border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Consejo del día
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Recuerda lavar y secar las botellas plásticas antes de reciclarlas. Esto ayuda a mantener la calidad del material reciclado y evita contaminación.
                  </p>
                </div>
              </div>
            </div>

            {/* Horario del camión recolector */}
            <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <div className="text-3xl">🚛</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Próxima recolección</h3>
                  <p className="text-sm text-gray-600 mb-3">Tu zona: Quilpué, Valparaíso</p>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 mb-3 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-gray-900 text-xl">MARTES</span>
                      </div>
                      <div className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        En 2 días
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Horario: 8:00 - 21:00</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-900">Materiales a recolectar:</p>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Papel y Cartón</p>
                          <p className="text-xs text-gray-600">Papeles, cartones, hojas de impresora</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Envases Livianos</p>
                          <p className="text-xs text-gray-600">Botellas plásticas, frascos, envases de alimentos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Vidrio</p>
                          <p className="text-xs text-gray-600">Botellas y frascos de vidrio</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones rápidas</h3>
              
              <button 
                onClick={() => setActiveTab('mapa')}
                className="w-full bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Encontrar contenedor</h4>
                    <p className="text-sm text-gray-600">Localiza el punto de reciclaje más cercano con filtros por tipo de material</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('guia')}
                className="w-full bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-200 hover:shadow-md hover:border-yellow-300 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Book className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Guía de reciclaje</h4>
                    <p className="text-sm text-gray-600">Aprende a clasificar y preparar tus materiales correctamente</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('alertas')}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-red-300 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Alertas activas</h4>
                    <p className="text-sm text-gray-600">Recibe notificaciones cuando los contenedores están llenos</p>
                  </div>
                  {activeAlerts > 0 && (
                    <div className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {activeAlerts}
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'mapa' && (
          <div className="fixed top-[88px] bottom-20 left-0 right-0">
            {/* Mapa Principal */}
            <div className="absolute inset-0">
              <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50">
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* Calles del mapa */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 left-0 right-0 h-1 bg-amber-200/40"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-amber-300/50"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-1 bg-amber-200/40"></div>
                    <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-amber-200/40"></div>
                    <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-amber-200/40"></div>
                  </div>

                  {/* Contenedores en el mapa */}
                  {containers
                    .filter(c => selectedFilter === 'all' || c.types.includes(selectedFilter))
                    .map((container) => (
                    <div
                      key={container.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 cursor-pointer z-20"
                      style={container.position}
                      onClick={() => setSelectedContainer(container)}
                    >
                      <div className="relative group">
                        <div className={`w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all ${
                          selectedContainer?.id === container.id
                            ? 'ring-4 ring-blue-400'
                            : ''
                        } ${
                          container.status === 'available' 
                            ? 'bg-emerald-500 animate-pulse' 
                            : 'bg-red-500'
                        }`}>
                          <Trash2 size={28} className="text-white" />
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                            {container.name}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Tu ubicación */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="relative">
                      <div className="absolute inset-0 w-16 h-16 bg-blue-500/30 rounded-full animate-ping"></div>
                      <div className="relative w-10 h-10 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controles del mapa */}
                <div className="absolute bottom-6 right-4 flex flex-col gap-3 z-20">
                  <button className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-emerald-50 transition-colors">
                    <Navigation size={20} className="text-emerald-600" />
                  </button>
                  
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <button className="w-12 h-12 flex items-center justify-center hover:bg-emerald-50 transition-colors border-b border-gray-100">
                      <span className="text-xl font-bold text-gray-600">+</span>
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center hover:bg-emerald-50 transition-colors">
                      <span className="text-xl font-bold text-gray-600">−</span>
                    </button>
                  </div>
                </div>

                {/* Info contador */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg px-4 py-3 z-10">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {containers.filter(c => selectedFilter === 'all' || c.types.includes(selectedFilter)).length} contenedores
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel desplegable de filtros y lista - ABAJO */}
            <div className={`fixed left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-all duration-300 ease-in-out z-50 ${
              showContainersList ? 'bottom-20 h-[calc(70vh-80px)]' : 'bottom-20 h-24'
            }`}>
              {/* Handle para arrastrar */}
              <button 
                onClick={() => setShowContainersList(!showContainersList)}
                className="w-full py-3 flex items-center justify-center hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </button>

              {/* Filtros horizontales */}
              <div className="px-4 pb-4 border-b border-gray-200">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {filters.map((filter) => {
                    const Icon = filter.icon;
                    const filteredCount = filter.id === 'all' 
                      ? containers.length 
                      : containers.filter(c => c.types.includes(filter.id)).length;
                    
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`px-4 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all whitespace-nowrap ${
                          selectedFilter === filter.id
                            ? 'bg-emerald-600 text-white shadow-md scale-105'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Icon size={16} />
                        {filter.label}
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                          selectedFilter === filter.id
                            ? 'bg-white/20'
                            : 'bg-white'
                        }`}>
                          {filteredCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lista de contenedores */}
              <div className={`overflow-y-auto transition-all duration-300 ${
                showContainersList ? 'h-[calc(100%-120px)] px-4 pt-4' : 'h-0 overflow-hidden'
              }`}>
                {selectedContainer && (
                  <div className="mb-4 bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 animate-slideDown">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin size={24} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{selectedContainer.name}</h4>
                          <p className="text-sm text-gray-600">{selectedContainer.address}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedContainer(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-white rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-1">Distancia</p>
                        <div className="flex items-center gap-1">
                          <Navigation size={14} className="text-emerald-600" />
                          <span className="font-bold text-gray-900">{selectedContainer.distance}</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-1">Estado</p>
                        <span className={`text-sm font-bold ${
                          selectedContainer.status === 'available' ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {getStatusText(selectedContainer.status)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-3 mb-3">
                      <p className="text-xs text-gray-500 mb-2">Tipos de reciclaje</p>
                      <div className="flex gap-2 flex-wrap">
                        {selectedContainer.types.map((type) => {
                          const typeInfo = {
                            plastic: { label: 'Plástico', color: 'bg-blue-500' },
                            glass: { label: 'Vidrio', color: 'bg-emerald-600' },
                            paper: { label: 'Papel', color: 'bg-amber-500' },
                            metal: { label: 'Metal', color: 'bg-gray-600' },
                            organic: { label: 'Orgánico', color: 'bg-green-700' }
                          };
                          return (
                            <span key={type} className={`${typeInfo[type].color} text-white text-xs px-3 py-1.5 rounded-full font-medium`}>
                              {typeInfo[type].label}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Navigation size={18} />
                      Cómo llegar
                    </button>
                  </div>
                )}

                <div className="space-y-3 pb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Todos los contenedores ({containers.filter(c => selectedFilter === 'all' || c.types.includes(selectedFilter)).length})
                  </h3>
                  {containers
                    .filter(c => selectedFilter === 'all' || c.types.includes(selectedFilter))
                    .map((container) => (
                    <div
                      key={container.id}
                      onClick={() => setSelectedContainer(container)}
                      className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border-2 ${
                        selectedContainer?.id === container.id
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          selectedContainer?.id === container.id
                            ? 'bg-blue-500'
                            : 'bg-emerald-50'
                        }`}>
                          <MapPin size={24} className={`${
                            selectedContainer?.id === container.id
                              ? 'text-white'
                              : 'text-emerald-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{container.name}</h4>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(container.status)}`}>
                              {getStatusText(container.status)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-500 mb-2">{container.address}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1.5">
                              {container.types.map((type, idx) => (
                                <TypeDot key={idx} type={type} />
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-1 text-emerald-600">
                              <Navigation size={14} />
                              <span className="text-sm font-medium">{container.distance}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guia' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-4 border-l-4 border-emerald-500 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Tutorial inicial</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Selecciona un tipo de material para ver ejemplos detallados, consejos de preparación y qué hacer o no hacer al reciclar.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4">Tipos de materiales</h3>

            <div className="space-y-3">
              {guideCategories.map((category) => {
                const isExpanded = expandedCategory === category.id;
                const Icon = category.icon;
                
                return (
                  <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Icon size={32} className="text-white" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.steps.length} pasos</p>
                      </div>

                      <ChevronRight 
                        size={24} 
                        className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </button>

                    {isExpanded && (
                      <div className={`${category.bgColor} border-t border-gray-200 animate-expandDown`}>
                        <div className="px-6 pt-6 pb-4">
                          <p className="text-gray-700 leading-relaxed text-center mb-2">
                            {category.description}
                          </p>
                        </div>

                        <div className="w-full py-8">
                          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                            {category.steps.map((step, index) => (
                              <div 
                                key={index}
                                className="flex flex-col items-center text-center animate-step-appear"
                                style={{ animationDelay: `${index * 0.15}s` }}
                              >
                                <div className={`relative w-24 h-24 ${category.color} rounded-full flex items-center justify-center mb-3 shadow-lg animate-step-pulse`}
                                     style={{ animationDelay: `${index * 0.15}s` }}>
                                  <span className="text-4xl">{step.icon}</span>
                                  <div className={`absolute -top-2 -right-2 w-8 h-8 ${category.color} rounded-full flex items-center justify-center text-white text-sm font-bold border-4 border-white shadow`}>
                                    {index + 1}
                                  </div>
                                </div>
                                
                                <h4 className="font-bold text-gray-900 mb-1">{step.label}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="px-6 pb-6">
                          <div className={`${category.color} bg-opacity-10 rounded-xl p-4 border-2 ${category.borderColor}`}>
                            <p className="text-sm text-gray-700 text-center font-medium">
                              💡 Recuerda: Mantener los materiales limpios y secos ayuda al proceso de reciclaje
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'alertas' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Alertas y Notificaciones</h2>
                  <p className="text-sm text-gray-500">Mantente informado sobre el estado de los contenedores</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Bell className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Notificaciones automáticas</h3>
                    <p className="text-sm text-gray-500">Recibe alertas cuando los contenedores estén llenos</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      notifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  ></div>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Alertas activas ({activeAlerts})
              </h3>
              {activeAlerts > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            {alerts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No hay alertas</p>
                <p className="text-sm text-gray-400">Te notificaremos cuando haya novedades</p>
              </div>
            ) : (
              <div>
                {alerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center py-3 px-2">
          {[
            { id: 'inicio', icon: Home, label: 'Inicio' },
            { id: 'mapa', icon: Map, label: 'Mapa' },
            { id: 'guia', icon: Book, label: 'Guía' },
            { id: 'alertas', icon: Bell, label: 'Alertas' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes expandDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 1000px;
          }
        }

        @keyframes stepAppear {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes stepPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-expandDown {
          animation: expandDown 0.3s ease-out;
        }

        .animate-step-appear {
          animation: stepAppear 0.5s ease-out backwards;
        }

        .animate-step-pulse {
          animation: stepPulse 2s ease-in-out infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default RecyclingApp;