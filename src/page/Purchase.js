import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MainLayout from "../layout/Main";
import Profile from "../components/body/Profile";
import OrderItem from "../components/body/OrderItem";
import { requests } from "../api/service";

export default function Purchase() {
  const [orders, setOrders] = useState([]);
  const [results, setResult] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const fetchOrder = async (page) => {
    if (token) {
      const value = {
        limit: 5,
        page,
        type: null,
        column: null,
      };
      const res = await requests.getOrder(value, token);
      if (res.data.message === "ok") {
        setResult(res.data.data);
        setOrders((state) => [...state, ...res.data.data.orders]);
      }
    }
  };
  useEffect(() => {
    fetchOrder(1);
  }, []);

  return (
    <MainLayout>
      <div className="w-full flex gap-8 pb-16 rounded-t-xl">
        <Profile />
        <OrderItem orders={orders} results={results} fetchOrder={fetchOrder} />
      </div>
    </MainLayout>
  );
}
