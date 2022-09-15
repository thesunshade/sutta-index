import { indexObject } from "../data/index-object";
import { indexArray } from "../data/index-array";
import githubIcon from "../images/GitHub-Mark-64px-black.png";

export default function Stats() {
  const index = JSON.parse(indexArray);
  const headwords = Object.keys(JSON.parse(indexObject));

  return (
    <>
      <div className="stats">
        <div className="row-1">
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
            <img class="icon" width="20px" src={githubIcon} alt="GitHub icon" />
          </a>
        </div>
      </div>
      <div className="row-2">
        Complete Books: Kp, Dhp, Ud, Iti, Snp, Vv, Pv, Thag, Thig
        <br />
        Planned Books: DN, MN, SN, AN
      </div>
    </>
  );
}
