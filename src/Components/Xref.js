import makeNormalizedId from "../functions/makeNormalizedId";
import { ContextFilterSetters } from "../App.js";
import { useContext } from "react";

export default function Xref({ xref }) {
  const locationId = makeNormalizedId(xref);
  const [setFilterByText, setFilterInput] = useContext(ContextFilterSetters);
  return (
    <a
      className="xref-link"
      href={"#" + locationId}
      onClick={() => {
        setFilterByText("");
        setFilterInput("");
      }}
    >
      {xref.replace("xref ", "")}
    </a>
  );
}
