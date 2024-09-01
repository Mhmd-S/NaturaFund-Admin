import { useRoutes } from 'react-router-dom';

import routes from './AppRoutes';

type Route = {
  path: string,
  element: JSX.Element,
}

export default function AppRouter() {
  const routesList: Route[] = [];

  Object.entries(routes).forEach(([key, value]) => {
    routesList.push(...value);
  });
  
  let element = useRoutes(routesList);

  return element;
}