import { createSlice } from "@reduxjs/toolkit";

const voucherSLice = createSlice({
  name: "voucher",
  initialState: {
    vouchers: [],
    codeVoucher: null,
  },
  reducers: {
    getVoucher: (state, action) => {
      state.vouchers = action.payload;
    },
    getCodeVoucher: (state, action) => {
      if (state.vouchers) {
        state.codeVoucher = state.vouchers.filter(
          (v) => v.code === action.payload
        );
      }
    },
  },
});

export const { getVoucher, getCodeVoucher } = voucherSLice.actions;
export default voucherSLice.reducer;
