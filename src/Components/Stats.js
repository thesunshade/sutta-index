import { indexObject } from "../data/index-object";
import { indexArray } from "../data/index-array";
import headIcon from "../images/head-icon.png";
import locatorIcon from "../images/locator-icon.png";
import xrefIcon from "../images/xref-icon.png";

export default function Stats() {
  const alphabetLetters = Object.keys(indexObject);
  let headwords = 0;
  for (let i = 0; i < alphabetLetters.length; i++) {
    headwords += Object.keys(indexObject[alphabetLetters[i]]).length;
  }

  let xrefsCount = 0;
  for (let i = 0; i < alphabetLetters.length; i++) {
    const thisLetterHead = indexObject[alphabetLetters[i]];
    const thisLetterHeadKeys = Object.keys(thisLetterHead);
    for (let x = 0; x < thisLetterHeadKeys.length; x++) {
      if (
        Object.keys(indexObject[alphabetLetters[i]][thisLetterHeadKeys[x]]).length === 1 &&
        indexObject[alphabetLetters[i]][thisLetterHeadKeys[x]][""] &&
        indexObject[alphabetLetters[i]][thisLetterHeadKeys[x]][""].locators.length === 0
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
          {/* <img className="icon stats-icon" width="20px" src={statsIcon} alt="" /> */}
          Stats:
        </div>
        <div className="row-1">
          <div>
            <img className="icon head-icon" width="13px" src={headIcon} alt="" />
            <span className="answer">{(headwords - xrefsCount).toLocaleString("en-US")}</span> Headwords
          </div>
          <div>
            <img className="icon locator-icon" width="16px" src={locatorIcon} alt="" />
            <span className="answer">{(indexArray.length - xrefsCount).toLocaleString("en-US")}</span> Locators
          </div>
          <div>
            <img className="icon head-icon" width="14px" src={xrefIcon} alt="" />
            <span className="answer">{xrefsCount.toLocaleString("en-US")}</span> Xref headwords
          </div>
        </div>
      </div>
    </>
  );
}
