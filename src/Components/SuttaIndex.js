import { indexObject } from "../data/index-object.js";
import sortedKeys from "../functions/sortedKeys";
import Headword from "./Headword";
import fuzz from "../functions/fuzz.js";
import NoResults from "./NoResults.js";

export default function SuttaIndex(props) {
  const { filterByText } = props;
  const index = JSON.parse(indexObject);
  const headwordsArray = sortedKeys(index);
  let isEmpty = true;
  return (
    <div className="sutta-index">
      {headwordsArray.map(headword => {
        const regex = new RegExp(fuzz(filterByText), "i");
        const headwordDataString = JSON.stringify(index[headword]) + headword;
        if (!fuzz(headwordDataString).match(regex)) return null;
        isEmpty = false;
        return (
          <Headword key={headword} headword={headword} headwordObject={index[headword]} filterByText={filterByText} />
        );
      })}
      {isEmpty ? <NoResults /> : ""}
    </div>
  );
}
