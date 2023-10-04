import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MainLayout from "../layout/Main";
import Profile from "../components/body/Profile";
import OrderItem from "../components/body/OrderItem";
import { requests } from "../api/service";

export default function Purchase() {
  const [order, setOrder] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchOrder = async () => {
      if (token) {
        const value = {
          limit: 10,
          page: 1,
          type: null,
          column: null,
        };
        const res = await requests.getOrder(value, token);
        console.log(res.data);
        if (res.data.message === "ok") {
          setOrder(res.data.data);
        }
      }
    };
    fetchOrder();
  }, []);

  console.log({ order });
  return (
    <MainLayout>
      <div className="w-full flex gap-8 pb-16 rounded-t-xl">
        <Profile />
        <OrderItem order={order} />
      </div>
    </MainLayout>
  );
}
