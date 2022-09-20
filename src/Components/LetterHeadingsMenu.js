import { indexObject } from "../data/index-object.js";
import makeNormalizedId from "../functions/makeNormalizedId.js";

export default function LetterHeadingsMenu(props) {
  const index = JSON.parse(indexObject);

  const { letter } = props;

  const headwordsArray = Object.keys(index[letter]);

  function hideMenu() {
    const thisMenu = document.getElementById(letter + "-menu");
    thisMenu.classList.add("hidden");
  }

  return (
    <>
      <ul
        id={letter + "-menu"}
        key={letter + "-menu"}
        className="dropdown-list hidden hideable-area"
        onClick={hideMenu}
      >
        {headwordsArray.map(headword => {
          return (
            <a key={headword} href={"#" + makeNormalizedId(headword)}>
              <li>{headword}</li>
            </a>
          );
        })}
      </ul>
    </>
  );
}
