import { headwordsArray } from "../data/headwords-array.js";
import makeNormalizedId from "../functions/makeNormalizedId.js";
import fuzz from "../functions/fuzz";

export default function SearchResults(props) {
  let { searchText } = props;
  searchText = searchText.replace(/[/\\()]/g, "");
  const allHideableAreas = document.getElementsByClassName("hideable-area");
  for (let i = 0; i < allHideableAreas.length; i++) {
    allHideableAreas[i].classList.add("hidden");
  }
  if (searchText.length >= 2) {
    document.getElementById("search-results").classList.remove("hidden");
  }

  let hasResults = false;

  return (
    <>
      <div id="search-results" className="search-results dropdown-list hidden hideable-area">
        <ul className="link-list">
          {headwordsArray.map((headword, index) => {
            if (searchText.length < 2) return null;
            const regex = new RegExp(fuzz(searchText), "gi");
            if (regex.test(fuzz(headword))) {
              hasResults = true;
              return (
                <a
                  className="search-result"
                  tabIndex={index + 2}
                  key={headword}
                  href={"#" + makeNormalizedId(headword)}
                >
                  <li>{headword}</li>
                </a>
              );
            }
            return null;
          })}
          {!hasResults ? (
            <span>
              No results. Try <span className="keys">Ctrl + f</span> for a browser search.
            </span>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
}
