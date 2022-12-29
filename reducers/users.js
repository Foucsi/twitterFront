import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    password: null,
    username: null,
    email: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.password = action.payload.password;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.password = null;
      state.value.username = null;
      state.value.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
