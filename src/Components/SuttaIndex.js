import { indexObject } from "../data/index-object.js";
import Headword from "./Headword";
import { memo } from "react";

function SuttaIndex() {
  let alphabet = Object.keys(indexObject);
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
                return <Headword key={headword + "-headword"} headword={headword} headwordObject={headwordsObject[headword]} />;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default memo(SuttaIndex);
