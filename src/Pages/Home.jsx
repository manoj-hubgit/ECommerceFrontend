// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setProducts } from "../Redux/Slice/ProductSlice";
// // import { addToCart } from "../Redux/Slice/CartSlice";
// // import { useNavigate } from "react-router-dom";

// // const Home = () => {
// //   const dispatch = useDispatch();
// //   const { products } = useSelector((state) => state.products);
// //   const { items } = useSelector((state) => state.cart);
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);
// //   const [search, setSearch] = useState("");
// //   const [category, setCategory] = useState("");

// //   const categories = ["Electronics", "Clothing", "Home Appliances"];

// //   useEffect(() => {
// //     fetchdata();
// //   }, [search, category]);

// //   const fetchdata = async () => {
// //     setLoading(true);
// //     await axios
// //       .get("http://localhost:5000/api/products/getProducts", {
// //         params: { search, category },
// //       })
// //       .then((res) => {
// //         dispatch(setProducts(res.data.result));
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setLoading(false);
// //         console.log(err);
// //       });
// //   };

// //   const handleAddToCart = (product) => {
// //     dispatch(addToCart(product));
// //     alert(`${product.name} added to cart!`);
// //   };

// //   const handleBuyNow = async(product) => {
// //     dispatch(addToCart(product));
// //     navigate("/checkout");
// //   };

// //   return (
// //     <div className="container">
// //       <h1 className="my-4">Products</h1>
// //       <input
// //         type="text"
// //         className="form-control mb-3"
// //         placeholder="Search Products..."
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //       />
// //       <div className="mb-3">
// //         <select
// //           className="form-control"
// //           value={category}
// //           onChange={(e) => setCategory(e.target.value)}
// //         >
// //           <option value="">All Categories</option>
// //           {categories.map((cata) => {
// //             return (
// //               <option key={cata} value={cata}>
// //                 {cata}
// //               </option>
// //             );
// //           })}
// //         </select>
// //       </div>
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <div className="row">
// //           {products.map((element, index) => {
// //             return (
// //               <div className="col-md-4 mb-4" key={element._id}>
// //                 <div className="card h-100">
// //                   <img
// //                     className="card-img-top"
// //                     src={element.imageUrl}
// //                     alt={element.name}
// //                   />
// //                   <div className="card-body">
// //                     <h2 className="card-title">{element.name}</h2>
// //                     <p className="card-text">{element.description}</p>
// //                     <p className="card-text">RS.{element.price}</p>
// //                     <button
// //                       className="btn btn-primary"
// //                       onClick={() => handleAddToCart(element)}
// //                     >
// //                       Add to Cart
// //                     </button>
// //                     <button
// //                       className="btn btn-success ml-2"
// //                       onClick={() => handleBuyNow(element)}
// //                     >
// //                       But Now
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Home;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setProducts } from "../Redux/Slice/ProductSlice";
// import { addToCart } from "../Redux/Slice/CartSlice";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.products);
//   const { items } = useSelector((state) => state.cart);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");

//   const categories = ["Electronics", "Clothing", "Home Appliances"];

//   useEffect(() => {
//     fetchdata();
//   }, [search, category]);

//   const fetchdata = async () => {
//     setLoading(true);
//     await axios
//       .get("http://localhost:5000/api/products/getProducts", {
//         params: { search, category },
//       })
//       .then((res) => {
//         dispatch(setProducts(res.data.result));
//         setLoading(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//         console.log(err);
//       });
//   };

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     alert(`${product.name} added to cart!`);
//   };

//   const handleBuyNow = (product) => {
//     dispatch(addToCart(product));
//     navigate("/checkout");
//   };

//   // New function to navigate to the cart page
//   const handleGoToCart = () => {
//     navigate("/cart"); // Replace "/cart" with your actual cart route
//   };

//   return (
//     <div className="container">
//       <h1 className="my-4">Products</h1>
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Search Products..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <div className="mb-3">
//         <select
//           className="form-control"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           {categories.map((cata) => (
//             <option key={cata} value={cata}>
//               {cata}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button
//         className="btn btn-secondary mb-3"
//         onClick={handleGoToCart}
//       >
//         Go to Cart
//       </button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="row">
//           {products.map((element) => (
//             <div className="col-md-4 mb-4" key={element._id}>
//               <div className="card h-100">
//                 <img
//                   className="card-img-top"
//                   src={element.imageUrl}
//                   alt={element.name}
//                 />
//                 <div className="card-body">
//                   <h2 className="card-title">{element.name}</h2>
//                   <p className="card-text">{element.description}</p>
//                   <p className="card-text">RS.{element.price}</p>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleAddToCart(element)}
//                   >
//                     Add to Cart
//                   </button>
//                   <button
//                     className="btn btn-success ml-2"
//                     onClick={() => handleBuyNow(element)}
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/Slice/ProductSlice";
import { addToCart } from "../Redux/Slice/CartSlice";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["Electronics", "Clothing", "Home Appliances"];

  useEffect(() => {
    fetchData();
  }, [search, category]);

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:5000/api/products/getProducts", {
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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
    navigate("/checkout");
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container my-5">
      <h1 className="text-center my-4">Products</h1>
      <div className="d-flex justify-content-between mb-4">
        <div className="w-75">
          <input
            type="text"
            className="form-control"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cata) => (
              <option key={cata} value={cata}>
                {cata}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-secondary mb-3" onClick={handleGoToCart}>
        Go to Cart
      </button>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row">
          {products.map((element) => (
            <div className="col-md-3 mb-4" key={element._id}>
              <div className="card h-100 shadow-sm product-card">
                <img
                  className="card-img-top"
                  src={element.imageUrl}
                  alt={element.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <p className="card-text">{element.description}</p>
                  <p className="card-text font-weight-bold">RS.{element.price}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(element)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleBuyNow(element)}
                    >
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
  );
};

export default Home;
