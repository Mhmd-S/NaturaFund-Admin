import Details from '@/pages/KYC/KycDetails';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = lazy(() => import('@/pages/NotFound'));

const Projects = lazy(() => import('@/pages/Projects'));
const Project = lazy(() => import('@/pages/Projects/Project'));

const Applications = lazy(() => import('@/pages/Applications'));
const Application = lazy(() => import('@/pages/Applications/Application'));

const KYC = lazy(() => import('@/pages/KYC'));
const KycDetails = lazy(() => import('@/pages/KYC/KycDetails'));

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
      element: <Projects />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
