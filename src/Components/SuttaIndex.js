import { indexObject } from "../data/index-object.js";
import sortedKeys from "../functions/sortedKeys.js";
import Headword from "./Headword";
import fuzz from "../functions/fuzz.js";
import NoResults from "./NoResults.js";

export default function SuttaIndex(props) {
  const { filterByText } = props;
  const index = JSON.parse(indexObject);
  const headwordsArray = sortedKeys(index);
  let isEmpty = true;
  let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "Y",
    "Z",
  ];
  return (
    <>
      <div className="sutta-index">
        {headwordsArray.map(headword => {
          const regex = new RegExp(fuzz(filterByText), "i");
          const headwordDataString = JSON.stringify(index[headword]) + headword;
          if (!fuzz(headwordDataString).match(regex)) return null;
          isEmpty = false;
          return (
            <>
              {alphabet.includes(headword.charAt(0).toLocaleUpperCase()) ? (
                <div className="alphabet-anchor" id={headword.charAt(0).toLocaleUpperCase()}>
                  {headword.charAt(0).toLocaleUpperCase()}
                </div>
              ) : (
                ""
              )}
              {(() => {
                if (alphabet.includes(headword.charAt(0).toLocaleUpperCase())) {
                  alphabet = alphabet.filter(e => {
                    return e !== headword.charAt(0).toLocaleUpperCase();
                  });
                }
              })()}
              <Headword
                key={headword}
                headword={headword}
                headwordObject={index[headword]}
                filterByText={filterByText}
              />
            </>
          );
        })}
        {isEmpty ? <NoResults /> : ""}
      </div>
    </>
  );
}
