import { createSlice } from "@reduxjs/toolkit";
import { requests } from "../api/service";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    listItem: [],
  },
  reducers: {
    getListItemCategory: (state, action) => {
      const fetchItemCategory = async () => {
        try {
          const filter = action.payload;
          const res = await requests.getItem(
            filter,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          );
          if (res.data.message === "ok") {
            state.listItem = res.data.data;
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchItemCategory();
    },
  },
});

export const { getListItemCategory } = categorySlice.actions;
export default categorySlice.reducer;
