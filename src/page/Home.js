import { useState, useEffect } from "react";

import MainLayout from "../layout/Main";

import { requests } from "../api/service";

import Voucher from "../components/body/Voucher";
import FlashSale from "../components/body/FlashSale";
import Category from "../components/body/Category";
import ListItem from "../components/body/ListItem";

const Home = () => {
  const [pageItem, setPageItem] = useState([]);

  const limit = 18;
  const fetchItem = async (page) => {
    const res = await requests.getItem(
      null,
      null,
      null,
      page,
      limit,
      null,
      null,
      null,
      null
    );

    if (res.data.message === "ok") {
      setPageItem(res.data.data);
    }
  };
  useEffect(() => {
    fetchItem(1);
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col gap-5">
        <Voucher />
        <FlashSale />
        <Category />
        <ListItem fetchItem={fetchItem} pageItem={pageItem} limit={limit} />
      </div>
    </MainLayout>
  );
};

export default Home;
