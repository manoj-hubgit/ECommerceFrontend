import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSearch } from "../Redux/Slice/ProductSlice";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { search, category } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const { currentUser } = useSelector((state) => state.user);
  const totalItemsCart =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <p className="brandName">AllBuy</p>
        </Link>
        <button
          className="navbar-toggler d-lg-none" 
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto align-items-center">
    
            <div className="d-flex flex-column flex-lg-row align-items-center w-50">
              <select
                className="form-select me-2 my-2 my-lg-0 custom-category"
                name="category"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">All</option>
                <option value="Pant">Pant</option>
                <option value="Tshirt">T-shirt</option>
                <option value="Shirt">Shirt</option>
                <option value="Shoe">Shoe</option>
              </select>

              <input
                className="form-control me-2 my-2 my-lg-0 custom-search"
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>


            {currentUser?.isAdmin && (
              <Link to="/order" className="nav-item">
                <button className="btn btn-info mx-2 my-2">Orders</button>
              </Link>
            )}
            {currentUser?.isAdmin && (
              <Link to="/addproduct" className="nav-item">
                <button className="btn btn-dark mx-2 my-2">Add</button>
              </Link>
            )}

            <Link to="/cart" className="nav-item">
              <button className="btn btn-primary mx-2 my-2">
                Cart <span className="noOfItemInCart fw-bold">{totalItemsCart}</span>
              </button>
            </Link>

            {token ? (
              <button
                className="btn btn-danger mx-2 my-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-item">
                <button className="btn btn-danger mx-2 my-2">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
