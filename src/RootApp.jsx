import '@/style/app.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageLoader from '@/components/PageLoader';

const App = lazy(() => import('./apps/App'));

export default function RoutApp() {
  return (
    <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <App />
        </Suspense>
    </BrowserRouter>
  );
}