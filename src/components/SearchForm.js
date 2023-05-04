import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function SearchForm(props) {
  return (
    <form onSubmit={props.handleSearchProducts}>
      <input
        className="p-1 m-1"
        type="text"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
      ></input>
      <button className="btn btn-outline-info">
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </button>
    </form>
  );
}

export default SearchForm;
