import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    password: null,
    username: null,
    email: null,
    tweet: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.password = action.payload.password;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.tweet.push(action.payload.tweet);
    },
    logout: (state) => {
      state.value.tweet = [];
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
