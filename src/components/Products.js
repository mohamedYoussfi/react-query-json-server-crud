import {
  faCheck,
  faCheckCircle,
  faCircle,
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  checkProduct,
  deleteProduct,
  getProducts,
} from "../repository/ProductRepository";
import SearchForm from "./SearchForm";
import ProductItem from "./ProductItem";
import PagesNav from "./PagesNav";

function Products() {
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [checkAll, setCheckAll] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const productsQuery = useQuery(
    ["products", keyword, currentPage, pageSize],
    () => getProducts(keyword, currentPage, pageSize),
    {
      enabled: true,
      onSuccess: (response) => {
        const totalElements = response.headers["x-total-count"];
        let pages = Math.floor(totalElements / pageSize);
        if (totalElements % pageSize != 0) ++pages;
        setTotalPages(pages);
      },
    }
  );

  const checkProductMutation = useMutation(checkProduct, {
    onSuccess: (_, data) => {
      //queryClient.invalidateQueries("products") //allProductsQuery.refetch(),
      queryClient.setQueriesData("products", (oldQueryData) => {
        console.log(oldQueryData);
        const newData = oldQueryData.data.map((p) => {
          if (p.id == data.id) return { ...p, checked: !p.checked };
          else return p;
        });
        return {
          ...oldQueryData,
          data: newData,
        };
      });
    },
  });
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("products"),
  });

  const handleSearchProducts = (e) => {
    e.preventDefault();
    setKeyword(query);
    productsQuery.refetch();
  };
  const handleCheckAllProducts = (products) => {
    setCheckAll(!checkAll);
    products.forEach((p) => {
      checkProductMutation.mutate({ ...p, checked: checkAll });
    });
  };
  const handleDeleteCheckedProducts = (products) => {
    products.forEach((p) => {
      if (p.checked) deleteProductMutation.mutate(p);
    });
  };

  if (productsQuery.isLoading) {
    return <h1>Loading ...</h1>;
  } else if (productsQuery.isError) {
    return <h1>Error</h1>;
  } else {
    return (
      <div className="p-3">
        <div className="card">
          <div className="card-body">
            <SearchForm
              query={query}
              handleSearchProducts={handleSearchProducts}
              setQuery={setQuery}
            ></SearchForm>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>
                    <button
                      onClick={(e) =>
                        handleCheckAllProducts(productsQuery.data?.data)
                      }
                      className="btn btn-outline-success"
                    >
                      <FontAwesomeIcon
                        icon={checkAll ? faCircle : faCheckCircle}
                      ></FontAwesomeIcon>
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={(e) =>
                        handleDeleteCheckedProducts(productsQuery.data?.data)
                      }
                      className="btn btn-outline-danger"
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsQuery.data?.data?.map((p) => (
                  <ProductItem
                    product={p}
                    checkProductMutation={checkProductMutation}
                    deleteProductMutation={deleteProductMutation}
                    navigate={navigate}
                  ></ProductItem>
                ))}
              </tbody>
            </table>
            <PagesNav
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></PagesNav>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
