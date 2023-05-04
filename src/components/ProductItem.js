import {
  faCheckCircle,
  faCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ProductItem({
  product,
  checkProductMutation,
  deleteProductMutation,
  navigate,
}) {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <button
          onClick={() =>
            checkProductMutation.mutate({
              ...product,
              checked: !product.checked,
            })
          }
          className="btn btn-outline-success"
        >
          <FontAwesomeIcon
            icon={product.checked ? faCheckCircle : faCircle}
          ></FontAwesomeIcon>
        </button>
      </td>
      <td>
        <button
          onClick={() => deleteProductMutation.mutate(product)}
          className="btn btn-outline-danger"
        >
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </button>
      </td>
      <td>
        <button
          onClick={() => navigate(`/editProduct/${product.id}`)}
          className="btn btn-outline-danger"
        >
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
