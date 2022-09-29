import makeNormalizedId from "../functions/makeNormalizedId";
import { memo } from "react";

function Xref({ xref }) {
  const locationId = makeNormalizedId(xref);

  function cleanUpXref(xref) {
    return xref.replace("xref ", "").replace(/ \(.+\)/, "");
  }

  function handleClick(e) {
    e.preventDefault();
    window.location.hash = locationId;
  }

  return (
    <a className="xref-link" href={"#" + locationId} onClick={e => handleClick(e)}>
      {cleanUpXref(xref)}
    </a>
  );
}

export default memo(Xref);
