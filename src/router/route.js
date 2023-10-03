import { Routes, Route } from "react-router-dom";

import Form from "../page/Form";
import Home from "../page/Home";
import ForgotPassword from "../page/ForgotPassword";
import DetailIem from "../page/DetailIem";
import Order from "../page/Order";
import Payment from "../page/Payment";
import ListCategory from "../page/ListCategory";
import Purchase from "../page/Purchase";
import Account from "../page/Account";

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
        <Route path="/list-item-category" element={<ListCategory />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default RoutePage;
