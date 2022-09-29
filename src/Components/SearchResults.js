import { headwordsArray } from "../data/headwords-array.js";
import makeNormalizedId from "../functions/makeNormalizedId.js";

export default function SearchResults(props) {
  let { searchText, setSearchText } = props;
  if (searchText.length >= 3) {
    document.getElementById("search-results").classList.remove("hidden");
  }
  return (
    <>
      <div id="search-results" className="search-results dropdown-list hidden">
        <ul className="link-list">
          {headwordsArray.map((headword, index) => {
            if (searchText.length < 3) return null;
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
