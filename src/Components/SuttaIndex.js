import { indexObject } from "../data/index-object.js";
import Headword from "./Headword";
import fuzz from "../functions/fuzz.js";
import NoResults from "./NoResults.js";

export default function SuttaIndex(props) {
  const { filterByText } = props;
  const index = JSON.parse(indexObject);
  // const headwordsArray = sortedKeys(index);
  let isEmpty = true;
  let alphabet = Object.keys(index);

  const alphabetHeadings = document.getElementsByClassName("alphabet-anchor");
  for (let i = 0; i < alphabetHeadings.length; i++) {
    alphabetHeadings[i].classList.remove("hidden");
  }

  return (
    <>
      <div id="sutta-index" className="sutta-index">
        {alphabet.map(letter => {
          const headwordsObject = index[letter];
          const headwordsArray = Object.keys(headwordsObject);
          return (
            <div key={letter + "-wholeLetter"}>
              <div key={letter + "anchor"} className="alphabet-anchor" id={letter}>
                {letter}
              </div>
              {headwordsArray.map(headword => {
                const regex = new RegExp(fuzz(filterByText), "i");
                const headwordDataString = JSON.stringify(headwordsObject[headword]) + headword;
                if (!fuzz(headwordDataString).match(regex)) return null;
                isEmpty = false;
                return (
                  <Headword
                    key={headword + "headword"}
                    headword={headword}
                    headwordObject={headwordsObject[headword]}
                    filterByText={filterByText}
                  />
                );
              })}
            </div>
          );
        })}

        {isEmpty ? <NoResults /> : ""}
      </div>
    </>
  );
}
