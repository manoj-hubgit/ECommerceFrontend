import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
    image: "",
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
    try {
      await axios
        .post("https://ecommercebackend-r7u5.onrender.com/api/products/addProduct", productData)
        .then((res) => {
          console.log(res.data.message);
        });
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="from-group">
        <input
          type="text"
          id="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <textarea
          id="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
        />
        <input
          type="number"
          id="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          id="stock"
          value={productData.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
