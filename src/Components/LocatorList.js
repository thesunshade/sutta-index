import sortCitations from "../functions/sortCitations";
import Locator from "./Locator";

export default function LocatorList(props) {
  const { locatorArray, headwordSubCount } = props;
  const sortedLocatorArray = sortCitations(locatorArray);
  return (
    <>
      {sortedLocatorArray.map((locator, index) => {
        return (
          <Locator
            key={index}
            location={locator}
            headwordSubCount={headwordSubCount}
            locatorListCount={sortedLocatorArray.length}
          />
        );
      })}
    </>
  );
}
