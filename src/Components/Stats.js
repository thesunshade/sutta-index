import { indexObject } from "../data/index-object";
import { indexArray } from "../data/index-array";
import githubIcon from "../images/GitHub-Mark-64px-black.png";

export default function Stats() {
  const index = JSON.parse(indexArray);
  const headwords = Object.keys(JSON.parse(indexObject));

  return (
    <>
      <div className="stats">
        <div className="settings-notice">Stats:</div>
        <div className="row-1">
          <div>
            Number of headwords: <span className="answer">{headwords.length}</span>
          </div>
          <div>
            Number of locators: <span className="answer">{index.length}</span>
          </div>
        </div>

        <div className="row-2">
          <div>
            Complete Books: <span className="answer">Kp, Dhp, Ud, Iti, Snp, Vv, Pv, Thag, Thig</span>
          </div>
          <div>
            Planned Books: <span className="answer">DN, MN, SN, AN</span>
          </div>
        </div>
      </div>
    </>
  );
}
