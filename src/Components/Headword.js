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
  const { setLastClickedLink } = useContext(LastClickedLink);

  return (
    <div key={headword}>
      <div className="head-word-area" id={makeNormalizedId(headword)}>
        <a
          onClick={e => {
            // e.preventDefault();
            // e.nativeEvent.stopImmediatePropagation();
            // setLastClickedLink(e.target.textContent);
            // setTimeout(() => {
            //   setLastClickedLink(e.target.textContent);
            // }, "1000");
          }}
          className="headword-link"
          href={"#" + makeNormalizedId(headword)}
        >
          <span className="head-word">
            <img
              alt="link-icon"
              className="icon link-icon"
              height="18"
              src={linkIcon}
              onClick={e => {
                e.preventDefault();
                navigator.clipboard.writeText(`index.readingfaithfully.org/#${makeNormalizedId(headword)}`);
              }}
            />
            <KeyWord filterByText={filterByText} stringToHighlight={headword} />
          </span>
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
