import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import ProductReducer from "./Slice/ProductSlice";
import userReducer from "./Slice/UserSlice";
import CartReducer from "./Slice/CartSlice";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer=combineReducers({
    products:ProductReducer,
    user:userReducer,
    cart:CartReducer,
})
const persistConfig={
    key:"root",
    storage,
    version:1
}

const persistedReducer= persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false})
    }
    // reducer:{
    //         products:ProductReducer,
    //         user:userReducer,
    //         cart:CartReducer
    // }
})

// export default store;
export const persistor=persistStore(store)