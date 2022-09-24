import { indexObject } from "../data/index-object.js";
import makeNormalizedId from "../functions/makeNormalizedId.js";
import { LastClickedLink } from "../App.js";
import { useContext } from "react";

export default function LetterHeadingsMenu(props) {
  const index = JSON.parse(indexObject);
  const { setLastClickedLink } = useContext(LastClickedLink);
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
        className="dropdown-list hidden hideable-area link-list"
        onClick={hideMenu}
      >
        {headwordsArray.map(headword => {
          return (
            <a
              key={headword}
              href={"#" + makeNormalizedId(headword)}
              onClick={e => {
                setTimeout(() => {
                  setLastClickedLink(e.target.textContent);
                }, "1000");
              }}
            >
              <li>{headword}</li>
            </a>
          );
        })}
      </ul>
    </>
  );
}
