import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("book-user")) ?? null;
const token = JSON.parse(localStorage.getItem("book-token")) ?? null;

const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: user ? true : false,
    userCurr: user,
    token: token,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("book-user", JSON.stringify(action.payload.data));
      localStorage.setItem("book-token", JSON.stringify(action.payload.token));
      state.userCurr = action.payload.data;
      state.token = action.payload.token;
      state.isLogin = true;
    },
    logout: (state) => {
      localStorage.removeItem("book-user");
      localStorage.removeItem("book-token");
      state.isLogin = false;
      state.userCurr = null;
      state.token = null;
    },
    addCart: (state, action) => {
      localStorage.setItem("book-user", JSON.stringify(action.payload));
      state.userCurr = action.payload;
    },
  },
});

// const {reducer, actions} = userSlice;

export const { login, logout, addCart } = userSlice.actions;
export default userSlice.reducer;
