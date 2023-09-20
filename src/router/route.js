import { Routes, Route } from "react-router-dom";

import Form from "../page/Form";
import Home from "../page/Home";
import ForgotPassword from "../page/ForgotPassword";

function RoutePage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Form />} />
        <Route path="/login" element={<Form />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default RoutePage;
