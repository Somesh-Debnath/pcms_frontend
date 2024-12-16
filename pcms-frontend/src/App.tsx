import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import PlansPage from '@/pages/Admin/PlansPage';
import ApproveRegistrationsPage from '@/pages/Admin/ApproveRegistrationsPage';
import ApproveRequestedPlanPage from '@/pages/Admin/ApproveRequestedPlanPage';
import RegistrationForm from '@/pages/RegistrationForm';
import Plans from '@/pages/User/Plans';
//import UnauthorizedPage from '@/pages/UnauthorizedPage';
import LoginPage from '@/pages/LoginPage';
import ProtectedRoute from '@/router/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-plans" element={<ProtectedRoute component={PlansPage} permission="view_plans" />} />
          <Route path="/approve-registrations" element={<ProtectedRoute component={ApproveRegistrationsPage} permission="approve_registrations" />} />
          <Route path="/approve-requested-plan" element={<ProtectedRoute component={ApproveRequestedPlanPage} permission="approve_requested_plan" />} />
          <Route path="/user-plans" element={<ProtectedRoute component={Plans} permission="view_plans" />} />
          {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;