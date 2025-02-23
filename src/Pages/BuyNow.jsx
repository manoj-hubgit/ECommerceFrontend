// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { clearCart, setCart } from "../Redux/Slice/CartSlice";
// import "./checkout.css"; 

// const BuyNow = () => {
//   const items = useSelector((state) => state.cart.items) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [customerDetails, setCustomerDetails] = useState({
//     name: "",
//     address: "",
//     phone: "",
//   });

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("https://ecommercebackend-r7u5.onrender.com/api/cart/getCart", {
//         headers: { Authorization: token },
//       });

//       if (response.data.cart) {
//         dispatch(setCart(response.data.cart.items));
//       }
//     } catch (error) {
//       console.error("Failed to fetch cart:", error);
//     }
//   };

//   const calculateTotal = () => {
//     if (!items || items.length === 0) return 0;

//     return items.reduce((total, item) => {
//       const product = item.productId;
//       return total + (product.price * item.quantity);
//     }, 0);
//   };

//   const handlePlaceOrder = async () => {
//     const totalAmount = calculateTotal();
//     if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
//       setError("Please fill all the details.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     const orderItems = items.map((item) => ({
//       product: item.productId,
//       quantity: item.quantity,
//     }));

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "https://ecommercebackend-r7u5.onrender.com/api/order/orderRoute",
//         {
//           orderItems,
//           totalPrice: totalAmount,
//           customerDetails,
//           paymentMethod: "Cash on Delivery",
//         },
//         {
//           headers: { Authorization: token },
//         }
//       );

//       if (response.status === 200) {
//         dispatch(clearCart());
//         alert("Order placed successfully!");
//         navigate("/");
//       } else {
//         setError(response.data.error);
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       setError("There was an error placing your order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Buy Now</h1>
//       {items.length === 0 ? (
//         <p className="text-center">Your cart is empty. Please add items before proceeding.</p>
//       ) : (
//         <div>
//           <h2 className="mb-4">Your Items</h2>
//           {items.map((element) => {
//             const product = element.productId;
//             return (
//               <div className="card mb-3" key={product._id}>
//                 <div className="card-body">
//                   <h5 className="card-title">{product.name}</h5>
//                   <p className="card-text">Quantity: {element.quantity}</p>
//                   <p className="card-text">Price: Rs. {product.price}</p>
//                   <p className="card-text font-weight-bold">
//                     Total: Rs. {product.price * element.quantity}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//           <h3 className="mt-4">Total Amount: Rs. {calculateTotal()}</h3>
//           <h2 className="mt-4">Customer Details</h2>
//           <form>
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={customerDetails.name}
//                 onChange={(e) =>
//                   setCustomerDetails({ ...customerDetails, name: e.target.value })
//                 }
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Address</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={customerDetails.address}
//                 onChange={(e) =>
//                   setCustomerDetails({ ...customerDetails, address: e.target.value })
//                 }
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Phone</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={customerDetails.phone}
//                 onChange={(e) =>
//                   setCustomerDetails({ ...customerDetails, phone: e.target.value })
//                 }
//               />
//             </div>
//             {error && <p className="text-danger">{error}</p>}
//             <button type="button" className="btn btn-primary" onClick={handlePlaceOrder} disabled={loading}>
//               {loading ? "Placing Order..." : "Place Order"}
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyNow;


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  if (!product) {
    return <p className="text-center">No product selected. Please go back and choose a product.</p>;
  }

  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
      setError("Please fill all details");
      return;
    }
    setLoading(true);
    setError("");

    const orderData = {
      orderItems: [{ product: product._id, quantity: 1 }],
      totalPrice: product.price,
      customerDetails,
      paymentMethod: "Cash on Delivery",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://ecommercebackend-r7u5.onrender.com/api/order/orderRoute",
        orderData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      if (response.status === 200) {
        alert("Order placed successfully!");
        navigate("/");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error placing order", error);
      setError("Failed to place order. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Confirm Your Purchase</h2>
      <div className="card p-4">
        <h4>{product.name}</h4>
        <img src={product.imageUrl} alt={product.name} className="img-fluid" style={{ maxWidth: "200px" }} />
        <p>Price: ₹{product.price}</p>
        <p>{product.description}</p>
      </div>

      <h4 className="mt-4">Enter Your Details</h4>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={customerDetails.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" name="address" className="form-control" value={customerDetails.address} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" className="form-control" value={customerDetails.phone} onChange={handleChange} />
        </div>
      </form>
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-success" onClick={handlePlaceOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default BuyNow;
