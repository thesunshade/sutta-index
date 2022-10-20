import { indexArray } from "../data/index-array";
import getSuttaTitleBlurb from "../functions/getSuttaTitleBlurb.js";
import getSuttaTitle from "../functions/getSuttaTitle.js";

export default function LocatorSortedTable() {
  function stripRangesFromUrls(locator) {
    return locator.replace(/–.+/, "");
  }

  const table = indexArray.map((data, index) => (
    <tr key={index}>
      <td>
        <a
          href={`https://suttacentral.net/${data[0]}/en/sujato`}
          target="_blank"
          rel="noreferrer"
          title={getSuttaTitleBlurb(stripRangesFromUrls(data[0]))}
        >
          {data[0]}
        </a>{" "}
        <small>{getSuttaTitle(data[0])}</small>
      </td>
      <td>{data[1]}</td>
      <td>{data[2]}</td>
    </tr>
  ));

  return (
    <table className="locator-sorted-table">
      <thead>
        <tr>
          <th className="first-column">Citation</th>
          <th className="second-column">Keyword</th>
          <th className="third-column">SubHead</th>
        </tr>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
}
