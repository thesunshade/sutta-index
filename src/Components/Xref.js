import makeNormalizedId from "../functions/makeNormalizedId";
import { memo } from "react";

function Xref({ xref }) {
  const locationId = makeNormalizedId(xref);

  function cleanUpXref(xref) {
    return xref.replace("xref ", "").replace(/\(.+\)/, "");
  }

  function handleClick(e) {
    e.preventDefault();
    // Window.history.push("#" + locationId);
    // window.history.pushState({ page: 1 }, "title 1", "#" + locationId);
    window.location.hash = locationId;

    // setLastClickedLink("");
    // setLastClickedLink(xref.replace("xref ", ""));

    // setTimeout(() => {
    //   setLastClickedLink(xref.replace("xref ", ""));
    // }, "2000");
  }

  return (
    <a className="xref-link" href={"#" + locationId} onClick={e => handleClick(e)}>
      {cleanUpXref(xref)}
    </a>
  );
}

export default memo(Xref);
