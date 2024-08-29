import { useRoutes } from 'react-router-dom';

import routes from './AppRoutes';

export default function AppRouter() {
  const routesList = [];

  Object.entries(routes).forEach(([key, value]) => {
    routesList.push(...value);
  });

  let element = useRoutes(routesList);

  return element;
}