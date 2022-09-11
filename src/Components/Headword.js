import sortedKeys from "../functions/sortedKeys";
import LocatorList from "./LocatorList";
import makeNormalizedId from "../functions/makeNormalizedId";
import KeyWord from "./KeyWord";
import fuzz from "../functions/fuzz";

export default function Headword(props) {
  const { headword, headwordObject, filterByText } = props;
  const sortedSubWords = sortedKeys(headwordObject);

  return (
    <div key={headword}>
      <div className="head-word-area" id={makeNormalizedId(headword)}>
        <span className="head-word">
          <KeyWord filterByText={filterByText} stringToHighlight={headword} />
        </span>
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
