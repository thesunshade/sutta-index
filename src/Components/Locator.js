import makeNormalizedId from "../functions/makeNormalizedId";
import { useContext } from "react";
import { ContextDestination, ContextFilterSetters } from "../App.js";

export default function Locator(props) {
  let { location, locatorListCount, headwordSubCount } = props;
  const destination = useContext(ContextDestination);
  const [setFilterByText, setFilterInput] = useContext(ContextFilterSetters);
  if (location.match(/xref/)) {
    let xrefLabel = "see also";
    if (locatorListCount === 1 && headwordSubCount === 1) {
      xrefLabel = "see";
    }
    const locationId = makeNormalizedId(location.replace("xref ", ""));
    return (
      <>
        {xrefLabel}{" "}
        <a
          href={"#" + locationId}
          onClick={() => {
            setFilterByText("");
            setFilterInput("");
          }}
        >
          {location.replace("xref ", "")}
        </a>
      </>
    );
  }

  function stripRangesFromUrls(locator) {
    return locator.replace(/–.+/, "");
  }

  let url = "";
  switch (destination) {
    case "SC":
      url = `https://suttacentral.net/${stripRangesFromUrls(location)}/en/sujato`;
      break;
    case "SCL":
      url = `https://sc.readingfaithfully.org/?q=${stripRangesFromUrls(location)}`;
      break;
    case "CH":
      url = `https://sutta.readingfaithfully.org/?q=${stripRangesFromUrls(location)}`;
      break;
    case "SCV":
      url = `https://voice.suttacentral.net/scv/index.html#/sutta?search=${stripRangesFromUrls(location)}`;
      break;
    default:
      url = `https://suttacentral.net/${stripRangesFromUrls(location)}/en/sujato`;
  }

  function addHairSpace(location) {
    return location.replace(/([A-Za-z])(\d)/, "$1 $2");
  }

  return (
    <span>
      <a href={url} rel="noreferrer" target="_blank">
        {addHairSpace(location)}
      </a>
      ,{" "}
    </span>
  );
}
