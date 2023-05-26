import OtherToolsIcons from "./OtherToolsIcons";

export default function Info() {
  const allDetails = document.querySelectorAll("details");

  allDetails.forEach(details => {
    details.addEventListener("toggle", e => {
      if (details.open) {
        allDetails.forEach(details => {
          if (details !== e.target && details.open) {
            details.open = false;
          }
        });
      }
    });
  });
  return (
    <div>
      <p>
        This is an incomplete and unpublished draft of an index of the Sutta Piṭaka. For more information, visit the{" "}
        <a href="https://github.com/thesunshade/sutta-index#readme" rel="noreferrer" target="_blank">
          ReadMe.
        </a>
      </p>

      <details>
        <summary>How to use the index</summary>
        <div>
          <p>
            First, look things up by <em>noun</em> followed by an <em>adjective</em>. If that doesn't work, then try the
            adjective.
          </p>
          <p>In some instances, a specific word may be indexed but not appear in the sutta. </p>
          <p>
            for the sake of simplicity, thee grammar of head and sub words may not always match. For example,{" "}
            <i>energetic, as protector</i> might be more accurately written as <i>energetic, being as protector</i>,
            which more verbosely would be written as <i>energetic, being energetic as protector.</i>
          </p>
          <p>
            In all cases, one should actually read the sutta being refrenced and not rely on the index headings or
            subheadings. For example, some wrong views may be indexed in a way that is not immediately apparent that
            they are such. So actually reading the sutta is critical for understanding the matter at hand.
          </p>
          <p>Diacritics are ignored for alphabetization.</p>
        </div>
      </details>
      <details>
        <summary>Pāli</summary>
        <div>
          <p>
            Pāli is given for some terms. The Pāli is generally in the singular, though the term in the text may be
            plural.
          </p>
          <p>
            Generally, headwords will be in English. For some words where the Pāli is more concise and well known (e.g.
            Bodhisatta, paccekabuddha) it will be listed under Pāli.
          </p>
          <p>
            In some cases, although a Pāli word may appear in parentheses in the head word, the Pāli word may not appear
            in the text.
          </p>
        </div>
      </details>
      <details>
        <summary>Sutta Summaries</summary>
        <div>
          <p>Desktop users can hover over citations to see a summary of the sutta.</p>
        </div>
      </details>
      <details>
        <summary>More Resources</summary>
        <div>
          <p>
            While this index attempts to be more than just significant occurrences, it is by no mean a complete{" "}
            <a href="https://en.wikipedia.org/wiki/Concordance_(publishing)" rel="noreferrer" target="_blank">
              concordance
            </a>{" "}
            of all words in the Sutta Piṭaka. For that you may want to try using{" "}
            <a href="https://www.digitalpalireader.online" rel="noreferrer" target="_blank">
              the DigitalPaliReader.online
            </a>
            .
          </p>
        </div>
      </details>
      <details>
        <summary>Coverage</summary>
        <div className="row-2">
          <div>
            Complete:{" "}
            <span className="answer">MN 51–76, 101–152, SN45–47, AN, Kp, Dhp, Ud, Iti, Snp, Vv, Pv, Thag, Thig</span>
          </div>
          <div>
            In Progress: <span className="answer">MN 1–100</span>
          </div>
          <div>
            Planned: <span className="answer">DN, MN, SN</span>
          </div>
        </div>
        <p>
          <br />
          All citation for Vimanavatthu and Petavatthu link to SuttaFriends.org as it is the only complete online
          resource.
        </p>
      </details>
      <OtherToolsIcons />
    </div>
  );
}
