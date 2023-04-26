import { indexObject } from "../data/index-object.js";
import makeNormalizedId from "../functions/makeNormalizedId.js";
import { memo } from "react";

function LetterHeadingsMenu(props) {
  const { letter } = props;

  const headwordsArray = Object.keys(indexObject[letter]);

  function hideMenu() {
    const thisMenu = document.getElementById(letter + "-menu");
    thisMenu.classList.add("hidden");
  }

  return (
    <>
      <ul
        id={letter + "-menu"}
        key={letter + "-menu"}
        className="dropdown-list hidden hideable-area link-list"
        onClick={hideMenu}
      >
        {headwordsArray.map(headword => {
          return (
            <span
              key={headword}
              className="menu-item"
              onClick={e => {
                e.preventDefault();
                document.getElementById(makeNormalizedId(headword)).scrollIntoView(true);
                window.history.pushState({ page: 1 }, "foo", "#" + makeNormalizedId(headword));
              }}
            >
              <li>{headword}</li>
            </span>
          );
        })}
      </ul>
    </>
  );
}

export default memo(LetterHeadingsMenu);
