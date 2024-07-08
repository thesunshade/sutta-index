import searchIcon from "../images/search-icon.png";
import xIcon from "../images/x-icon.png";
import randomSuggestion from "../functions/randomSuggestion";
import makeNormalizedId from "../functions/makeNormalizedId.js";

export default function HeadwordsSearchTool(props) {
  let { searchText, setSearchText } = props;

  window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      document.getElementById("search-input").focus();
    }
  });

  //allows enter press to go to first result
  function handleKeyPress(event) {
    const firstHeadLink = document.querySelector(".search-result");
    if (event.key === "Enter" && firstHeadLink) {
      document.getElementById(makeNormalizedId(firstHeadLink.innerText)).scrollIntoView(true);
      window.history.pushState({ page: 1 }, "foo", "#" + makeNormalizedId(firstHeadLink.innerText));
      const allHideableAreas = document.getElementsByClassName("hideable-area");
      for (let i = 0; i < allHideableAreas.length; i++) {
        allHideableAreas[i].classList.add("hidden");
      }
    }
  }

  return (
    <>
      <div className="search-area">
        <img className="icon search-icon" width="24px" src={searchIcon} alt="Settings Toggle" title="Search Headwords"></img>
        <label id="user-input-label" htmlFor="user-input">
          <input
            className="input-box"
            id="search-input"
            autoFocus
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder={"e.g. " + randomSuggestion()}
            tabIndex="1"
            onFocus={e => {
              e.target.select();
              const subMenus = document.getElementsByClassName("hideable-area");
              for (let i = 0; i < subMenus.length; i++) {
                subMenus[i].classList.add("hidden");
              }
              if (searchText.length >= 2) {
                document.getElementById("search-results").classList.remove("hidden");
              }
            }}
            onKeyPress={handleKeyPress}
          />
          <button
            className="clear-search-button"
            onClick={() => {
              setSearchText("");
              document.getElementById("search-input").focus();
            }}>
            <img height="10" className="icon x-icon" alt="clear filter" src={xIcon} />
          </button>
        </label>
      </div>
    </>
  );
}
