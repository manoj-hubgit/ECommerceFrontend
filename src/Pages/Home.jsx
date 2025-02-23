import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/Slice/ProductSlice";
import { addToCart } from "../Redux/Slice/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { IoIosAddCircle } from "react-icons/io";

const Home = () => {
  const dispatch = useDispatch();
  const { products,search,category } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [search, category]);

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get("https://ecommercebackend-r7u5.onrender.com/api/products/getProducts", {
        params: { search, category },
      })
      .then((res) => {
        dispatch(setProducts(res.data.result));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  

  const handleAddToCart =async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    await axios.post("https://ecommercebackend-r7u5.onrender.com/api/cart/addCart",{productId: product._id, quantity: 1 },
      {headers:
        {Authorization:token,
      }
    })
    .then((res)=>{
      alert(`${product.name} added to cart!`);
      dispatch(addToCart(res.data.cart));
       
    })
    .catch((err)=>{
      console.log(err);
      alert("Error adding Cart");
    });
  };

  // const handleBuyNow = (product) => {
  //   dispatch(addToCart(product));
  //   navigate("/checkout");
  // };

  // const handleBuyNow = async (product) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }
  
  //   try {
  //     const res = await axios.post(
  //       "https://ecommercebackend-r7u5.onrender.com/api/cart/addCart",
  //       { productId: product._id, quantity: 1 },
  //       { headers: { Authorization: token } }
  //     );
  
  //     dispatch(addToCart(res.data.cart)); // Sync with Redux store
  //     navigate("/checkout");
  //   } catch (err) {
  //     console.log(err);
  //     alert("Error processing order");
  //   }
  // };
  
  const handleBuyNow = (product) => {
    navigate("/buynow", { state: { product } });
  };
  

  return (
    <div>

    <div className="container my-5">
      <h1 className="text-center my-4">Products</h1>   
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
       <span className="sr-only"></span>
        </div>
       
     </div>
      ) : (
        <div className="row">
          {products.map((element,index) => (
            <div className="col-md-3 mb-4" key={element._id}>
              <div className="card h-100 shadow-sm product-card">
                <img
                  className="card-img-top card-image"
                  src={element.imageUrl}
                  alt={element.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <p className="card-text">{element.description}</p>
                  <p className="card-text font-weight-bold">
                    RS.{element.price}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(element)}
                    >
                      <IoIosAddCircle /> Cart
                    </button>
                    {/* <button
                      className="btn btn-success"
                      onClick={() => handleBuyNow(element)}
                    >
                      Buy Now
                    </button> */}

<button className="btn btn-success" onClick={() => handleBuyNow(element)}>
  Buy Now
</button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div> 
    </div>
  );
};

export default Home;
