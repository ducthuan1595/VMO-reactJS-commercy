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
        if (action.payload) {
          state.codeVoucher = state.vouchers.filter(
            (v) => v.code === action.payload
          );
        } else {
          state.codeVoucher = null;
        }
      }
    },
  },
});

export const { getVoucher, getCodeVoucher } = voucherSLice.actions;
export default voucherSLice.reducer;
