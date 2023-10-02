import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import voucherSlice from "./voucherSlice";
import categorySlice from "./categorySlice";

const rootReducer = {
  auth: userReducer,
  voucher: voucherSlice,
  category: categorySlice,
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
