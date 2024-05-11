import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("tim_gi_the_book_user")) ?? null;

const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: user ? true : false,
    userCurr: user,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("tim_gi_the_book_user", JSON.stringify(action.payload.data));
      localStorage.setItem("tim_gi_the_book_token", JSON.stringify(action.payload.token));
      state.userCurr = action.payload.data;
      state.token = action.payload.token;
      state.isLogin = true;
    },
    logout: (state) => {
      localStorage.removeItem("tim_gi_the_book_user");
      localStorage.removeItem("tim_gi_the_book_token");
      state.isLogin = false;
      state.userCurr = null;
      state.token = null;
    },
    addCart: (state, action) => {
      localStorage.setItem("tim_gi_the_book_user", JSON.stringify(action.payload));
      state.userCurr = action.payload;
    },
  },
});

// const {reducer, actions} = userSlice;

export const { login, logout, addCart } = userSlice.actions;
export default userSlice.reducer;
