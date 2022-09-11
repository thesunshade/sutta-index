import { indexObject } from "../data/index-object.js";
import sortedKeys from "../functions/sortedKeys";
import Headword from "./Headword";
import fuzz from "../functions/fuzz.js";

export default function SuttaIndex(props) {
  const { destination, filterByText } = props;
  const index = JSON.parse(indexObject);
  const headwordsArray = sortedKeys(index);

  return (
    <div className="sutta-index">
      {headwordsArray.map(headword => {
        const regex = new RegExp(fuzz(filterByText), "i");
        const headwordDataString = JSON.stringify(index[headword]) + headword;
        if (!fuzz(headwordDataString).match(regex)) return null;
        return (
          <Headword key={headword} headword={headword} headwordObject={index[headword]} filterByText={filterByText} />
        );
      })}
    </div>
  );
}
