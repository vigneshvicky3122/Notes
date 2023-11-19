import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Otp from "./Components/Otp";
import ResetPassword from "./Components/ResetPassword";
export const url = import.meta.env.VITE_BACKEND_URL;
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to={"/dashboard"} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="verification/email" element={<ForgotPassword />} />
          <Route path="verification/otp/email/:id" element={<Otp />} />
          <Route path="password/reset/:id" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
