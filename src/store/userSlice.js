import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    userCurr: JSON.parse(localStorage.getItem("book-user")) ?? {},
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("book-user", JSON.stringify(action.payload));
      state.userCurr = action.payload;
      state.isLogin = true;
    },
  },
});

// const {reducer, actions} = userSlice;

export const { login } = userSlice.actions;
export default userSlice.reducer;
