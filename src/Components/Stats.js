import { indexObject } from "../data/index-object";
import { indexArray } from "../data/index-array";

export default function Stats() {
  const index = JSON.parse(indexArray);
  const indexObj = JSON.parse(indexObject);

  const alphabetLetters = Object.keys(JSON.parse(indexObject));
  let headwords = 0;
  for (let i = 0; i < alphabetLetters.length; i++) {
    headwords += Object.keys(indexObj[alphabetLetters[i]]).length;
  }

  return (
    <>
      <div className="stats">
        <div className="settings-notice">Stats:</div>
        <div className="row-1">
          <div>
            Number of headwords: <span className="answer">{headwords}</span>
          </div>
          <div>
            Number of locators: <span className="answer">{index.length}</span>
          </div>
        </div>
      </div>
    </>
  );
}
