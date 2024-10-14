import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSearch } from "../Redux/Slice/ProductSlice";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { search, category } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const {currentUser}=useSelector((state)=>state.user);
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
    <div>
      <div className="d-flex justify-content-between m-4">
        <div>
          <Link className="brandName" to="/">
            <p className="brandName">AllBuy</p>
          </Link>
        </div>

        <div className="d-flex w-50">
          <select
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
            className="input-group"
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div>
            {currentUser?.isAdmin && (
            <Link to="/order">
              <button className="btn mx-2 btn-info">Orders</button>
            </Link>
          )}
          {currentUser?.isAdmin && (
            <Link to="/addproduct">
              <button className="btn btn-dark">Add</button>
            </Link>
          )}
          {/* <Link to="/order">
            <button className="btn btn-info mx-2">Orders</button>
          </Link>
          <Link to="/addproduct">
            <button className="btn btn-dark">Add</button>
          </Link> */}
          <Link to="/cart">
            <button className="btn btn-primary mx-2">
              Cart{" "}
              <span className="noOfItemInCart fw-bold">{totalItemsCart}</span>
            </button>
          </Link>

          {token ? (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
