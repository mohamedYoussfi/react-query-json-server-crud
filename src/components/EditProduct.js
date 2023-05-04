import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../repository/ProductRepository";
import { useMutation, useQuery } from "react-query";

function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);

  const getProductByIdQuery = useQuery(
    ["product", id],
    () => getProductById(id),
    {
      onSuccess: (response) => {
        setName(response.data.name);
        setPrice(response.data.price);
        setChecked(response.data.checked);
      },
    }
  );

  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: () => {},
  });
  const handleUpdateProduct = (event) => {
    event.preventDefault();
    let product = { id, name, price, checked };
    updateProductMutation.mutate(product, {
      onSuccess: (response) => {
        alert(JSON.stringify(response.data));
      },
    });
  };
  return (
    <div className="row p-3">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleUpdateProduct} method="post">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  id="price"
                  type="text"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.value)}
                  id="checked"
                />
                <label className="form-check-label" htmlFor="checked">
                  Checked
                </label>
              </div>
              <button className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
