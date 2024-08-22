import fs from "fs";
import makeNormalizedId from "../functions/makeNormalizedId.js";
import { suttaIndexHtmlStyles } from "./styles/suttaIndexHtmlStyles.js";
import { scriptsText } from "./scriptsText.js";
import { copyScriptsText } from "./copyScriptsText.js";
import { themeScriptsText } from "./themeScriptsText.js";
import { headwordsArray } from "../data/headwords-array.js";
import sortedKeys from "../functions/sortedKeys.js";
import getSuttaBlurb from "../functions/getSuttaBlurb.js";
import getSuttaTitle from "../functions/getSuttaTitle.js";
import justBook from "../functions/justBook.js";
import convertVatthus from "../functions/convertVatthus.js";

export default function createSuttaIndexHtml(indexObject) {
  function citationOnly(locator) {
    if (locator.includes(":")) {
      return locator.split(":")[0].toLowerCase();
    }
    return locator.replace(/–.+/, "");
  }

  function segmentOnly(locator) {
    if (locator.includes(":")) {
      return "#" + locator.toLowerCase();
    }
    return "";
  }

  function isVatthu(locator) {
    if (justBook(locator) === "vv" || justBook(locator) === "pv") {
      return true;
    }
  }

  let alphabet = Object.keys(indexObject);

  let suttaIndexHtml = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" type="image/png" sizes="32x32" href="favicon-html.png">
      <title>HTML Index</title>
      ${suttaIndexHtmlStyles}
      </head>
      <body id="app" class="colored-locators hide-snack-bar">
      <div class="snack-bar">Copied!</div>
      
      <div id="settings-bar" class="settings-bar">
        <div class="top-row">
          <div class="search-area">
          <input type="text" id="search-box" placeholder="Search..." spellcheck="false">
          </div>
          <div id="theme-button" class="theme-button settings-button">
            <img class="icon" height="20"  src="8673129_ic_fluent_dark_theme_filled.png" />
          </div>
          <!-- <div class="settings-button">
            <img class="icon" width="17px"  src="settings.png"/>
          </div> -->
          <!-- <div class="settings-button">
            <img class="icon" width="17px"  src="info-dot.png" />
          </div> -->
        </div>
        <div class="alphabet">
        ${alphabet
          .map(letter => {
            return `<span class="letter" id=${letter}>
                  ${letter}
                </span>`;
          })
          .join("")}
        </div>
        <div id="results" class="search-results"></div>
      </div>
      <div id="sutta-index" class="sutta-index">`;

  function injectCounterNumber(headword, counterNumber) {
    let headwordWithCount;
    if (counterNumber) {
      let rootHeadword = headword.split(" (");
      if (rootHeadword.length === 1) {
        headwordWithCount = `${rootHeadword[0]} <span class="counter">${counterNumber}</span>`;
        return headwordWithCount;
      } else {
        headwordWithCount = `${rootHeadword[0]} <span class="counter">${counterNumber}</span> (${rootHeadword[1]}`;
        return headwordWithCount;
      }
    } else return headword;
  }

  const index = alphabet
    .map(letter => {
      const headwordsObject = indexObject[letter];
      const headwordsArray = Object.keys(headwordsObject);
      return `
        <div class="alphabet-anchor" id=${letter}>
          ${letter}
        </div>
        ${headwordsArray
          .map(headword => {
            let sortedSubWords = sortedKeys(headwordsObject[headword]);

            sortedSubWords = sortedSubWords.filter(item => item !== "counter_value");
            return `
            <div id="${makeNormalizedId(headword)}">
            <div class="head-word-area">
          <a class="headword-link" href=${"#" + makeNormalizedId(headword)}>
          <span class="head-word">
          <img src="images/copy-icon2.png" alt="copy icon" class="icon copy-icon click-to-copy" height="16 title="Copy Heading Text" data-clipboard-text="${headword}">
          <img src="images/link-icon.png" alt="link copy icon" class="icon link-icon click-to-copy" height="16 title="Copy Heading Text" data-clipboard-text="index.readingfaithfully.org/html#${makeNormalizedId(headword)}">${injectCounterNumber(headword, headwordsObject[headword].counter_value)}</span></a>
          </div>
          ${sortedSubWords
            .map(subhead => {
              let locatorListObject = headwordsObject[headword][subhead];
              return `<div class="sub-word">${subhead === "" ? (sortedSubWords.length === 1 ? "see " : "see also ") : subhead}
              <span class="locator-list">
              ${locatorListObject.xrefs
                .map((xref, index) => {
                  xref = xref.replace("xref ", "");
                  return `<a href="#${makeNormalizedId(xref)}" class="xref-link"> 
                  ${xref} </a>${index + 1 === locatorListObject.xrefs.length ? "" : "; <br>"} `;
                })
                .join("")}
              ${locatorListObject.locators
                .map((locator, index) => {
                  return `<a href="${isVatthu(locator) ? `https://suttafriends.org/${convertVatthus(locator)}` : `https://suttacentral.net/${citationOnly(locator)}/en/sujato${segmentOnly(locator)}`}" target="_blank" rel="noreferrer" class="${justBook(locator) + " locator"}"  title="${getSuttaBlurb(locator)}"> 
                  ${locator} <small class="sutta-name">${getSuttaTitle(locator)}</small>
                </a>${index + 1 === locatorListObject.locators.length ? "" : ", "} `;
                })
                .join("")}
              </div>
              `;
            })
            .join("")}
          </span>
          </div>`;
          })
          .join("")}`;
    })
    .join("");

  suttaIndexHtml +=
    index +
    `</div>
    <script type="module" src="scripts.js"></script>
  </body>
  </html>`;

  try {
    fs.writeFileSync("../public/suttaindexhtml.html", suttaIndexHtml);
    console.log("🌐 suttaIndexHtml written");
  } catch (err) {
    console.log("❌There was an error writing suttaIndexHtml");
    console.error(err);
  }

  let headwordsArraryText = "const headwordsArray =" + JSON.stringify(headwordsArray, null, 2);

  const script = headwordsArraryText + "\n\n" + scriptsText + copyScriptsText + themeScriptsText;

  try {
    fs.writeFileSync("../public/scripts.js", script);
    console.log("🛠️ scripts.js written");
  } catch (err) {
    console.log("❌There was an error writing scripts.js");
    console.error(err);
  }
}
