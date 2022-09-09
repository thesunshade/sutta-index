import { indexData } from "../data/index-data";
import { indexArray } from "../data/index-array";

export default function Stats() {
  const index = JSON.parse(indexArray);
  const headwords = Object.keys(JSON.parse(indexData));
  return (
    <>
      <div className="stats">
        <div>
          Number of headwords: <span className="number">{headwords.length}</span>
        </div>
        <div>
          Number of locators: <span className="number">{index.length}</span>
        </div>
      </div>
    </>
  );
}
