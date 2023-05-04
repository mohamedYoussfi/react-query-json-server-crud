import React, { useState } from "react";
import { useMutation } from "react-query";
import { addProduct } from "../repository/ProductRepository";

function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const newProductMutation = useMutation(addProduct, {
    onSuccess: () => {},
  });
  const handleSaveProduct = (event) => {
    event.preventDefault();
    let product = { name, price, checked };
    newProductMutation.mutate(product, {
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
            <form onSubmit={handleSaveProduct} method="post">
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
                  value={checked}
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

export default NewProduct;
