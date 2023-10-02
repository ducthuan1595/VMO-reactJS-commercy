import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Item from "../components/Item";
import MainLayout from "../layout/Main";
import { getListItemCategory } from "../store/categorySlice";

export default function ListCategory() {
  const location = useLocation();
  const { name } = useParams();
  const dispatch = useDispatch();
  const listItem = useSelector((state) => state.category.listItem);

  const handleListItemCategory = (name) => {
    dispatch(getListItemCategory(name));
  };

  console.log(listItem, name);
  return (
    <MainLayout>
      <div className="flex items-start gap-4 justify-between w-full">
        <div className="w-[20%] divide-y flex flex-col gap-4 bg-white p-4 rounded-md">
          <ul className="flex flex-col gap-2">
            <li className="text-[18px] font-semibold">Danh mục</li>
            {listItem &&
              listItem.map((c) => {
                return (
                  <li
                    key={c._id}
                    className="pl-2"
                    style={{ color: name === c.name ? "#f84b2f" : "" }}
                    onClick={handleListItemCategory.bind(null, c.name)}
                  >
                    <span>{c.name}</span>
                  </li>
                );
              })}
          </ul>
          <div className="">
            <h3 className="text-[18px] font-semibold">Giá</h3>
            <div className="flex items-center gap-2 pt-2">
              Từ{" "}
              <input
                type="number"
                placeholder="100.000đ"
                className="py-1 px-2 w-[140px] bg-border-color outline-none"
              />
            </div>
            <div className="flex items-center gap-2 py-2">
              tới
              <input
                type="number"
                placeholder="500.000đ"
                className="py-1 px-2 w-[140px] bg-border-color outline-none"
              />
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>0đ - 100.000đ</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>100.000đ - 250.000đ</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>250.000đ - 550.000đ</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>550.000đ - Trở lên</label>
            </div>
          </div>
          <div className="">
            <h3 className="text-[18px] font-semibold">Ngôn ngữ</h3>
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>Tiếng Việt</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>Tiếng Anh</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>Tiếng Trung</label>
            </div>
          </div>
        </div>
        <div className="flex-1 w-[60%] bg-white rounded-md">
          <div className="flex items-start justify-start p-4 gap-3">
            <h4 className="font-semibold">Sắp xếp theo: </h4>
            <div>
              <label>Danh mục</label>
              <select>
                <option>tiểu thuyết</option>
              </select>
            </div>
            <div>
              <label>Theo giá</label>
              <select>
                <option>100.000đ</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-y-4 pb-4 px-2">
            {location &&
              location.state.listItems.map((i) => {
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
