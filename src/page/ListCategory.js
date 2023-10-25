import React, { useCallback, useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Item from "../components/Item";
import MainLayout from "../layout/Main";
import { requests } from "../api/service";

export default function ListCategory() {
  const location = useLocation();
  const [search, setSearch] = useSearchParams();

  const [listItem, setListItem] = useState([]);
  const [categories, setCategories] = useState(null);
  const [priceLow, setPriceLow] = useState("");
  const [priceHeight, setPriceHight] = useState("");
  const [checkPrice, setCheckPrice] = useState(null);

  const fetchCategory = async () => {
    const res = await requests.getCategory();
    if (res.data.message === "ok") {
      setCategories(res.data.data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const getItemCategory = async (name, type, column) => {
    try {
      const filter = name;
      const res = await requests.getItem(
        filter,
        null,
        null,
        null,
        null,
        type,
        column,
        null,
        null
      );
      if (res.data.message === "ok") {
        setListItem(res.data.data);
        search.set("category", name);
        setSearch(search, { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  };
  // get items
  useEffect(() => {
    getItemCategory(
      location.state?.state ? location.state.state : "Tiểu thuyết",
      null,
      null
    );
  }, []);

  const handleListItemCategory = (name) => {
    getItemCategory(name, null, null);
  };

  let params = new URL(document.location).searchParams;
  let name = params.get("category");

  const selectChange = (e, column) => {
    getItemCategory(name, e.target.value, column);
  };

  const handleFilterPrice = async () => {
    if (priceHeight && priceLow) {
      const res = await requests.getItemWithPrice(priceLow, priceHeight, name);
      if (res.data.message === "ok") {
        setListItem(res.data.data);
      }
    } else {
      const listPrice = {
        fromTo1: [0, 100000],
        from1To25: [100000, 250000],
        from25To55: [250000, 550000],
        from55ToHight: [550000, 1000000000000],
      };
      if (checkPrice) {
        const hight = listPrice[checkPrice][1];
        const low = listPrice[checkPrice][0];
        const res = await requests.getItemWithPrice(low, hight, name);
        if (res.data.message === "ok") {
          setListItem(res.data.data);
        }
      }
    }
  };
  useEffect(() => {
    handleFilterPrice();
  }, [checkPrice, priceHeight, priceLow, name]);

  const handleCheck = async (e) => {
    if (e.target.checked) {
      setPriceLow("");
      setPriceHight("");
      setCheckPrice(e.target.value);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-start gap-4 justify-between w-full">
        <div className="w-[20%] divide-y flex flex-col gap-4 bg-white p-4 rounded-md">
          <ul className="flex flex-col gap-2">
            <li className="text-[16px] font-semibold">Danh mục</li>
            {categories &&
              categories.map((c) => {
                return (
                  <li
                    key={c._id}
                    className="pl-2 cursor-pointer text-[15px] hover:opacity-80 child-hove"
                    style={{ color: name === c.name ? "#f84b2f" : "" }}
                    onClick={() => handleListItemCategory(c.name)}
                  >
                    {c.name}
                  </li>
                );
              })}
          </ul>
          <div className="text-[14px] flex flex-col gap-2">
            <h3 className="text-[16px] font-semibold">Giá</h3>
            <div className="flex items-center gap-2 pt-2">
              Từ{" "}
              <input
                type="number"
                placeholder="100.000đ"
                className="py-1 px-2 w-[140px] bg-border-color outline-none"
                value={priceLow}
                onChange={(e) => setPriceLow(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              tới
              <input
                type="number"
                placeholder="5.000.000đ"
                className="py-1 px-2 w-[140px] bg-border-color outline-none"
                value={priceHeight}
                onChange={(e) => setPriceHight(e.target.value)}
              />
              {/* <button
                className="bg-primary-color py-1 px-2 text-white rounded-md text-[12px]"
                onClick={handleFilterPrice}
              >
                Tìm
              </button> */}
            </div>
            <div onClick={(e) => handleCheck(e)}>
              <div className="flex gap-2">
                <input
                  type="radio"
                  // onClick={(e) => handleCheck(e, "from0To1")}
                  name="price"
                  value={"fromTo1"}
                  checked={checkPrice === "fromTo1"}
                />
                <label>0đ - 100.000đ</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  // onClick={(e) => handleCheck(e, "from1To25")}
                  name="price"
                  value={"from1To25"}
                  checked={checkPrice === "from1To25"}
                />
                <label>100.000đ - 250.000đ</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  // onClick={(e) => handleCheck(e, "from25To55")}
                  name="price"
                  value={"from25To55"}
                  checked={checkPrice === "from25To55"}
                />
                <label>250.000đ - 550.000đ</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  // onClick={(e) => handleCheck(e, "from55ToHight")}
                  value="from55ToHight"
                  name="price"
                  checked={checkPrice === "from55ToHight"}
                />
                <label>550.000đ - Trở lên</label>
              </div>
            </div>
          </div>
          <div className="text-[14px] flex flex-col gap-2">
            <h3 className="text-[16px] font-semibold">Ngôn ngữ</h3>
            <div className="flex gap-2">
              <input type="radio" />
              <label>Tiếng Việt</label>
            </div>
            <div className="flex gap-2">
              <input type="radio" />
              <label>Tiếng Anh</label>
            </div>
          </div>
        </div>
        <div className="flex-1 w-[60%] bg-white rounded-md">
          <div className="flex items-start justify-start p-4 gap-4">
            <h4 className="font-semibold">Sắp xếp theo: </h4>
            <div>
              <select
                className="text-[14px] bg-white"
                onChange={(e) => {
                  selectChange(e, "name");
                  setCheckPrice("");
                  setPriceLow("");
                  setPriceHight("");
                }}
              >
                <option value={"asc"}>Danh mục</option>
                <option value={"desc"}>Tên</option>
              </select>
            </div>
            <div>
              <select
                className="text-[14px] bg-white"
                onChange={(e) => {
                  selectChange(e, "pricePay");
                  setCheckPrice("");
                  setPriceLow("");
                  setPriceHight("");
                }}
              >
                <option>Giá</option>
                <option value={"asc"}>Thấp tới cao</option>
                <option value={"desc"}>Cao tới thấp</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-y-5 pb-4 px-2">
            {listItem &&
              listItem.map((i) => {
                return (
                  <Item
                    pic={i.pic}
                    name={i.name}
                    pricePay={i.pricePay}
                    priceOrigin={i.priceInput}
                    percent={i.flashSaleId?.discount_percent}
                    page={i.weight}
                    isBorder={false}
                    id={i._id}
                    key={i._id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
