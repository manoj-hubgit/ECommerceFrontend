// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { clearCart } from "../Redux/Slice/CartSlice";

// const Checkout = () => {
//   const items = useSelector((state) => state.cart.items);
//   const token = localStorage.getItem("token");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [customerDetails, setCustomerDetails] = useState({
//     name: "",
//     address: "",
//     phone: "",
//   });

//   const calculateTotal = () => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const handlePlaceOrder = async () => {
//     if (items.length === 0) return;
//     if (
//       !customerDetails.name ||
//       !customerDetails.address ||
//       !customerDetails.phone
//     ) {
//       setError("Please fill all the details");
//       return;
//     }
//     setLoading(true);
//     setError("");

//     const orderItems = items.map((item) => ({
//       product: item._id,
//       name: item.name, // Include the name here
//       quantity: item.quantity,
//       price: item.price,
//     }));

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/order/orderRoute",
//         {
//           orderItems,
//           totalPrice: calculateTotal(),
//           customerDetails,
//           paymentMethod: "Cash on Delivery",
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (response.status === 200) {
//         dispatch(clearCart());
//         alert("Order placed successfully");
//         navigate("/");
//       } else {
//         setError(response.data.error);
//       }
//     } catch (error) {
//       console.log(error);
//       setError("There was an error placing your order. Please try again.");
//     } finally {
//       setLoading(false); // Ensure loading is reset
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>Checkout</h1>
//       {items.length === 0 ? (
//         <p>Your cart is empty. Please add items before Checkout.</p>
//       ) : (
//         <div>
//           <h2>Your Items</h2>
//           {items.map((element) => (
//             <div className="card mb-3" key={element._id}>
//               <div className="card-body">
//                 <h2 className="card-title">{element.name}</h2>
//                 <p className="card-text">Quantity: {element.quantity}</p>
//                 <p className="card-text">Price: {element.price}</p>
//                 <p className="card-text">
//                   Total: {element.price * element.quantity}
//                 </p>
//               </div>
//             </div>
//           ))}
//           <h3 className="mt-4">Total Amount: Rs. {calculateTotal()}</h3>
//           <h2>Customer Details</h2>
//           <form>
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={customerDetails.name}
//                 onChange={(e) =>
//                   setCustomerDetails({
//                     ...customerDetails,
//                     name: e.target.value,
//                   })
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
//                   setCustomerDetails({
//                     ...customerDetails,
//                     address: e.target.value,
//                   })
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
//                   setCustomerDetails({
//                     ...customerDetails,
//                     phone: e.target.value,
//                   })
//                 }
//               />
//             </div>
//           </form>
//           {error && <p className="text-danger">{error}</p>}
//           <button
//             className="btn btn-success mt-4"
//             onClick={handlePlaceOrder}
//             disabled={loading}
//           >
//             {loading ? "Placing Order..." : "Place Order"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;


import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Redux/Slice/CartSlice";
import "./checkout.css"; // External CSS for additional styling

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);
  const token = localStorage.getItem("token");
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
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
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
      product: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/order/orderRoute",
        {
          orderItems,
          totalPrice: calculateTotal(),
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
          {items.map((element) => (
            <div className="card mb-3" key={element._id}>
              <div className="card-body">
                <h5 className="card-title">{element.name}</h5>
                <p className="card-text">Quantity: {element.quantity}</p>
                <p className="card-text">Price: Rs. {element.price}</p>
                <p className="card-text font-weight-bold">
                  Total: Rs. {element.price * element.quantity}
                </p>
              </div>
            </div>
          ))}
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
