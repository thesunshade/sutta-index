import { indexObject } from "../data/index-object.js";
import makeNormalizedId from "../functions/makeNormalizedId.js";

export default function LetterHeadingsMenu(props) {
  const index = JSON.parse(indexObject);

  const { letter } = props;

  const headwordsArray = Object.keys(index[letter]);
  return (
    <>
      <ul className="dropdown-list">
        {headwordsArray.map(headword => {
          return (
            <li key={headword}>
              <a href={"#" + makeNormalizedId(headword)}>{headword}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
