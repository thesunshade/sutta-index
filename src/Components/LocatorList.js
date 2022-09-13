import sortCitations from "../functions/sortCitations";
import Locator from "./Locator";
import Xref from "./Xref.js";

export default function LocatorList(props) {
  const { locatorXrefObject, headwordSubCount } = props;
  const { locators, xrefs } = locatorXrefObject;

  let xrefLabel = "";
  if (locators.length === 0 && xrefs.length === 1 && headwordSubCount === 1) {
    xrefLabel = "see ";
  } else {
    xrefLabel = "see also ";
  }

  let leadingCommaForXref = "";
  if (locators.length > 0) {
    leadingCommaForXref = ", ";
  }

  function XrefsList() {
    return (
      <>
        {leadingCommaForXref}
        <span className="xref-label">{xrefLabel}</span>
        {xrefs.map((xref, index) => {
          return (
            <span key={index}>
              <Xref xref={xref} />
              {index < xrefs.length - 1 ? "; " : ""}
            </span>
          );
        })}
      </>
    );
  }

  return (
    <>
      {locators.map((locator, index) => {
        return (
          <span key={index}>
            <Locator location={locator} />
            {index < locators.length - 1 ? ", " : ""}
          </span>
        );
      })}
      {xrefs.length > 0 ? <XrefsList /> : ""}
    </>
  );
}
