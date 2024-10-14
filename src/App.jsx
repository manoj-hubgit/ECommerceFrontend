import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";
import Cart from "./Pages/Cart";
import Register from "./Pages/Register";
import Checkout from "./Pages/Checkout";
import PrivateRoute from "./Pages/PrivateRoute";
import Header from "./Components/Header";
import AdminRoute from "./Pages/AdminRoute";
import Orders from "./Pages/Orders";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route element={<AdminRoute />}>
          <Route path="/order" element={<Orders />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
