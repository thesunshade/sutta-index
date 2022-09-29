// import { headwordsArray } from "../data/headwords-array.js";
import searchIcon from "../images/search-icon.png";
import xIcon from "../images/x-icon.png";
// import { useState } from "react";
// import makeNormalizedId from "../functions/makeNormalizedId.js";

export default function HeadwordsSearchTool(props) {
  let { searchText, setSearchText } = props;

  window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      document.getElementById("search-input").focus();
    }
  });

  return (
    <>
      <div className="filter-area">
        <label id="user-input-label" htmlFor="user-input">
          <img
            className="icon search-icon"
            width="24px"
            src={searchIcon}
            alt="Settings Toggle"
            title="Search Headwords"
          ></img>

          <input
            className="input-box"
            id="search-input"
            autoFocus
            type="text"
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
            placeholder={"e.g. Dhamma "}
          />
          <button
            className="clear-filter-button"
            onClick={() => {
              setSearchText("");
              document.getElementById("search-input").focus();
            }}
          >
            <img height="10" className="icon x-icon" alt="clear filter" src={xIcon} />
          </button>
        </label>
      </div>
    </>
  );
}
