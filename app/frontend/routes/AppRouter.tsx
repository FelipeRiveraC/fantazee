// src/routes/AppRouter.tsx
import HomeLayout from 'layouts/HomeLayout';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from 'pages/HomePage';
import LoginForm from 'components/LoginForm';
import EngagementShow from 'components/EngagementShow';
import ProtectedRoute from './ProtectedRoute';  // Importamos ProtectedRoute
import GuestRoute from './GuestRoute';  // Importamos GuestRoute
import Profile from '../pages/Profile';
import Register from 'pages/Register';
import TravelsList from 'components/TravelsList';
import CreateTravelForm from 'components/CreateTravelForm';
import EditTravelForm from 'components/EditTravelForm'; // Importa el componente de edición
import TravelRequestForm from 'components/TravelRequestForm'; // Importa el formulario de solicitud de viaje
import TravelShow from 'components/TravelShow';
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        {/* Rutas públicas */}
        <Route index element={<HomePage />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="engagements/:id/edit" element={<EngagementShow />} />
          <Route path="profile" element={<Profile />} />
          <Route path="travels" element={<TravelsList />} />
          <Route path="travels/new" element={<CreateTravelForm />} />
          <Route path="travels/:id/edit" element={<EditTravelForm />} /> {/* Nueva ruta de edición */}
          <Route path="travels/:id/request" element={<TravelRequestForm />} /> {/* Ruta para crear solicitud */}
          <Route path="travels/:id" element={<TravelShow />} /> {/* Ruta para mostrar el viaje */}
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
