import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#2C2C2C',
            color: '#D4AF37',
            border: '1px solid #D4AF37',
            fontFamily: 'Lato, sans-serif',
          },
          success: { iconTheme: { primary: '#D4AF37', secondary: '#2C2C2C' } },
        }}
      />
    </HelmetProvider>
  </React.StrictMode>
);
