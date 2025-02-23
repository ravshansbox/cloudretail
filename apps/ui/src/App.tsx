import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './AuthContext';
import { Navbar } from './components';
import { Dashboard, Login } from './pages';

export const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
