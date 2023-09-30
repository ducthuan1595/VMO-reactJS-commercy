import { createSlice } from "@reduxjs/toolkit";

const voucherSLice = createSlice({
  name: "voucher",
  initialState: {
    vouchers: [],
  },
  reducers: {
    getVoucher: (state, action) => {
      state.vouchers = action.payload;
    },
  },
});

export const { getVoucher } = voucherSLice.actions;
export default voucherSLice.reducer;
