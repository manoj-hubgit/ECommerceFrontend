import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  search:"",
category:""
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProducts: (state, action) => {
      state.products.push(action.payload);
    },
    setSearch: (state,action)=>{
        state.search=action.payload
    },
    setCategory: (state, action) => {
        state.category = action.payload;
      },
  },
});

export const { setProducts, addProducts, setSearch, setCategory } = productSlice.actions;
export default productSlice.reducer;
