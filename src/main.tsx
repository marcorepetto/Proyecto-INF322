import React from 'react';
import { createRoot } from 'react-dom/client';
import RecyclingApp from './App';
import './index.css'; // opcional, viene por defecto en Vite

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecyclingApp />
  </React.StrictMode>
);