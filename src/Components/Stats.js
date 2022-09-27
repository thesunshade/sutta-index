import { indexObject } from "../data/index-object";
import { indexArray } from "../data/index-array";
import statsIcon from "../images/stats-icon.png";

export default function Stats() {
  const index = JSON.parse(indexArray);
  const indexObj = JSON.parse(indexObject);

  const alphabetLetters = Object.keys(JSON.parse(indexObject));
  let headwords = 0;
  for (let i = 0; i < alphabetLetters.length; i++) {
    headwords += Object.keys(indexObj[alphabetLetters[i]]).length;
  }

  let xrefsCount = 0;
  for (let i = 0; i < alphabetLetters.length; i++) {
    const thisLetterHead = indexObj[alphabetLetters[i]];
    const thisLetterHeadKeys = Object.keys(thisLetterHead);
    for (let x = 0; x < thisLetterHeadKeys.length; x++) {
      if (
        Object.keys(indexObj[alphabetLetters[i]][thisLetterHeadKeys[x]]).length === 1 &&
        indexObj[alphabetLetters[i]][thisLetterHeadKeys[x]][""] &&
        indexObj[alphabetLetters[i]][thisLetterHeadKeys[x]][""].locators.length === 0
      )
        // console.log(indexObj[alphabetLetters[i]][thisLetterHeadKeys[x]][""].xrefs);
        xrefsCount++;
    }
  }
  // console.log(xrefsCount);
  return (
    <>
      <div className="stats">
        <div className="settings-notice">
          <img className="icon stats-icon" width="20px" src={statsIcon} alt="Settings Toggle" title="Filter"></img>
          Stats:
        </div>
        <div className="row-1">
          <div>
            Number of headwords: <span className="answer">{headwords - xrefsCount}</span>
          </div>
          <div>
            Number of locators: <span className="answer">{index.length}</span>
          </div>
          <div>
            Number of xref headwords: <span className="answer">{xrefsCount}</span>
          </div>
        </div>
      </div>
    </>
  );
}
