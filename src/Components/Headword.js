import sortedKeys from "../functions/sortedKeys";
import LocatorList from "./LocatorList";
import makeNormalizedId from "../functions/makeNormalizedId";
import KeyWord from "./KeyWord";
import { LastClickedLink } from "../App.js";
import { useContext } from "react";
import linkIcon from "../images/link-icon.png";

export default function Headword(props) {
  const { headword, headwordObject, filterByText } = props;
  const sortedSubWords = sortedKeys(headwordObject);
  const [lastClickedLink, setLastClickedLink] = useContext(LastClickedLink);

  return (
    <div key={headword}>
      <div className="head-word-area" id={makeNormalizedId(headword)}>
        <a
          onClick={e => {
            setTimeout(() => {
              setLastClickedLink(e.target.textContent);
            }, "500");
          }}
          className="headword-link"
          href={"#" + makeNormalizedId(headword)}
        >
          <span className="head-word">
            <KeyWord filterByText={filterByText} stringToHighlight={headword} />
          </span>
          <img alt="link-icon" className="icon link-icon" height="18" src={linkIcon} />
        </a>
        {headwordObject.hasOwnProperty("") ? (
          <LocatorList headwordSubCount={sortedSubWords.length} locatorXrefObject={headwordObject[""]} />
        ) : (
          ""
        )}
      </div>
      {sortedSubWords.map(subhead => {
        if (subhead === "") return null;
        return (
          <div className="sub-word" key={subhead}>
            <KeyWord filterByText={filterByText} stringToHighlight={subhead} />{" "}
            <LocatorList locatorXrefObject={headwordObject[subhead]} />
          </div>
        );
      })}
    </div>
  );
}
