import { locatorBookObject } from "../data/locator-book-object";
import getSuttaTitleBlurb from "../functions/getSuttaTitleBlurb.js";
import getSuttaTitle from "../functions/getSuttaTitle.js";

export default function LocatorSortedTable() {
  function stripRangesFromUrls(locator) {
    return locator.replace(/–.+/, "");
  }

  const table = Object.keys(locatorBookObject).map(book =>
    locatorBookObject[book].map((data, index) => (
      <>
        {index === 0 ? (
          <tr key={book} id={book} className="book-header-row">
            <td colSpan="3">
              <h2>{book}</h2>
            </td>
          </tr>
        ) : (
          ""
        )}
        <tr key={book + "-" + index}>
          <td>
            <a href={`https://sc.readingfaithfully.org/?q=${data[0]}`} target="_blank" rel="noreferrer" title={getSuttaTitleBlurb(stripRangesFromUrls(data[0]))}>
              {data[0]}
            </a>{" "}
            <small>{getSuttaTitle(data[0])}</small>
          </td>
          <td>{data[1]}</td>
          <td>{data[2]}</td>
        </tr>
      </>
    ))
  );

  return (
    <table className="locator-sorted-table">
      <thead className="table-header-row">
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
