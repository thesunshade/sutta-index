import { indexData } from "../data/index-data.js";
import sortedKeys from "../functions/sortedKeys";
import Headword from "./Headword";

export default function SuttaIndex(props) {
  const { destination, filterByText } = props;
  const index = JSON.parse(indexData);
  const headwordsArray = sortedKeys(index);

  return (
    <div className="sutta-index">
      {headwordsArray.map(headword => {
        return (
          <Headword
            key={headword}
            headword={headword}
            headwordObject={index[headword]}
            destination={destination}
            filterByText={filterByText}
          />
        );
      })}
    </div>
  );
}
