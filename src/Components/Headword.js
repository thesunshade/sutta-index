import { memo } from "react";

// components
import LocatorList from "./LocatorList";

// functions
import sortedKeys from "../functions/sortedKeys";
import makeNormalizedId from "../functions/makeNormalizedId";

// images
import iconLink from "../images/link-icon.png";
import iconCopy from "../images/copy-icon2.png";
import iconCopyMarkdown from "../images/copy-markdown.png";
import iconCopyHtml from "../images/copy-html.png";
import iconCopyText from "../images/copy-text.png";

function Headword(props) {
  let { headword, headwordObject } = props;
  let sortedSubWords = sortedKeys(headwordObject);
  sortedSubWords = sortedSubWords.filter(item => item !== "counter");

  let counterNumber = "";
  if (headwordObject.counter) counterNumber = headwordObject.counter;

  function copyText(headword, headwordObject) {
    let textEntry = headword + "\n";
    if (sortedSubWords.length > 0) {
      for (let i = 0; i < sortedSubWords.length; i++) {
        textEntry += sortedSubWords[i];
        if (sortedSubWords[i].length > 0) {
          textEntry += " ";
        }
        let subwordArray = [];
        if (sortedSubWords[i] === "") {
          subwordArray = headwordObject[""].locators;
        } else {
          subwordArray = headwordObject[sortedSubWords[i]].locators;
        }
        for (let x = 0; x < subwordArray.length; x++) {
          const separator = x < subwordArray.length - 1 ? ", " : "";
          textEntry += subwordArray[x] + separator;
        }
        textEntry += "\n";
      }
    }
    navigator.clipboard.writeText(textEntry);
  }

  function copyMarkdown(headword, headwordObject) {
    let textEntry = "# " + headword + "\n\n";
    if (sortedSubWords.length > 0) {
      for (let i = 0; i < sortedSubWords.length; i++) {
        textEntry += "* " + sortedSubWords[i];
        if (sortedSubWords[i].length > 0) {
          textEntry += " ";
        }
        let subwordArray = [];
        if (sortedSubWords[i] === "") {
          subwordArray = headwordObject[""].locators;
        } else {
          subwordArray = headwordObject[sortedSubWords[i]].locators;
        }
        for (let x = 0; x < subwordArray.length; x++) {
          const separator = x < subwordArray.length - 1 ? ", " : "";
          let link = "";
          switch (localStorage.destination) {
            case "SCL":
              link = `[${subwordArray[x]}](https://sc.readingfaithfully.org?q=${subwordArray[x]})`;
              break;
            case "CH":
              link = `[${subwordArray[x]}](https://sutta.readingfaithfully.org?q=${subwordArray[x]})`;
              break;
            case "SC":
            default:
              link = `[${subwordArray[x]}](https://suttacentral.net/${subwordArray[x].toLowerCase()}/en/sujato)`;
          }
          textEntry += link + separator;
        }
        textEntry += "\n";
      }
    }
    navigator.clipboard.writeText(textEntry);
  }

  function copyHtml(headword, headwordObject) {
    let textEntry = "<h1>" + headword + "</h1>\n<ul>\n";
    if (sortedSubWords.length > 0) {
      for (let i = 0; i < sortedSubWords.length; i++) {
        textEntry += "\t<li>" + sortedSubWords[i];
        if (sortedSubWords[i].length > 0) {
          textEntry += " ";
        }
        let subwordArray = [];
        if (sortedSubWords[i] === "") {
          subwordArray = headwordObject[""].locators;
        } else {
          subwordArray = headwordObject[sortedSubWords[i]].locators;
        }
        for (let x = 0; x < subwordArray.length; x++) {
          const separator = x < subwordArray.length - 1 ? ", " : "";
          let link = "";
          switch (localStorage.destination) {
            case "SCL":
              link = `<a href="https://sc.readingfaithfully.org?q=${subwordArray[x]}">${subwordArray[x]}</a>`;
              break;
            case "CH":
              link = `<a href="https://sutta.readingfaithfully.org?q=${subwordArray[x]}">${subwordArray[x]}</a>`;
              break;
            case "SC":
            default:
              link = `<a href="https://suttacentral.net/${subwordArray[x].toLowerCase()}/en/sujato">${
                subwordArray[x]
              }</a>`;
          }
          textEntry += link + separator;
        }
        textEntry += "</li>\n";
      }
    }
    textEntry += "</ul>";
    navigator.clipboard.writeText(textEntry);
  }

  return (
    <div key={headword} id={makeNormalizedId(headword)}>
      <div className="head-word-area">
        <a onClick={e => {}} className="headword-link" href={"#" + makeNormalizedId(headword)}>
          <span className="head-word">
            <img
              alt="copy icon"
              className="icon copy-icon"
              height="16"
              src={iconCopy}
              title="Copy Heading Text"
              onClick={e => {
                e.preventDefault();
                navigator.clipboard.writeText(headword);
              }}
            />
            <img
              alt="link-icon"
              className="icon link-icon"
              height="18"
              src={iconLink}
              title="Copy Link to Heading"
              onClick={e => {
                e.preventDefault();
                navigator.clipboard.writeText(`index.readingfaithfully.org/#${makeNormalizedId(headword)}`);
              }}
            />
            <span className="keyword">
              {headword}
              {counterNumber ? <span className="counter">{counterNumber}</span> : ""}
            </span>
            <img
              alt="copy icon"
              className="icon copy-icon"
              height="14"
              src={iconCopyText}
              title="Copy text of this entry"
              onClick={e => {
                e.preventDefault();
                copyText(headword, headwordObject);
              }}
            />
            <img
              alt="copy icon"
              className="icon copy-icon"
              height="14"
              src={iconCopyMarkdown}
              title="Copy Markdown of this entry"
              onClick={e => {
                e.preventDefault();
                copyMarkdown(headword, headwordObject);
              }}
            />
            <img
              alt="copy icon"
              className="icon copy-icon"
              height="14"
              src={iconCopyHtml}
              title="Copy Html of this entry"
              onClick={e => {
                e.preventDefault();
                copyHtml(headword, headwordObject);
              }}
            />
          </span>
        </a>
      </div>
      {headwordObject.hasOwnProperty("") ? (
        <div className="sub-word">
          <LocatorList headwordSubCount={sortedSubWords.length} locatorXrefObject={headwordObject[""]} />
        </div>
      ) : (
        ""
      )}
      {sortedSubWords.map(subhead => {
        if (subhead === "" || subhead === "counter") return null;
        return (
          <div className="sub-word" key={subhead}>
            <span className="keyword">{subhead}</span> <LocatorList locatorXrefObject={headwordObject[subhead]} />
          </div>
        );
      })}
    </div>
  );
}

export default memo(Headword);
