import { useContext } from "react";
import { ContextDestination } from "../App.js";
import { memo } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// functions
import getSuttaTitleBlurb from "../functions/getSuttaTitleBlurb.js";
import getSuttaTitle from "../functions/getSuttaTitle.js";
import convertVatthus from "../functions/convertVatthus.js";
import justBook from "../functions/justBook.js";
import stripRangesFromUrls from "../functions/stripRangesFromUrls.js";

function Locator(props) {
  let { location } = props;
  const destination = useContext(ContextDestination);

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
      <Tippy
        content={<span dangerouslySetInnerHTML={{ __html: getSuttaTitleBlurb(stripRangesFromUrls(location)) }} />}
        allowHTML={false}
        delay={300}
        disabled={!getSuttaTitleBlurb(stripRangesFromUrls(location))}
      >
        <a href={url} rel="noreferrer" target="_blank" className={justBook(location) + " locator"}>
          {addSpace(location)}
          {getSuttaTitle(location) ? suttaNameJsx : ""}
        </a>
      </Tippy>
    </span>
  );
}

export default memo(Locator);
