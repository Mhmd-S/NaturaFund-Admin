import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = lazy(() => import('@/pages/NotFound'));
const Projects = lazy(() => import('@/pages/Projects'));
const Project = lazy(() => import('@/pages/Projects/project'));

let routes = {
  expense: [],
  default: [
    {
      path: '/projects',
      element: <Projects />,
    },
    {
      path: '/projects/:id',
      elemement: <Project />,
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
