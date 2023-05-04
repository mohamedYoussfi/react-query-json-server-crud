import React from "react";

function PagesNav({ totalPages, currentPage, setCurrentPage }) {
  return (
    <ul className="nav nav-pills mt-1">
      {new Array(totalPages).fill(0).map((page, index) => (
        <li key={index}>
          <button
            onClick={() => {
              setCurrentPage(index + 1);
            }}
            className={
              currentPage == index + 1
                ? "btn btn-info ms-1"
                : "btn btn-outline-info ms-1"
            }
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PagesNav;
