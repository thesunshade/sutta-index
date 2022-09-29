import { indexArray } from "../data/index-array";

export default function LocatorSortedTable() {
  const table = indexArray.map((data, index) => (
    <tr key={index}>
      <td>
        <a href={`https://suttacentral.net/${data[0]}/en/sujato`}>{data[0]}</a>
      </td>
      <td>{data[1]}</td>
      <td>{data[2]}</td>
    </tr>
  ));

  return (
    <table className="locator-sorted-table">
      <thead>
        <th className="first-column">Citation</th>
        <th className="second-column">Keyword</th>
        <th className="third-column">SubHead</th>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
}
