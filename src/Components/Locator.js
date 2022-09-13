// import makeNormalizedId from "../functions/makeNormalizedId";
import { useContext } from "react";
import { ContextDestination } from "../App.js";
import getSuttaTitle from "../functions/getSuttaTitle.js";

export default function Locator(props) {
  let { location } = props;
  const destination = useContext(ContextDestination);
  // const [setFilterByText, setFilterInput] = useContext(ContextFilterSetters);

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
      <a href={url} rel="noreferrer" target="_blank" title={getSuttaTitle(location)}>
        {addHairSpace(location)}
      </a>
    </span>
  );
}
