import { indexObject } from "../data/index-object.js";
import Headword from "./Headword";
// import fuzz from "../functions/fuzz.js";
// import NoResults from "./NoResults.js";
import { memo } from "react";

function SuttaIndex() {
  // const headwordsArray = sortedKeys(index);
  let isEmpty = true;
  let alphabet = Object.keys(indexObject);

  // const alphabetHeadings = document.getElementsByClassName("alphabet-anchor");
  // for (let i = 0; i < alphabetHeadings.length; i++) {
  //   alphabetHeadings[i].classList.remove("hidden");
  // }

  return (
    <>
      <div id="sutta-index" className="sutta-index">
        {alphabet.map(letter => {
          const headwordsObject = indexObject[letter];
          const headwordsArray = Object.keys(headwordsObject);
          return (
            <div key={letter + "-wholeLetter"}>
              <div key={letter + "anchor"} className="alphabet-anchor" id={letter}>
                {letter}
              </div>
              {headwordsArray.map(headword => {
                return (
                  <Headword
                    key={headword + "-headword"}
                    headword={headword}
                    headwordObject={headwordsObject[headword]}
                  />
                );
              })}
            </div>
          );
        })}

        {/* {isEmpty ? <NoResults /> : ""} */}
      </div>
    </>
  );
}

export default memo(SuttaIndex);
