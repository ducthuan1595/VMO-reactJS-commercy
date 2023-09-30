import { Routes, Route } from "react-router-dom";

import Form from "../page/Form";
import Home from "../page/Home";
import ForgotPassword from "../page/ForgotPassword";
import DetailIem from "../page/DetailIem";

function RoutePage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Form />} />
        <Route path="/login" element={<Form />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/detail-item/:itemId" element={<DetailIem />} />
      </Routes>
    </div>
  );
}

export default RoutePage;
