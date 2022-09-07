import { indexData } from "./data/index-data.js";
import addLinks from "./functions/addLinks.js";
import sortCitations from "./functions/sortCitations.js";
const index = JSON.parse(indexData);
const indexArea = document.getElementById("index");
let isDevelopment = false;

function sortKeys(object) {
  return Object.keys(object).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function makeNormalizedId(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "-")
    .replace(/[,\(\)]/, "");
}

const headWords = sortKeys(index);
let finalText = "";

for (let i = 0; i < headWords.length; i++) {
  const headWord = headWords[i];

  finalText += `<p class="head-word" id="${makeNormalizedId(headWord)}"><strong>${headWord}</strong>`;

  const subWords = sortKeys(index[headWord]);

  for (let x = 0; x < subWords.length; x++) {
    const subWord = subWords[x];
    if (subWord != "" && subWords.length === 1) {
      finalText += ", " + subWord;
    } else if (subWord != "" && subWords.length > 1 && x === 0) {
      finalText += `</p><p class='sub-word'><strong>${subWord}</strong>`;
    } else if (subWord != "") {
      finalText += `</p><p class='sub-word'><strong>${subWord}</strong>`;
    }
    const locators = sortCitations(index[headWord][subWord]);
    if (isDevelopment && locators.length > 5) {
      finalText += " <span style='color:red'>Too many locators:</span> ";
    }
    for (let a = 0; a < locators.length; a++) {
      let locator = locators[a];
      if (locator.match(/xref/)) {
        let locatorWithoutXref = locator.replace("xref ", "");
        let xrefIdForLocator = makeNormalizedId(locatorWithoutXref);
        let xrefLink = `<a class="xref-link" href="#${xrefIdForLocator}">${locatorWithoutXref}</a>`;
        if (subWords.length === 1 && subWords.length === 1) {
          locator = `<em>see</em> ${xrefLink}`;
        } else {
          locator = `<em>see also</em> ${xrefLink}`;
        }
      }
      finalText += `, ${locator}`;
    }
    finalText += "</p>";
  }
}

finalText += `<div class="stats">Number of headwords: ${headWords.length}</div>`;

const isAllTranslations = false;
const isNewTab = true;
const format = "SCL";

indexArea.innerHTML = addLinks({ textToLink: finalText, format, isAllTranslations, isNewTab });
