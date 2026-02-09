import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => action.payload,

    removeUserfeed: (state, action) => {
      return state.filter(user => user._id !== action.payload);
    }
  },
});

export const { addFeed, removeUserfeed } = feedSlice.actions;
export default feedSlice.reducer;
