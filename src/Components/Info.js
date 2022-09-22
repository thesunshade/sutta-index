import OtherToolsIcons from "./OtherToolsIcons";

export default function Info() {
  return (
    <div>
      <p>
        This is an incomplete and unpublished draft of an index of the Sutta Piṭaka. For more information, visit the{" "}
        <a href="https://github.com/thesunshade/sutta-index#readme" rel="noreferrer" target="_blank">
          ReadMe.
        </a>
      </p>
      <p>In some instances, a specific word may be indexed but not appear in the sutta. </p>
      <p>
        Pāli is given for some terms. The Pāli is generally in the singular, though the term in the text may be plural.
      </p>
      <p>
        While this index attempts to be more than just significant occurances, it is by no mean a complete{" "}
        <a href="https://en.wikipedia.org/wiki/Concordance_(publishing)" rel="noreferrer" target="_blank">
          concordance
        </a>{" "}
        of all words in the Sutta Piṭaka. For that you may want to try using{" "}
        <a href="https://www.digitalpalireader.online" rel="noreferrer" target="_blank">
          the DigitalPaliReader.online
        </a>
        .
      </p>
      <div className="row-2">
        <div>
          Complete Books: <span className="answer">Kp, Dhp, Ud, Iti, Snp, Vv, Pv, Thag, Thig</span>
        </div>
        <div>
          Planned Books: <span className="answer">DN, MN, SN, AN</span>
        </div>
      </div>
      <OtherToolsIcons />
    </div>
  );
}
