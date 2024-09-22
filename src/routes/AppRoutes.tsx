import { lazy } from 'react';

const NotFound = lazy(() => import('@pages/NotFound'));

const Projects = lazy(() => import('@pages/Projects'));
const Project = lazy(() => import('@pages/Projects/Project'));

const Applications = lazy(() => import('@pages/Applications'));
const Application = lazy(() => import('@pages/Applications/Application'));

const KYC = lazy(() => import('@pages/KYC'));
const KycDetails = lazy(() => import('@pages/KYC/KycDetails'));

const Users = lazy(() => import('@pages/Users'));
const UserDetails = lazy(() => import('@pages/Users/UserDetails'));

let routes = {
  expense: [],
  default: [
    {
      path: '/',
      element: <Projects />,
    },
    {
      path: '/projects',
      element: <Projects />,
    },
    {
      path: '/projects/:id',
      element: <Project />,
    },
    {
      path: '/kyc',
      element: <KYC />,
    },
    {
      path: '/kyc/:id',
      element: <KycDetails />,
    },
    {
      path: '/applications',
      element: <Applications />,
    },
    {
      path: '/applications/:id',
      element: <Application />,
    },
    {
      path: '/users',
      element: <Users />,
    },
    {
      path: '/users/:id',
      element: <UserDetails />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
