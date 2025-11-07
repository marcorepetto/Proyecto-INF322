import { useState } from 'react';
import { Bell, Book, Calendar, ChevronRight, Clock, Info, MapPin, Navigation, Package, Trash2, User, Wine, Newspaper, Apple, Wrench, Filter as FilterIcon, X } from 'lucide-react';
import { AlertCard } from './components/AlertCard';
import { BottomNav } from './components/BottomNav';
import { MapModal } from './components/MapModal';
import { TypeDot } from './components/TypeDot';
import { initialAlerts, schedules, containers, filters, guideCategories } from './data/recyclingData';
import type { Alert } from './data/recyclingData';
import './styles/animations.css';

const RecyclingApp = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [notifications, setNotifications] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showContainersList, setShowContainersList] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<any>(null);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const handleConfirmPickup = () => {
    if (!selectedSchedule || !selectedAlert) return;

    setAlerts(prevAlerts => prevAlerts.map(alert => {
      if (alert.id === selectedAlert.id) {
        return {
          ...alert,
          type: 'scheduled' as const,
          status: 'programado' as const,
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

  const handleMarkAsRead = (alertId: number) => {
    setAlerts(prevAlerts => prevAlerts.map(alert => {
      if (alert.id === alertId) {
        return { ...alert, status: 'leido' as const };
      }
      return alert;
    }));
  };

  const handleMarkAllAsRead = () => {
    setAlerts(prevAlerts => prevAlerts.map(alert => ({
      ...alert,
      status: 'leido' as const
    })));
  };

  const getStatusColor = (status: string) => {
    return status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700';
  };

  const getStatusText = (status: string) => {
    return status === 'available' ? 'Disponible' : 'Lleno';
  };

  const activeAlerts = alerts.filter(a => a.status === 'nuevo').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <MapModal 
        show={showMapModal}
        alert={selectedAlert}
        schedules={schedules}
        selectedSchedule={selectedSchedule}
        mapZoom={mapZoom}
        onClose={() => {
          setShowMapModal(false);
          setSelectedAlert(null);
          setSelectedSchedule(null);
        }}
        onScheduleSelect={setSelectedSchedule}
        onConfirm={handleConfirmPickup}
        onZoomIn={() => setMapZoom(prev => Math.min(prev + 0.2, 2))}
        onZoomOut={() => setMapZoom(prev => Math.max(prev - 0.2, 0.5))}
        onResetZoom={() => setMapZoom(1)}
      />
      
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
                    .filter(c => selectedFilter === 'all' || c.types.includes(selectedFilter as any))
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
                      {containers.filter(c => selectedFilter === 'all' || c.types.includes(selectedFilter as any)).length} contenedores
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
                    const iconMap: any = {
                      all: FilterIcon,
                      plastic: Package,
                      glass: Wine,
                      paper: Newspaper,
                      metal: Wrench,
                      organic: Apple
                    };
                    const Icon = iconMap[filter.id];
                    const filteredCount = filter.id === 'all' 
                      ? containers.length 
                      : containers.filter(c => c.types.includes(filter.id as any)).length;
                    
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
                        {selectedContainer.types.map((type: string) => {
                          const typeInfo: any = {
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
                    Todos los contenedores ({containers.filter(c => selectedFilter === 'all' || c.types.includes(selectedFilter as any)).length})
                  </h3>
                  {containers
                    .filter(c => selectedFilter === 'all' || c.types.includes(selectedFilter as any))
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
                const iconMap: any = {
                  plastic: Package,
                  glass: Wine,
                  paper: Newspaper,
                  metal: Wrench,
                  organic: Apple
                };
                const Icon = iconMap[category.id];
                
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
                  <AlertCard 
                    key={alert.id} 
                    alert={alert}
                    onMarkAsRead={handleMarkAsRead}
                    onCoordinate={(alert) => {
                      setSelectedAlert(alert);
                      setShowMapModal(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav 
        activeTab={activeTab}
        activeAlerts={activeAlerts}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default RecyclingApp;