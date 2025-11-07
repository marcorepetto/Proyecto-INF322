export type AlertType = 'urgent' | 'warning' | 'scheduled' | 'info';
export type AlertStatus = 'nuevo' | 'programado' | 'info' | 'leido';

export interface Alert {
  id: number;
  type: AlertType;
  title: string;
  description: string;
  location: string;
  time: string;
  status: AlertStatus;
  capacity: number;
  lastCollection: string;
  position: { top: string; left: string };
}

export const initialAlerts: Alert[] = [
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
];

export const schedules = [
  { id: 1, day: 'Hoy', time: '14:00 - 16:00', available: true },
  { id: 2, day: 'Hoy', time: '16:00 - 18:00', available: true },
  { id: 3, day: 'Mañana', time: '09:00 - 11:00', available: true },
  { id: 4, day: 'Mañana', time: '11:00 - 13:00', available: true },
];

export const containers = [
  {
    id: 1,
    name: 'Contenedor Central',
    address: 'Av. Principal #123',
    distance: '150m',
    status: 'available' as const,
    types: ['plastic', 'glass', 'paper'] as const,
    position: { top: '35%', left: '25%' }
  },
  {
    id: 2,
    name: 'Punto Verde Norte',
    address: 'Calle Los Pinos #45',
    distance: '320m',
    status: 'available' as const,
    types: ['plastic', 'glass'] as const,
    position: { top: '48%', right: '30%' }
  },
  {
    id: 3,
    name: 'Eco Centro Sur',
    address: 'Av. Las Flores #890',
    distance: '580m',
    status: 'available' as const,
    types: ['plastic', 'glass', 'paper'] as const,
    position: { top: '62%', left: '35%' }
  },
  {
    id: 4,
    name: 'Reciclaje Express',
    address: 'Calle Verde #234',
    distance: '720m',
    status: 'full' as const,
    types: ['plastic', 'glass', 'paper', 'metal'] as const,
    position: { top: '72%', right: '25%' }
  }
];

export const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'plastic', label: 'Plástico' },
  { id: 'glass', label: 'Vidrio' },
  { id: 'paper', label: 'Papel' },
  { id: 'metal', label: 'Metal' },
  { id: 'organic', label: 'Orgánico' }
];

export const guideCategories = [
  {
    id: 'plastic',
    name: 'Plástico',
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