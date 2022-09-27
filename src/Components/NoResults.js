import sadFace from "../images/9024994_smiley_sad_light_icon.png";

export default function NoResults() {
  const alphabetHeadings = document.getElementsByClassName("alphabet-anchor");
  for (let i = 0; i < alphabetHeadings.length; i++) {
    alphabetHeadings[i].classList.add("hidden");
  }
  window.scrollTo(1, 1);

  return (
    <div className="no-results">
      <p>No entries match your filter.</p>
      <p>
        <img className="icon" src={sadFace} alt="" height="30px" />
      </p>
      <p>
        If you are not able to find the sutta you are looking for, consider asking on the{" "}
        <a href="https://discourse.suttacentral.net">SuttaCentral discussion forum</a> or sending an email to{" "}
        <a href="mailto:info@readingfaithfully.org">info@readingfaithfully.org</a>.
      </p>
      <p>
        If you are looking for a name, try the{" "}
        <a href="https://dppn.readingfaithfully.org/">Dictionary of Pali Proper Names</a>.
      </p>
      <p>
        If you know the Pāli word, you may also try using the{" "}
        <a href="https://www.digitalpalireader.online">DigitalPaliReader.online</a>
      </p>
      <p>
        A much shorter, but still useful, index can be found on{" "}
        <a href="https://suttacentral.net/subjects">SuttaCentral.net</a>
      </p>
    </div>
  );
}
