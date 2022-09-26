import makeNormalizedId from "../functions/makeNormalizedId";
import { ContextFilterSetters, LastClickedLink } from "../App.js";
import { useContext } from "react";

export default function Xref({ xref }) {
  const locationId = makeNormalizedId(xref);
  const [setFilterByText, setFilterInput] = useContext(ContextFilterSetters);
  const { setLastClickedLink } = useContext(LastClickedLink);

  function cleanUpXref(xref) {
    return xref.replace("xref ", "").replace(/\(.+\)/, "");
  }

  function handleClick(e) {
    e.preventDefault();
    // Window.history.push("#" + locationId);
    // window.history.pushState({ page: 1 }, "title 1", "#" + locationId);
    window.location.hash = locationId;
    setFilterByText("");
    setFilterInput("");

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
