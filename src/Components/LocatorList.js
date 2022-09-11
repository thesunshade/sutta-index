import sortCitations from "../functions/sortCitations";
import Locator from "./Locator";
import Xref from "./Xref.js";

export default function LocatorList(props) {
  const { locatorXrefObject, headwordSubCount } = props;
  const { locators, xrefs } = locatorXrefObject;

  const sortedLocatorArray = sortCitations(locators);
  const sortedXrefsArray = xrefs.sort();

  let xrefLabel = "";
  if (sortedLocatorArray.length === 0 && sortedXrefsArray.length === 1 && headwordSubCount === 1) {
    xrefLabel = "see ";
  } else {
    xrefLabel = "see also ";
  }

  let leadingCommaForXref = "";
  if (sortedLocatorArray.length > 0) {
    leadingCommaForXref = ", ";
  }

  function XrefsList() {
    return (
      <>
        {leadingCommaForXref}
        <span className="xref-label">{xrefLabel}</span>
        {sortedXrefsArray.map((xref, index) => {
          return (
            <span key={index}>
              <Xref xref={xref} />
              {index < sortedXrefsArray.length - 1 ? "; " : ""}
            </span>
          );
        })}
      </>
    );
  }

  return (
    <>
      {sortedLocatorArray.map((locator, index) => {
        return (
          <span key={index}>
            <Locator location={locator} />
            {index < sortedLocatorArray.length - 1 ? ", " : ""}
          </span>
        );
      })}
      {sortedXrefsArray.length > 0 ? <XrefsList /> : ""}
    </>
  );
}
