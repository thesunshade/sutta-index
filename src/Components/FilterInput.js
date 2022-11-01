import filterIcon from "./images/filter-icon.png";
import xIcon from "./images/x-icon.png";
import randomSuggestion from "./functions/randomSuggestion";

export default function FilterInput() {
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      // setFilterInput("");
      // setFilterByText("");
      document.getElementById("user-input").focus();
    }
  });

  function updateFilterByText(inputText) {
    // setFilterInput(inputText);
    if (inputText.length > 2) {
      // setFilterByText(inputText);
      // } else if (filterByText) {
      // setFilterByText("");
    }
  }

  return (
    <div className="filter-area">
      <label id="user-input-label" htmlFor="user-input">
        {/* <span className="filter-label">Filter:</span> */}

        <img className="icon filter-icon" width="20px" src={filterIcon} alt="Settings Toggle" title="Filter"></img>

        <input
          className="     input-box"
          id="user-input"
          autoFocus
          type="text"
          // value={filterInput}
          onChange={event => updateFilterByText(event.target.value)}
          placeholder={"e.g. " + randomSuggestion()}
        />
        <button
          className="clear-filter-button"
          onClick={() => {
            document.getElementById("user-input").focus();
          }}
        >
          <img height="10" className="icon x-icon" alt="clear filter" src={xIcon} />
        </button>
      </label>
    </div>
  );
}
