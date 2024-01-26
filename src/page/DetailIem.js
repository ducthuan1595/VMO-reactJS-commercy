import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import MainLayout from "../layout/Main";
import DetailInfor from "../components/detail-item/DetailInfor";
import Promo from "../components/body/Promo";
import InforItem from "../components/detail-item/InforItem";
import RelativeItem from "../components/detail-item/RelativeItem";
import Review from "../components/detail-item/Review";

export default function DetailIem() {
  const location = useLocation();

  const [detailItem, setDetailItem] = useState(null);

  const reviews = useMemo(() => {
    if(location && location.state.reviews) {
      return location.state.reviews;
    }
  }, [location])

  useEffect(() => {
    if (location && location.state.detailItem) {
      setDetailItem(location.state.detailItem);
    }
  }, [location]);
  // console.log(detailItem);

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <DetailInfor detailItem={detailItem} reviews={reviews} />
        <Promo />
        <InforItem detailItem={detailItem} />
        <RelativeItem detailItem={detailItem} />
        <Review itemId={detailItem?._id} />
      </div>
    </MainLayout>
  );
}
