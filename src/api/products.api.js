import axios from "axios";

export const fetchProducts = () =>
  axios.get("https://fakestoreapi.com/products");

export const createProduct = (data) =>
  axios.post("https://fakestoreapi.com/products", data);

export const updateProduct = (id, data) =>
  axios.put(`https://fakestoreapi.com/products/${id}`, data);

export const deleteProduct = (id) =>
  axios.delete(`https://fakestoreapi.com/products/${id}`);
