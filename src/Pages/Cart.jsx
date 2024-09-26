import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../Redux/Slice/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFormCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mt-5">
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your Cart is Empty</p>
      ) : (
        <div>
          {items.map((element, index) => {
            return (
              <div className="card mb-3" key={element._id}>
                <div className="card-body">
                  <h2 className="card-title">{element.name}</h2>
                  <p className="card-text">Quantity:{element.quantity}</p>
                  <p className="card-text">Price: Rs.{element.price}</p>
                </div>
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => handleRemoveFormCart(element)}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="mt-4">
            <button className="btn btn-warning" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button
              className="btn btn-success ms-2"
              onClick={() => navigate("/checkout")}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
