import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [orders]);

  const fetchOrders = async () => {
    const token=localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/order/orderDisplay",{
        headers:{
            Authorization:token
        }
      });
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      setError("Error Fetching orders");
      setLoading(false);
    }
  };

  const handlePackOrder = async (orderId) => {
    try {
      const updatedOrder = await axios.put(
        `http://localhost:5000/api/order/packedStatus/${orderId}`
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, packed: updatedOrder.data.packed } : order
        )
      );
    } catch (error) {
      console.error("Error updating packed status:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders Found</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item border p-3 mb-3">
              <h4>Order ID: {order._id}</h4>
              <p>
                <strong>Customer Name:</strong> {order.customerDetails.name}
              </p>
              <p>
                <strong>Customer Address:</strong> {order.customerDetails.address}
              </p>
              <p>
                <strong>Phone Number:</strong> {order.customerDetails.phone}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Total Price:</strong> ₹{order.totalPrice}
              </p>
              <p>
                <strong>Packed Status:</strong> {order.packed ? "Packed" : "Not Packed"}
              </p>

              <h5>Order Items:</h5>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item._id}>
                    <p>
                      <strong>Product Name:</strong> {item.product.name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{item.product.price}
                    </p>
                  </li>
                ))}
              </ul>
              <p>
                <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
              <button
                className={`btn ${order.packed ? "btn-success" : "btn-primary"}`}
                onClick={() => handlePackOrder(order._id)}
                disabled={order.packed}
              >
                {order.packed ? "Packed" : "Pack"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
