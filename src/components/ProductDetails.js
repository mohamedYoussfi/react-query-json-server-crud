import React from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  return <div>ProductDetails ID={id}</div>;
}

export default ProductDetails;
