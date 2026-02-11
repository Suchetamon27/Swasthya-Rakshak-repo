import AdminLayout from './components/layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import HospitalLogs from './pages/HospitalLogs';
import HospitalWatchlist from './pages/HospitalWatchlist';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
  },
  {
    name: 'Admin',
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        name: 'Dashboard',
        path: '',
        element: <Dashboard />,
      },
      {
        name: 'Hospital Logs',
        path: 'logs',
        element: <HospitalLogs />,
      },
      {
        name: 'Hospital Watchlist',
        path: 'watchlist',
        element: <HospitalWatchlist />,
      },
      {
        name: 'Settings',
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    name: 'Not Found',
    path: '*',
    element: <NotFound />,
  }
];

export default routes;
