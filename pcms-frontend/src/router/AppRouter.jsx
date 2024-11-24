
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PlansPage from "../pages/PlansPage";
import RegistrationForm from "../components/RegistrationForm";
import ApproveRegistrationsPage from "../pages/ApproveRegistrationsPage";
import ApproveRequestedPlan from "../pages/ApproveRequestedPlan";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
         <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/approve-registrations" element={<ApproveRegistrationsPage />} />
        <Route path="/approve-requested-plan" element={<ApproveRequestedPlan/>}/>
      </Routes>
    </Router>
  );
}
