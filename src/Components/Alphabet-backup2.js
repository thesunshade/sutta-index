//https://github.com/mdesjardins/react-a11y-select

import { indexObject } from "../data/index-object.js";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import LetterHeadingsMenu from "./LetterHeadingsMenu.js";

export default function Alphabet() {
  const index = JSON.parse(indexObject);
  const alphabet = Object.keys(index);

  return (
    <div className="alphabet">
      {alphabet.map(letter => {
        return (
          <Popup
            trigger={<span key={letter}>{letter}</span>}
            position={["bottom right", "bottom center", "bottom left"]}
            keepTooltipInside="#sutta-index"
            on={["click", "focus"]}
            arrow={true}
            closeOnDocumentClick
          >
            <div>
              <LetterHeadingsMenu letter={letter} />
            </div>
          </Popup>
        );
      })}
    </div>
  );
}
