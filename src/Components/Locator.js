import { useContext } from "react";
import { ContextDestination } from "../App.js";
import { memo } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

// functions
import getSuttaTitleBlurb from "../functions/getSuttaTitleBlurb.js";
import getSuttaTitle from "../functions/getSuttaTitle.js";
import convertVatthus from "../functions/convertVatthus.js";

tippy("[data-tippy-content]", { touch: ["hold", 1500] });

function Locator(props) {
  let { location } = props;
  const destination = useContext(ContextDestination);

  function stripRangesFromUrls(locator) {
    return locator.replace(/–.+/, "");
  }

  function justBook(location) {
    return location.replace(/[0-9.-]/g, "").toLowerCase();
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

  if ("vv" === justBook(location) || "pv" === justBook(location)) {
    url = `https://SuttaFriends.org/${convertVatthus(locationForUrl)}`;
  }

  if (/^CUSTOM:/.test(location)) {
    const components = location.split(":");
    location = components[2];
    url = "https://" + components[3];
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
        className={justBook(location) + " locator"}
        data-tippy-content={getSuttaTitleBlurb(stripRangesFromUrls(location))}
      >
        {addSpace(location)}
        {getSuttaTitle(location) ? suttaNameJsx : ""}
      </a>
    </span>
  );
}

export default memo(Locator);
