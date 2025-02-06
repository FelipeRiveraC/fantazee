// src/routes/AppRouter.tsx
import HomeLayout from 'layouts/HomeLayout';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from 'pages/HomePage';
import LoginForm from 'components/LoginForm';
import ProtectedRoute from './ProtectedRoute';  // Importamos ProtectedRoute
import GuestRoute from './GuestRoute';  // Importamos GuestRoute
import Profile from '../pages/Profile';
import Register from 'pages/Register';
import DraftBoard from 'pages/DraftBoard';
import { MyDraftTeams } from 'pages/MyDraftTeams';
import Head2Head from 'pages/Head2Head';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        {/* Rutas públicas */}
        <Route index element={<HomePage />} />
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="draft" element={<DraftBoard />} />
          <Route path="draft/teams" element={<MyDraftTeams />} />
          <Route path="head2head" element={<Head2Head />} />
        </Route>

        {/* Rutas para usuarios no autenticados */}
        <Route element={<GuestRoute />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
