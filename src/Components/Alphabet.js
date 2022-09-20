//https://github.com/mdesjardins/react-a11y-select

import { indexObject } from "../data/index-object.js";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import LetterHeadingsMenu from "./LetterHeadingsMenu.js";

export default function Alphabet() {
  const index = JSON.parse(indexObject);
  const alphabet = Object.keys(index);

  function toggleMenu(e) {
    const id = e.target.id;
    const subMenus = document.getElementsByClassName("dropdown-list");
    for (let i = 0; i < subMenus.length; i++) {
      subMenus[i].classList.add("hidden-menu");
    }
    const thisMenu = document.getElementById(id + "-menu");
    thisMenu.classList.remove("hidden-menu");
  }

  return (
    <>
      <div className="alphabet">
        {alphabet.map(letter => {
          return (
            <span className={"letter"} id={letter} key={letter} onClick={e => toggleMenu(e)}>
              {letter}
            </span>
          );
        })}
      </div>
      <div className="menu-dropdown-area">
        {alphabet.map(letter => {
          return <LetterHeadingsMenu key={letter + "menu"} letter={letter} />;
        })}
      </div>
    </>
  );
}
