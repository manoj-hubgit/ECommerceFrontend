import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProductData({
      ...productData,
      image: base64,
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios
        .post("https://ecommercebackend-r7u5.onrender.com/api/products/addProduct", productData, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data.message);
        });
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            id="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            id="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Price"
            className="form-control"
            required
          />
        </div>
        <div className="col-12">
          <textarea
            id="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            id="stock"
            value={productData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <select
            id="category"
            value={productData.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Category</option>
            <option value="Pant">Pant</option>
            <option value="Tshirt">T-shirt</option>
            <option value="Shirt">Shirt</option>
            <option value="Shoe">Shoe</option>
          </select>
        </div>
        <div className="col-12">
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="form-control"
            required
          />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary w-50">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
