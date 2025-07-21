import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// GitHub Pages SPA support
if (typeof window !== 'undefined') {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, '', redirect);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
