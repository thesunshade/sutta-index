import sortedKeys from "../functions/sortedKeys";
import LocatorList from "./LocatorList";
import makeNormalizedId from "../functions/makeNormalizedId";
import { memo } from "react";
import iconLink from "../images/link-icon.png";
// import iconCopy from "../images/icon-copy.png";
import iconCopy from "../images/copy-icon2.png";

function Headword(props) {
  const { headword, headwordObject } = props;
  const sortedSubWords = sortedKeys(headwordObject);

  return (
    <div key={headword}>
      <div className="head-word-area" id={makeNormalizedId(headword)}>
        <a onClick={e => {}} className="headword-link" href={"#" + makeNormalizedId(headword)}>
          <span className="head-word">
            <img
              alt="copy icon"
              className="icon copy-icon"
              height="16"
              src={iconCopy}
              title="Copy Heading Text"
              onClick={e => {
                e.preventDefault();
                navigator.clipboard.writeText(headword);
              }}
            />
            <img
              alt="link-icon"
              className="icon link-icon"
              height="18"
              src={iconLink}
              title="Copy Link to Heading"
              onClick={e => {
                e.preventDefault();
                navigator.clipboard.writeText(`index.readingfaithfully.org/#${makeNormalizedId(headword)}`);
              }}
            />
            <span className="keyword">{headword}</span>
          </span>
        </a>
      </div>
      {headwordObject.hasOwnProperty("") ? (
        <div className="sub-word">
          <LocatorList headwordSubCount={sortedSubWords.length} locatorXrefObject={headwordObject[""]} />
        </div>
      ) : (
        ""
      )}
      {sortedSubWords.map(subhead => {
        if (subhead === "") return null;
        return (
          <div className="sub-word" key={subhead}>
            <span className="keyword">{subhead}</span> <LocatorList locatorXrefObject={headwordObject[subhead]} />
          </div>
        );
      })}
    </div>
  );
}

export default memo(Headword);
