import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul className="nav nav-pills p-1 m-3">
          <li>
            <Link className="btn btn-outline-info ms-1" to={"/"}>
              Home
            </Link>
            <Link className="btn btn-outline-info ms-1" to={"/products"}>
              Products
            </Link>
            <Link className="btn btn-outline-info ms-1" to={"/newProduct"}>
              New Product
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products></Products>}></Route>
        <Route path="productDetails/:id" element={<ProductDetails />}></Route>
        <Route path="newProduct" element={<NewProduct />}></Route>
        <Route path="editProduct/:id" element={<EditProduct />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
