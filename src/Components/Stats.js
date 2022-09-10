import { indexData } from "../data/index-data";
import { indexArray } from "../data/index-array";
import githubIcon from "../images/GitHub-Mark-64px-black.png";

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
        <a
          href="https://github.com/thesunshade/sutta-index#readme"
          title="The source code for this site"
          rel="noreferrer"
          target="_blank"
        >
          <img width="20px" src={githubIcon} alt="GitHub icon" />
        </a>
      </div>
    </>
  );
}
