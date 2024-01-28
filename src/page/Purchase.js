import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MainLayout from "../layout/Main";
import Profile from "../components/account/Profile";
import OrderItem from "../components/body/OrderItem";
import { requests } from "../api/service";

export default function Purchase() {
  const [orders, setOrders] = useState([]);
  const [results, setResult] = useState(null);
  const currUser = useSelector((state) => state.auth.userCurr);

  const fetchOrder = async (page) => {
    if (currUser) {
      const value = {
        limit: 5,
        page,
        type: null,
        column: null,
      };
      const res = await requests.getOrder(value);
      if (res.message === "ok") {
        setResult(res.data);
        setOrders((state) => [...state, ...res.data.orders]);
      }
    }
  };
  useEffect(() => {
    fetchOrder(1);
  }, []);

  return (
    <MainLayout>
      <div className="w-full flex gap-8 pb-16 rounded-t-xl">
        <Profile imageUrl={currUser?.picture?.url} accountName={currUser?.accountName ?? currUser.username} />
        <OrderItem orders={orders} results={results} fetchOrder={fetchOrder} />
      </div>
    </MainLayout>
  );
}
