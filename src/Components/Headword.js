import sortedKeys from "../functions/sortedKeys";
import LocatorList from "./LocatorList";
import makeNormalizedId from "../functions/makeNormalizedId";
import KeyWord from "./KeyWord";
import { ContextFilterSetters, LastClickedLink } from "../App.js";
import { useContext } from "react";

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
          className="headwrd-link"
          href={"#" + makeNormalizedId(headword)}
        >
          <span className="head-word">
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
