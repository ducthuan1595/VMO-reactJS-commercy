import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import voucherSlice from "./voucherSlice";

const rootReducer = {
  auth: userReducer,
  voucher: voucherSlice,
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
