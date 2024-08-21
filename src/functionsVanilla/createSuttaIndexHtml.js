import fs from "fs";
import makeNormalizedId from "../functions/makeNormalizedId.js";
import { suttaIndexHtmlStyles } from "./styles/suttaIndexHtmlStyles.js";
import sortedKeys from "../functions/sortedKeys.js";
import getSuttaBlurb from "../functions/getSuttaBlurb.js";
import getSuttaTitle from "../functions/getSuttaTitle.js";
import justBook from "../functions/justBook.js";

export default function createSuttaIndexHtml(indexObject) {
  function citationOnly(locator) {
    if (locator.includes(":")) {
      return locator.split(":")[0].toLowerCase();
    }
    return locator;
  }

  function segmentOnly(locator) {
    if (locator.includes(":")) {
      return "#" + locator.toLowerCase();
    }
    return "";
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
      <body class="colored-locators">
      <div id="sutta-index" className="sutta-index">
      <div class="settings-bar">
        <div class="top-row">
          <div class="search-area"></div>
          <div id="theme-button" class="theme-button">
            <img class="icon" height="20"  src="8673129_ic_fluent_dark_theme_filled.png" />
          </div>
          <div class="settings-button">
            <img class="icon" width="17px"  src="settings.png"/>
          </div>
          <div className="settings-button">
            <img class="icon" width="17px"  src="info-dot.png" />
          </div>
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
      </div>`;

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
          ${headword}</span></a>
          </div>
          ${sortedSubWords
            .map(subhead => {
              let locatorListObject = headwordsObject[headword][subhead];
              return `<div class="sub-word">${subhead}
              <span class="locator-list">
              ${locatorListObject.locators
                .map((locator, index) => {
                  return `<a href="${`https://suttacentral.net/${citationOnly(locator)}/en/sujato${segmentOnly(locator)}`}" title="${getSuttaBlurb(locator)}" target="_blank" rel="noreferrer" class="${justBook(locator) + " locator"}"> 
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
    `<div>
  </body>
  </html>`;

  try {
    fs.writeFileSync("../public/suttaindexhtml.html", suttaIndexHtml);
    console.log("🌐 suttaIndexHtml written");
  } catch (err) {
    console.log("❌There was an error writing suttaIndexHtml");
    console.error(err);
  }
}
