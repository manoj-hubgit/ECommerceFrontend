import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart:(state,action)=>{
        state.items=action.payload;
        state.totalAmount = action.payload.reduce((total, item) => total + item.price * item.quantity, 0); 
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalAmount += item.price;
    },
    removeFromCart: (state, action) => {
    const itemId = action.payload; 
    const itemToRemove = state.items.find(item => item.productId === itemId);
    if (itemToRemove) {
      state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
    }
    state.items = state.items.filter((item) => item.productId !== itemId);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount=0;
    },
    increaseQuantity:(state,action)=>{
        const itemId=action.payload;
        const existingItem=state.items.find((item)=>item.productId===itemId);
        if(existingItem){
            existingItem.quantity += 1;
            state.totalAmount += existingItem.price;
        }
    },
    decreaseQuantity:(state,action)=>{
        const itemId=action.payload;
        const existingItem=state.items.find((item)=>item.productId===itemId);
        if(existingItem && existingItem.quantity>1){
            existingItem.quantity -= 1;
            state.totalAmount -= existingItem.price;
        }
    }
  },
});

export const { setCart, addToCart, removeFromCart, clearCart ,increaseQuantity,decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;
