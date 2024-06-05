import { createSlice } from "@reduxjs/toolkit";

export const rootReducer = createSlice({
  name: "root",
  initialState: {
   // loading: true,
    userInfo: {},
  },
  reducers: {
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
    setUserInfo: (state, action) => {
     //console.log(action.payload);
      state.userInfo = action.payload;
    },
  },
});

export const {setUserInfo } = rootReducer.actions;
export default rootReducer.reducer;
