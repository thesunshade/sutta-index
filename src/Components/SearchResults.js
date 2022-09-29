import { headwordsArray } from "../data/headwords-array.js";
import makeNormalizedId from "../functions/makeNormalizedId.js";

export default function SearchResults(props) {
  let { searchText } = props;
  searchText = searchText.replace(/[/\\]/g, "");
  const allHideableAreas = document.getElementsByClassName("hideable-area");
  for (let i = 0; i < allHideableAreas.length; i++) {
    allHideableAreas[i].classList.add("hidden");
  }
  if (searchText.length >= 2) {
    document.getElementById("search-results").classList.remove("hidden");
  }

  return (
    <>
      <div id="search-results" className="search-results dropdown-list hidden hideable-area">
        <ul className="link-list">
          {headwordsArray.map((headword, index) => {
            if (searchText.length < 2) return null;
            const regex = new RegExp(searchText, "gi");
            if (regex.test(headword)) {
              return (
                <a tabIndex={index + 2} key={headword} href={"#" + makeNormalizedId(headword)}>
                  <li>{headword}</li>
                </a>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </>
  );
}
