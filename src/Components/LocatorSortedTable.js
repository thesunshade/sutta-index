import { indexArray } from "../data/index-array";
const index = JSON.parse(indexArray);

export default function LocatorSortedTable() {
  const table = index.map((data, index) => (
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
      <colgroup>
        <col className="first-col" />
        <col />
        <col />
      </colgroup>
      <tbody>{table}</tbody>
    </table>
  );
}
