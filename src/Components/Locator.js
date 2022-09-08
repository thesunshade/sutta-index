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

  let url = "";
  switch (destination) {
    case "SC":
      url = `https://suttacentral.net/${location}/en/sujato`;
      break;
    case "SCL":
      url = `https://sc.readingfaithfully.org/?q=${location}`;
      break;
    case "CH":
      url = `https://sutta.readingfaithfully.org/?q=${location}`;
      break;
    default:
      url = `https://suttacentral.net/${location}/en/sujato`;
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
