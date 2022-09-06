import { data } from "./data/data.js";
import addLinks from "./functions/addLinks.js";
import sortCitations from "./functions/sortCitations.js";

const indexArea = document.getElementById("index");

// build the index object
let lines = data.split("\n");
let rawIndexArray = [];
let index = {};

for (let i = 0; i < lines.length; i++) {
  rawIndexArray[i] = lines[i].split("\t");
}

for (let i = 0; i < rawIndexArray.length; i++) {
  const head = rawIndexArray[i][0].trim();
  const sub = rawIndexArray[i][1].trim();
  const locator = rawIndexArray[i][2];

  if (!index[head]) {
    // the key of the headword does not exist in the object yet, so create the key and add the value
    index[head] = { [sub]: [locator] };
  } else {
    if (!index[head][sub]) {
      // the key for the headword exists, but the sub does not exist as a key
      index[head][sub] = [locator];
    } else {
      // the head and sub already exist, so the locator must be pushed into the array
      index[head][sub].push(locator);
    }
  }
}

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
    if (locators.length > 5) {
      finalText += " <span style='color:red'>Too many locators:</span> ";
    }
    for (let a = 0; a < locators.length; a++) {
      let locator = locators[a];
      if (locator.match(/xref/)) {
        let locatorWithoutXref = locator.replace("xref ", "");
        let xrefIdForLocator = makeNormalizedId(locatorWithoutXref);
        if (subWords.length === 1 && subWords.length === 1) {
          locator = `<em>see</em> <a href="#${xrefIdForLocator}">${locatorWithoutXref}</a>`;
        } else {
          locator = `<em>see also</em> <a href="#${xrefIdForLocator}">${locatorWithoutXref}</a>`;
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
