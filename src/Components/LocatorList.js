import { memo } from "react";

// components
import Locator from "./Locator";
import Xref from "./Xref.js";

function LocatorList(props) {
  const { locatorXrefObject, headwordSubCount } = props;
  const { locators, xrefs } = locatorXrefObject;
  if (locators === undefined) return;
  let xrefLabel = "";
  if (locators.length === 0 && xrefs.length === 1 && headwordSubCount === 1) {
    xrefLabel = "see ";
  } else {
    xrefLabel = "see also ";
  }

  function XrefsList() {
    return (
      <div>
        <span className="xref-label">{xrefLabel}</span>
        {xrefs.map((xref, index) => {
          return (
            <span key={index}>
              <span>
                <Xref xref={xref} />
                {index < xrefs.length - 1 ? "; " : ""}
              </span>
              <br />
            </span>
          );
        })}
      </div>
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

export default memo(LocatorList);
