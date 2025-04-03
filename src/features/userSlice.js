import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // user: () => {
  //   try {
  //     const storedUser = localStorage.getItem("user");
  //     return storedUser ? JSON.parse(storedUser) : null;
  //   } catch (error) {
  //     console.error("Failed to parse user data from localStorage:", error);
  //     return null;
  //   }
  // },

  user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { user } = action.payload;
      // set nilai dari state
      state.user = user;

      // set local storage
      localStorage.setItem("user", JSON.stringify(user));
    },
    loginUser: (state, action) => {
      const { user } = action.payload;

      // set nilai dari state
      state.user = user;

      // set local storage
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
