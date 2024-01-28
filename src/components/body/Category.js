import React, { useEffect, useState } from "react";
import { requests } from "../../api/service";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);

  const fetchCategory = async () => {
    const res = await requests.getCategory();
    if (res.message === "ok") {
      setCategories(res.data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);


  return (
    <div className="bg-[white] rounded-sm">
      <div className="p-4">
        <i className="fa-solid fa-table-list text-[24px] text-primary-color"></i>
        <span className="text-[22px] text-center ml-2 font-semibold">
          Danh mục sản phẩm
        </span>
        <div className="border-[1px] border-solid border-border-color mt-4"></div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 items-center justify-center gap-1 py-4">
        {categories &&
          categories.map((c) => {
            return (
              <div
                key={c._id}
                className="cursor-pointer hover:opacity-80"
                onClick={() => {
                  navigate(`/list-item-category?category`, {
                    state: {
                      state: c.name,
                    },
                  });
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src={c.banner.url}
                  alt={c.name}
                  className="h-[140px] block mx-auto"
                />
                <div className="text-center">{c.name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
