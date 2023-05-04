import { headwordsArray } from "../data/headwords-array.js";
import makeNormalizedId from "../functions/makeNormalizedId.js";
import fuzz from "../functions/fuzz";
import formIcon from "../images/form-icon.png";

export default function SearchResults(props) {
  let { searchText } = props;
  searchText = searchText.replace(/[/\\()\s-’'"]/g, "");

  function hideAllHideable() {
    const allHideableAreas = document.getElementsByClassName("hideable-area");
    for (let i = 0; i < allHideableAreas.length; i++) {
      allHideableAreas[i].classList.add("hidden");
    }
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
                <span
                  key={headword}
                  className="menu-item search-result"
                  tabIndex={index + 2}
                  onKeyPress={e => {
                    e.preventDefault();
                    if (e.key === "Enter") {
                      document.getElementById(makeNormalizedId(e.target.innerText)).scrollIntoView(true);
                      window.history.pushState({ page: 1 }, "foo", "#" + makeNormalizedId(e.target.innerText));
                      hideAllHideable();
                    }
                  }}
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById(makeNormalizedId(headword)).scrollIntoView(true);
                    window.history.pushState({ page: 1 }, "foo", "#" + makeNormalizedId(headword));
                  }}
                >
                  <li>{headword}</li>
                </span>
              );
            }
            return null;
          })}
          {!hasResults ? (
            <span>
              No results. Try <span className="keys">Ctrl + f</span> for a browser search.
              <br />
              Or send us a report so we know what is missing:{" "}
              <a
                href={`https://docs.google.com/forms/d/e/1FAIpQLSfxPp1rQrFuvFvQOY2vq1IoSJGmnOHG0VgWadAA-qeWNMD8qA/viewform?usp=pp_url&entry.1763012355=${searchText}`}
                rel="noreferrer"
                target="_blank"
              >
                <img className="icon locator-icon" width="20px" alt="" src={formIcon} />
                Fill the simple form.
              </a>
            </span>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
}
