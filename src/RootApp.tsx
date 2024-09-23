import '@styles/app.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '@context/AuthContext';
import PageLoader from '@components/PageLoader';
import { ToastContainer, toast } from 'react-toastify';

const LoadApp = lazy(() => import('@apps/LoadApp'));

export default function RouteApp() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Suspense fallback={<PageLoader />}>
          <LoadApp />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Suspense>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
