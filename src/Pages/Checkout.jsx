import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Redux/Slice/CartSlice";
import "./checkout.css"; 

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const calculateTotal = () => {
    if(!items || items.length===0) return 0;

    return items.reduce((total, item) =>{
      const product = item.productId;
      return total+(product.price * item.quantity)
    },0
  );
  };

  const handlePlaceOrder = async () => {
    const totalAmount=calculateTotal();
    if (
      !customerDetails.name ||
      !customerDetails.address ||
      !customerDetails.phone
    ) {
      setError("Please fill all the details");
      return;
    }
    setLoading(true);
    setError("");

    const orderItems = items.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));

    try {
      const token=localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:5000/api/order/orderRoute",
        {
          orderItems,
          totalPrice: totalAmount,
          customerDetails,
          paymentMethod: "Cash on Delivery",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        dispatch(clearCart());
        alert("Order placed successfully");
        navigate("/");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
      setError("There was an error placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Checkout</h1>
      {items.length === 0 ? (
        <p className="text-center">Your cart is empty. Please add items before Checkout.</p>
      ) : (
        <div>
          <h2 className="mb-4">Your Items</h2>
          {items.map((element) => {
            const product =element.productId;
            return(
            <div className="card mb-3" key={product._id}>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Quantity: {element.quantity}</p>
                <p className="card-text">Price: Rs. {product.price}</p>
                <p className="card-text font-weight-bold">
                  Total: Rs. {product.price * element.quantity}
                </p>
              </div>
            </div>
            )
          })}
          <h3 className="mt-4">Total Amount: Rs. {calculateTotal()}</h3>
          <h2 className="mt-4">Customer Details</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={customerDetails.name}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={customerDetails.address}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={customerDetails.phone}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    phone: e.target.value,
                  })
                }
              />
            </div>
          </form>
          {error && <p className="text-danger">{error}</p>}
          <button
            className="btn btn-primary mt-4"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
