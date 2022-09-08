import makeNormalizedId from "../functions/makeNormalizedId";

export default function Locator(props) {
  let { location, locatorListCount, headwordSubCount, destination } = props;

  if (location.match(/xref/)) {
    let xrefLabel = "see also";
    if (locatorListCount === 1 && headwordSubCount === 1) {
      xrefLabel = "see";
    }
    const locationId = makeNormalizedId(location.replace("xref ", ""));
    return (
      <>
        {xrefLabel} <a href={"#" + locationId}>{location.replace("xref ", "")}</a>
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
    default:
      url = `https://suttacentral.net/${stripRangesFromUrls(location)}/en/sujato`;
  }

  return (
    <span>
      <a href={url} rel="noreferrer" target="_blank">
        {location}
      </a>
      ,{" "}
    </span>
  );
}
