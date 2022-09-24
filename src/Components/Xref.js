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

  function handleClick() {
    setFilterByText("");
    setFilterInput("");
    console.log(setLastClickedLink);
    // setLastClickedLink(xref.replace("xref ", ""));

    setTimeout(() => {
      setLastClickedLink(xref.replace("xref ", ""));
    }, "1000");
  }

  return (
    <a className="xref-link" href={"#" + locationId} onClick={handleClick}>
      {cleanUpXref(xref)}
    </a>
  );
}
