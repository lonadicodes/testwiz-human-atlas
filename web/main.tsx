import {createRoot} from 'react-dom/client';
import Home from '../app/page';
import '../app/globals.css';
createRoot(document.getElementById('root')!).render(<Home/>);

// Keep the development server free of stale service-worker state. Production
// installs the lightweight app shell; model chunks continue using the atlas's
// size-checked IndexedDB cache instead of duplicating them in Cache Storage.
if (location.protocol === 'https:' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js', {scope: '/'}).catch(() => undefined);
  }, {once: true});
}
