import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = lazy(() => import('@/pages/NotFound'));
const Projects = lazy(() => import('@/pages/Projects'));

let routes = {
  expense: [],
  default: [
    {
      path: '/projects',
      element: <Projects />,
    },
    {
      path: '/kyc',
      element: <Projects />,
    },
    {
      path: '/application',
      element: <Projects />,
    },
    {
      path: '/users',
      element: <Projects />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
