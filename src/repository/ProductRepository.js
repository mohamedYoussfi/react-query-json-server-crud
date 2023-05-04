import axios from "axios";

export const productApi = axios.create({
  baseURL: "http://localhost:9000",
});

export const getProducts = (keyword, page, size) => {
  return productApi.get(
    `/products?name_like=${keyword}&_page=${page}&_limit=${size}`
  );
};
export const getProductById = (id) => {
  return productApi.get("/products/" + id);
};
export const checkProduct = (product) => {
  return productApi.patch(`/products/${product.id}`, {
    checked: product.checked,
  });
};

export const updateProduct = (product) => {
  return productApi.patch(`/products/${product.id}`, product);
};

export const deleteProduct = (product) => {
  return productApi.delete(`/products/${product.id}`);
};

export const addProduct = (product) => {
  return productApi.post(`/products`, product);
};
