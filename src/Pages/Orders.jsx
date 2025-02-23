// // // import axios from "axios";
// // // import React, { useEffect, useState } from "react";

// // // const Orders = () => {
// // //   const [orders, setOrders] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     fetchOrders();
// // //   }, [orders]);

// // //   const fetchOrders = async () => {
// // //     const token=localStorage.getItem("token");
// // //     try {
// // //       const response = await axios.get("https://ecommercebackend-r7u5.onrender.com/api/order/orderDisplay",{
// // //         headers:{
// // //             Authorization:token
// // //         }
// // //       });
// // //       setOrders(response.data.orders);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       setError("Error Fetching orders");
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handlePackOrder = async (orderId) => {
// // //     try {
// // //       const updatedOrder = await axios.put(
// // //         `https://ecommercebackend-r7u5.onrender.com/api/order/packedStatus/${orderId}`
// // //       );
// // //       setOrders((prevOrders) =>
// // //         prevOrders.map((order) =>
// // //           order._id === orderId ? { ...order, packed: updatedOrder.data.packed } : order
// // //         )
// // //       );
// // //     } catch (error) {
// // //       console.error("Error updating packed status:", error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container">
// // //       <h2 className="my-4">Orders</h2>
// // //       {loading ? (
// // //         <p>Loading orders...</p>
// // //       ) : error ? (
// // //         <p>{error}</p>
// // //       ) : orders.length === 0 ? (
// // //         <p>No orders Found</p>
// // //       ) : (
// // //         <div className="order-list">
// // //           {orders.map((order) => (
// // //             <div key={order._id} className="order-item border p-3 mb-3">
// // //               <h4>Order ID: {order._id}</h4>
// // //               <p>
// // //                 <strong>Customer Name:</strong> {order.customerDetails.name}
// // //               </p>
// // //               <p>
// // //                 <strong>Customer Address:</strong> {order.customerDetails.address}
// // //               </p>
// // //               <p>
// // //                 <strong>Phone Number:</strong> {order.customerDetails.phone}
// // //               </p>
// // //               <p>
// // //                 <strong>Payment Method:</strong> {order.paymentMethod}
// // //               </p>
// // //               <p>
// // //                 <strong>Total Price:</strong> ₹{order.totalPrice}
// // //               </p>
// // //               <p>
// // //                 <strong>Packed Status:</strong> {order.packed ? "Packed" : "Not Packed"}
// // //               </p>

// // //               <h5>Order Items:</h5>
// // //               <ul>
// // //                 {order.orderItems.map((item) => (
// // //                   <li key={item._id}>
// // //                     <p>
// // //                       <strong>Product Name:</strong> {item.product.name}
// // //                     </p>
// // //                     <p>
// // //                       <strong>Quantity:</strong> {item.quantity}
// // //                     </p>
// // //                     <p>
// // //                       <strong>Price:</strong> ₹{item.product.price}
// // //                     </p>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //               <p>
// // //                 <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
// // //               </p>
// // //               <button
// // //                 className={`btn ${order.packed ? "btn-success" : "btn-primary"}`}
// // //                 onClick={() => handlePackOrder(order._id)}
// // //                 disabled={order.packed}
// // //               >
// // //                 {order.packed ? "Packed" : "Pack"}
// // //               </button>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Orders;


// // import axios from "axios";
// // import React, { useEffect, useState } from "react";

// // const Orders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []); // Removed orders from dependency to prevent infinite loop

// //   const fetchOrders = async () => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       setError("Unauthorized: No token found");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await axios.get(
// //         "https://ecommercebackend-r7u5.onrender.com/api/order/orderDisplay",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setOrders(response.data.orders);
// //       setLoading(false);
// //     } catch (error) {
// //       setError("Error Fetching orders");
// //       setLoading(false);
// //     }
// //   };

// //   const handlePackOrder = async (orderId) => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       console.error("Unauthorized: No token found");
// //       return;
// //     }

// //     try {
// //       const updatedOrder = await axios.put(
// //         `https://ecommercebackend-r7u5.onrender.com/api/order/packedStatus/${orderId}`,
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setOrders((prevOrders) =>
// //         prevOrders.map((order) =>
// //           order._id === orderId
// //             ? { ...order, packed: updatedOrder.data.packed }
// //             : order
// //         )
// //       );
// //     } catch (error) {
// //       console.error("Error updating packed status:", error);
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h2 className="my-4">Orders</h2>
// //       {loading ? (
// //         <p>Loading orders...</p>
// //       ) : error ? (
// //         <p className="text-danger">{error}</p>
// //       ) : orders.length === 0 ? (
// //         <p>No orders found</p>
// //       ) : (
// //         <div className="order-list">
// //           {orders.map((order) => (
// //             <div key={order._id} className="order-item border p-3 mb-3">
// //               <h4>Order ID: {order._id}</h4>
// //               <p>
// //                 <strong>Customer Name:</strong> {order.customerDetails.name}
// //               </p>
// //               <p>
// //                 <strong>Customer Address:</strong> {order.customerDetails.address}
// //               </p>
// //               <p>
// //                 <strong>Phone Number:</strong> {order.customerDetails.phone}
// //               </p>
// //               <p>
// //                 <strong>Payment Method:</strong> {order.paymentMethod}
// //               </p>
// //               <p>
// //                 <strong>Total Price:</strong> ₹{order.totalPrice}
// //               </p>
// //               <p>
// //                 <strong>Packed Status:</strong> {order.packed ? "Packed" : "Not Packed"}
// //               </p>

// //               <h5>Order Items:</h5>
// //               <ul>
// //                 {order.orderItems.map((item) => (
// //                   <li key={item._id}>
// //                     <p>
// //                       <strong>Product Name:</strong> {item.product.name}
// //                     </p>
// //                     <p>
// //                       <strong>Quantity:</strong> {item.quantity}
// //                     </p>
// //                     <p>
// //                       <strong>Price:</strong> ₹{item.product.price}
// //                     </p>
// //                   </li>
// //                 ))}
// //               </ul>
// //               <p>
// //                 <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
// //               </p>
// //               <button
// //                 className={`btn ${order.packed ? "btn-success" : "btn-primary"}`}
// //                 onClick={() => handlePackOrder(order._id)}
// //                 disabled={order.packed}
// //               >
// //                 {order.packed ? "Packed" : "Pack"}
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Orders;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Redirect if not logged in

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Hook for redirection

//   useEffect(() => {
//     fetchOrders();
//   }, []); // Runs once when component mounts

//   const fetchOrders = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.log("No token found, redirecting to login...");
//       navigate("/login");
//       return;
//     }

//     console.log("Fetching orders with token:", token);

//     try {
//       const response = await axios.get(
//         "https://ecommercebackend-r7u5.onrender.com/api/order/orderDisplay",
//         {
//           headers: { Authorization: token }, // No Bearer added
//         }
//       );
//       console.log("Orders fetched successfully:", response.data);
//       setOrders(response.data.orders);
//     } catch (error) {
//       console.error("Error fetching orders:", error.response?.data || error.message);
//       setError("Error fetching orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePackOrder = async (orderId) => {
//     console.log(`Packing order ID: ${orderId}`);
//     try {
//       const response = await axios.put(
//         `https://ecommercebackend-r7u5.onrender.com/api/order/packedStatus/${orderId}`
//       );
//       console.log(`Order ${orderId} packed successfully:`, response.data);
      
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, packed: response.data.packed } : order
//         )
//       );
//     } catch (error) {
//       console.error("Error updating packed status:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="my-4">Orders</h2>
//       {loading ? (
//         <p>Loading orders...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : orders.length === 0 ? (
//         <p>No orders found</p>
//       ) : (
//         <div className="order-list">
//           {orders.map((order) => (
//             <div key={order._id} className="order-item border p-3 mb-3">
//               <h4>Order ID: {order._id}</h4>
//               <p><strong>Customer Name:</strong> {order.customerDetails.name}</p>
//               <p><strong>Customer Address:</strong> {order.customerDetails.address}</p>
//               <p><strong>Phone Number:</strong> {order.customerDetails.phone}</p>
//               <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
//               <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
//               <p><strong>Packed Status:</strong> {order.packed ? "Packed" : "Not Packed"}</p>

//               <h5>Order Items:</h5>
//               <ul>
//                 {order.orderItems.map((item) => (
//                   <li key={item._id}>
//                     <p><strong>Product Name:</strong> {item.product.name}</p>
//                     <p><strong>Quantity:</strong> {item.quantity}</p>
//                     <p><strong>Price:</strong> ₹{item.product.price}</p>
//                   </li>
//                 ))}
//               </ul>
//               <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
//               <button
//                 className={`btn ${order.packed ? "btn-success" : "btn-primary"}`}
//                 onClick={() => handlePackOrder(order._id)}
//                 disabled={order.packed}
//               >
//                 {order.packed ? "Packed" : "Pack"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [orders]);
  
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        "https://ecommercebackend-r7u5.onrender.com/api/order/orderDisplay",
        { headers: { Authorization: token } }
      );

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
      setError("Error fetching orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePackOrder = async (orderId) => {
    const token = localStorage.getItem("token"); 
    try {
      const response = await axios.put(
        `https://ecommercebackend-r7u5.onrender.com/api/order/packedStatus/${orderId}`,{},{
          headers:{Authorization:token},
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, packed: response.data.packed } : order
        )
      );
    } catch (error) {
      console.error("Error updating packed status:", error.response?.data || error.message);
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
        <p>No orders found</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item border p-3 mb-3">
              <h4>Order ID: {order._id}</h4>
              <p><strong>Customer Name:</strong> {order.customerDetails?.name || "N/A"}</p>
              <p><strong>Customer Address:</strong> {order.customerDetails?.address || "N/A"}</p>
              <p><strong>Phone Number:</strong> {order.customerDetails?.phone || "N/A"}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod || "N/A"}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice || "0"}</p>
              <p><strong>Packed Status:</strong> {order.packed ? "Packed" : "Not Packed"}</p>

              <h5>Order Items:</h5>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item._id}>
                    <p><strong>Product Name:</strong> {item.product?.name || "Unknown"}</p>
                    <p><strong>Quantity:</strong> {item.quantity || "0"}</p>
                    <p><strong>Price:</strong> ₹{item.product?.price || "0"}</p>
                  </li>
                ))}
              </ul>
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
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
