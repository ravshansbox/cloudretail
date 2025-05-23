import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './AuthContext';
import { Dashboard, Login } from './pages';

const routes = [
  { path: '/', Component: Dashboard },
  { path: '/login', Component: Login },
];

export const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.Component}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
