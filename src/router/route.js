import { Routes, Route } from "react-router-dom";

import Form from "../page/Form";
import Home from "../page/Home";
import ForgotPassword from "../page/ForgotPassword";
import DetailIem from "../page/DetailIem";
import Order from "../page/Order";
import Payment from "../page/Payment";

function RoutePage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Form />} />
        <Route path="/login" element={<Form />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/detail-item/:itemId" element={<DetailIem />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default RoutePage;
