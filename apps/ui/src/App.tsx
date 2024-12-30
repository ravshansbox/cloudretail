import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { NavLink } from './components/NavLink';
import { Dashboard } from './Dashboard';
import { Login } from './Login';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <ul className="flex gap-1">
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
