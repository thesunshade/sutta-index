import sortedKeys from "../functions/sortedKeys";
import LocatorList from "./LocatorList";
import makeNormalizedId from "../functions/makeNormalizedId";

export default function Headword(props) {
  const { headword, headwordObject, destination } = props;
  const sortedSubWords = sortedKeys(headwordObject);

  return (
    <div key={headword}>
      <div className="head-word-area" id={makeNormalizedId(headword)}>
        <span className="head-word">{headword}</span>{" "}
        {headwordObject.hasOwnProperty("") ? (
          <LocatorList
            headwordSubCount={sortedSubWords.length}
            locatorArray={headwordObject[""]}
            destination={destination}
          />
        ) : (
          ""
        )}
      </div>
      {sortedSubWords.map(subhead => {
        if (subhead === "") return null;
        return (
          <div className="sub-word" key={subhead}>
            {subhead} <LocatorList locatorArray={headwordObject[subhead]} destination={destination} />
          </div>
        );
      })}
    </div>
  );
}
