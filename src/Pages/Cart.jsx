import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart, setCart } from "../Redux/Slice/CartSlice";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import axios from "axios";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const Cart = () => {
  const items = useSelector((state) => state.cart.items) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
useEffect(()=>{
  fetchData();
},[])
useEffect(() => {
  fetchData();
}, [items]);


  const fetchData=async ()=>{
    try {
      const token= localStorage.getItem("token")
      const response=await axios.get("https://ecommercebackend-r7u5.onrender.com/api/cart/getCart",
        {
          headers: { Authorization: token }, 
    });
      if(response.data.cart){
        dispatch(setCart(response.data.cart.items));
      }
    } catch (error) {
      console.log("Failed to fetch cart:",error);
    }
  }


  const handleRemoveFromCart =async (item) => {
    try {
      console.log("Item to remove:", item);
      const token= localStorage.getItem("token")
      const productId=item._id;
      console.log("the product Id id: ", productId)
     await axios.delete(`https://ecommercebackend-r7u5.onrender.com/api/cart/deleteCart/${productId}`,{
      headers: { Authorization: token }
    })
    
      dispatch(removeFromCart(productId));
    } catch (error) {
      console.error("Failed to remove from cart");
    }
  };

  const handleClearCart = async() => {
    try {
      const token= localStorage.getItem("token")
      await axios.delete("https://ecommercebackend-r7u5.onrender.com/api/cart/clearCart",{
        headers: { Authorization: token }
      });
      dispatch(clearCart());
    } catch (error) {
      console.error("Failed to clear cart:");
    }
  };

  const handleIncreaseQuantity=async (productId,currentQuantity)=>{
   
    try {
      const token = localStorage.getItem("token");
      const newQuantity=currentQuantity+1;
      await axios.put("https://ecommercebackend-r7u5.onrender.com/api/cart/updateQuantity",{
        productId,
        quantity:newQuantity,
      },{
        headers:{Authorization:token}
      });
       dispatch(increaseQuantity(productId));
    } catch (error) {
      console.error("Failed to increase quantity");
    }
  }
  const handleDecreaseQuantity=async (productId,currentQuantity)=>{
if(currentQuantity>1){
  try {
    const token = localStorage.getItem("token");
    const newQuantity=currentQuantity -1;
    await axios.put("https://ecommercebackend-r7u5.onrender.com/api/cart/updateQuantity",{
      productId,
      quantity:newQuantity,
    },{
      headers:{Authorization:token}
    });
    dispatch(decreaseQuantity(productId));
  } catch (error) {
    console.error("Failed to decrease quantity");
  }
}
    dispatch(decreaseQuantity(productId));
  }

  const handleBuyNow = async () => {
    await fetchData(); // Ensure cart is updated
    navigate("/checkout");
  };
  

  return (
    <div className="container mt-5">
      <h1 className="text-center">Your Cart</h1>
      {items.length === 0 ? (
        <h4 className="text-center mt-5">Your Cart is Empty...😢</h4>
      ) : (
        <div>
          {items.map((element,index) => {
            const product=element.productId;
            if (!product) return null;
            const totalPrice=product.price*element.quantity;
            return (
              <div className="card mb-3" key={`${product._id}`}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={product.imageUrl}
                      className="img-fluid rounded-start cart-image"
                      alt={product.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body pb-0">
                      <h2 className="card-title">{product.name}</h2>
                      <h4>{product.description}</h4>
                      <p className="card-text">Quantity: {element.quantity}</p>
                       <button className="btn btn-outline-secondary"
                       onClick={()=>handleDecreaseQuantity(product._id,element.quantity)}
                       >
                        <IoMdRemove/>
                      </button>
                      <button className="btn btn-outline-secondary"
                       onClick={()=>handleIncreaseQuantity(product._id,element.quantity)}
                       >
                        <IoMdAdd/>
                      </button>
                     
                      <p className="card-text">Price: Rs.{totalPrice}</p>
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => handleRemoveFromCart(product,element.quantity)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="mt-4">
            <button className="btn btn-warning" onClick={handleClearCart}>
              Clear Cart
            </button>
            {/* <button
              className="btn btn-success ms-2"
              onClick={() => navigate("/checkout")}
            >
              Buy Now
            </button> */}
            <button className="btn btn-success ms-2" onClick={handleBuyNow}>
  Buy Now
</button>

          </div>
        </div>
      )
      }
    </div>
  );
};

export default Cart;
