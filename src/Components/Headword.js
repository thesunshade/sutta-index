import sortedKeys from "../functions/sortedKeys";
import LocatorList from "./LocatorList";
import makeNormalizedId from "../functions/makeNormalizedId";
import KeyWord from "./KeyWord";

export default function Headword(props) {
  const { headword, headwordObject, filterByText } = props;
  const sortedSubWords = sortedKeys(headwordObject);
  const headwordDataString = JSON.stringify(headwordObject) + headword;
  const regex = new RegExp(filterByText, "i");
  if (!headwordDataString.match(regex)) return null;

  return (
    <div key={headword}>
      <div className="head-word-area" id={makeNormalizedId(headword)}>
        <span className="head-word">
          <KeyWord filterByText={filterByText} stringToHighlight={headword} />
        </span>
        {headwordObject.hasOwnProperty("") ? (
          <LocatorList headwordSubCount={sortedSubWords.length} locatorArray={headwordObject[""]} />
        ) : (
          ""
        )}
      </div>
      {sortedSubWords.map(subhead => {
        if (subhead === "") return null;
        return (
          <div className="sub-word" key={subhead}>
            <KeyWord filterByText={filterByText} stringToHighlight={subhead} />{" "}
            <LocatorList locatorArray={headwordObject[subhead]} />
          </div>
        );
      })}
    </div>
  );
}
