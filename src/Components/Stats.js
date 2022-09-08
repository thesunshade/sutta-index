import { indexData } from "../data/index-data";

export default function Stats() {
  const headwords = Object.keys(JSON.parse(indexData));
  return <div className="stats">Number of headwords: {headwords.length}</div>;
}
