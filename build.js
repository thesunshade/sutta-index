const fs = require("fs");

let data;
try {
  const tsvFileContents = fs.readFileSync("./src/data/general-index.csv", "utf8");
  data = tsvFileContents;
  console.log("successfully read");
} catch (err) {
  console.log("There was an error");
  console.error(err);
}

// build the index object
let lines = data.split("\n");
let rawIndexArray = [];
let index = {};

for (let i = 0; i < lines.length; i++) {
  rawIndexArray[i] = lines[i].split("\t");
}

for (let i = 0; i < rawIndexArray.length - 1; i++) {
  const head = rawIndexArray[i][0].trim();
  const sub = rawIndexArray[i][1].trim();
  const locator = rawIndexArray[i][2].trim();

  if (!index.hasOwnProperty(head)) {
    // the key of the headword does not exist in the object yet, so create the key and add the locator-xref object
    index[head] = { [sub]: { locators: [], xrefs: [] } };
    if (/xref/.test(locator)) {
      index[head][sub].xrefs.push(locator);
    } else {
      index[head][sub].locators.push(locator);
    }
  } else {
    if (!index[head].hasOwnProperty(sub)) {
      // the key for the headword exists, but the sub does not exist as a key
      index[head][sub] = { locators: [], xrefs: [] };

      if (/xref/.test(locator)) {
        index[head][sub].xrefs.push(locator);
      } else {
        index[head][sub].locators.push(locator);
      }
    } else {
      // the head and sub already exist, so the locator must be pushed into the array
      if (/xref/.test(locator)) {
        index[head][sub].xrefs.push(locator);
      } else {
        index[head][sub].locators.push(locator);
      }
    }
  }
}

const object = `export const indexObject =\`${JSON.stringify(index, null, 5)}\``;

// create the array sorted by locator first
let locatorFirstArray = [];

for (let i = 0; i < rawIndexArray.length - 1; i++) {
  // console.log(rawIndexArray[i][2].replace(/\r/, ""));
  locatorFirstArray.push([rawIndexArray[i][2].replace(/\r/, ""), rawIndexArray[i][1], rawIndexArray[i][0]]);
}

locatorFirstArray.sort((a, b) => {
  return a[0].localeCompare(b[0]);
});

const array = `export const indexArray =\`${JSON.stringify(locatorFirstArray, null, 5)}\``;

try {
  fs.writeFileSync("./src/data/index-object.js", object);
} catch (err) {
  console.error(err);
}

try {
  fs.writeFileSync("./src/data/index-array.js", array);
  console.log("array written");
} catch (err) {
  console.error(err);
}
