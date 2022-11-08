import { useContext } from "react";
import { ContextDestination } from "../App.js";
import getSuttaTitleBlurb from "../functions/getSuttaTitleBlurb.js";
import getSuttaTitle from "../functions/getSuttaTitle.js";
import { memo } from "react";

function Locator(props) {
  let { location } = props;
  const destination = useContext(ContextDestination);

  function stripRangesFromUrls(locator) {
    return locator.replace(/–.+/, "");
  }

  const locationForUrl = stripRangesFromUrls(location).toLowerCase();

  let url = "";
  switch (destination) {
    case "SC":
      url = `https://suttacentral.net/${locationForUrl}/en/sujato`;
      break;
    case "SCL":
      url = `https://sc.readingfaithfully.org/?q=${locationForUrl}`;
      break;
    case "CH":
      url = `https://sutta.readingfaithfully.org/?q=${locationForUrl}`;
      break;
    case "SCV":
      url = `https://voice.suttacentral.net/scv/index.html#/sutta?search=${locationForUrl}`;
      break;
    default:
      url = `https://suttacentral.net/${locationForUrl}/en/sujato`;
  }

  function addSpace(location) {
    return location.replace(/([A-Za-z])(\d)/, "$1 $2");
  }

  const suttaNameJsx = <span className="sutta-name"> {getSuttaTitle(location)}</span>;

  return (
    <span>
      <a
        href={url}
        rel="noreferrer"
        target="_blank"
        className={locationForUrl.replace(/[0-9.-]/g, "") + " locator"}
        title={getSuttaTitleBlurb(stripRangesFromUrls(location))}
      >
        {addSpace(location)}
        {getSuttaTitle(location) ? suttaNameJsx : ""}
      </a>
    </span>
  );
}

export default memo(Locator);
