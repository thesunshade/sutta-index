// const { match } = require("assert");
const fs = require("fs");

let locatorFirstArray = [];
let rawIndexArray = [];
let alphabetKeys;
let xrefArray = [];
const newObject = {
  A: {},
  B: {},
  C: {},
  D: {},
  E: {},
  F: {},
  G: {},
  H: {},
  I: {},
  J: {},
  K: {},
  L: {},
  M: {},
  N: {},
  O: {},
  P: {},
  Q: {},
  R: {},
  S: {},
  T: {},
  U: {},
  V: {},
  W: {},
  Y: {},
  Z: {},
};
let alphabetGroupedObject = {
  A: {},
  B: {},
  C: {},
  D: {},
  E: {},
  F: {},
  G: {},
  H: {},
  I: {},
  J: {},
  K: {},
  L: {},
  M: {},
  N: {},
  O: {},
  P: {},
  Q: {},
  R: {},
  S: {},
  T: {},
  U: {},
  V: {},
  W: {},
  Y: {},
  Z: {},
};

function natsort(options) {
  if (options === void 0) {
    options = {};
  }
  var ore = /^0/;
  var sre = /\s+/g;
  var tre = /^\s+|\s+$/g;
  // unicode
  var ure = /[^\x00-\x80]/;
  // hex
  var hre = /^0x[0-9a-f]+$/i;
  // numeric
  var nre = /(0x[\da-fA-F]+|(^[\+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|\d+)/g;
  // datetime
  var dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/; // tslint:disable-line
  var toLowerCase = String.prototype.toLocaleLowerCase || String.prototype.toLowerCase;
  var GREATER = options.desc ? -1 : 1;
  var SMALLER = -GREATER;
  var normalize = options.insensitive
    ? function (s) {
        return toLowerCase.call("".concat(s)).replace(tre, "");
      }
    : function (s) {
        return "".concat(s).replace(tre, "");
      };
  function tokenize(s) {
    return s.replace(nre, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0");
  }
  function parse(s, l) {
    // normalize spaces; find floats not starting with '0',
    // string or 0 if not defined (Clint Priest)
    return ((!s.match(ore) || l === 1) && parseFloat(s)) || s.replace(sre, " ").replace(tre, "") || 0;
  }
  return function (a, b) {
    // trim pre-post whitespace
    var aa = normalize(a);
    var bb = normalize(b);
    // return immediately if at least one of the values is empty.
    // empty string < any others
    if (!aa && !bb) {
      return 0;
    }
    if (!aa && bb) {
      return SMALLER;
    }
    if (aa && !bb) {
      return GREATER;
    }
    // tokenize: split numeric strings and default strings
    var aArr = tokenize(aa);
    var bArr = tokenize(bb);
    // hex or date detection
    var aHex = aa.match(hre);
    var bHex = bb.match(hre);
    var av = aHex && bHex ? parseInt(aHex[0], 16) : aArr.length !== 1 && Date.parse(aa);
    var bv = aHex && bHex ? parseInt(bHex[0], 16) : (av && bb.match(dre) && Date.parse(bb)) || null;
    // try and sort Hex codes or Dates
    if (bv) {
      if (av === bv) {
        return 0;
      }
      if (av < bv) {
        return SMALLER;
      }
      if (av > bv) {
        return GREATER;
      }
    }
    var al = aArr.length;
    var bl = bArr.length;
    // handle numeric strings and default strings
    for (var i = 0, l = Math.max(al, bl); i < l; i += 1) {
      var af = parse(aArr[i] || "", al);
      var bf = parse(bArr[i] || "", bl);
      // handle numeric vs string comparison.
      // numeric < string
      if (isNaN(af) !== isNaN(bf)) {
        return isNaN(af) ? GREATER : SMALLER;
      }
      // if unicode use locale comparison
      if (ure.test(af + bf) && af.localeCompare) {
        var comp = af.localeCompare(bf);
        if (comp > 0) {
          return GREATER;
        }
        if (comp < 0) {
          return SMALLER;
        }
        if (i === l - 1) {
          return 0;
        }
      }
      if (af < bf) {
        return SMALLER;
      }
      if (af > bf) {
        return GREATER;
      }
      if ("".concat(af) < "".concat(bf)) {
        return SMALLER;
      }
      if ("".concat(af) > "".concat(bf)) {
        return GREATER;
      }
    }
    return 0;
  };
}

// build the index object
function createIndexObject() {
  let csvData;

  function sortCitationsList(citations) {
    const orderedBooks = ["DN", "MN", "SN", "AN", "Kp", "Dhp", "Ud", "Iti", "Snp", "Vv", "Pv", "Thag", "Thig"];

    const citationsObject = {
      DN: [],
      MN: [],
      SN: [],
      AN: [],
      Kp: [],
      Dhp: [],
      Ud: [],
      Iti: [],
      Snp: [],
      Vv: [],
      Pv: [],
      Thag: [],
      Thig: [],
    };

    for (let i = 0; i < citations.length; i++) {
      for (let x = 0; x < orderedBooks.length; x++) {
        if (citations[i].match(RegExp(orderedBooks[x]))) {
          citationsObject[orderedBooks[x]].push(citations[i]);
        }
      }
    }

    let bookSubList = [];
    for (let i = 0; i < orderedBooks.length; i++) {
      const book = orderedBooks[i];
      const sortedCitations = citationsObject[book].sort(natsort());
      bookSubList.push(sortedCitations);
    }
    bookSubList = bookSubList.flat();

    if (citations.length > bookSubList.length) {
      console.warn(`❌ There is an invalid ciation: ${citations[0]}`);
    }

    return bookSubList;
  }

  // read csv file
  try {
    const tsvFileContents = fs.readFileSync("./src/data/general-index.csv", "utf8");
    csvData = tsvFileContents;
    console.log("✅ successfully read TSV file");
  } catch (err) {
    console.log("❌There was an error reading");
    console.error(err);
  }

  try {
    const tsvStatsObject = fs.statSync("./src/data/general-index.csv", "utf8");
    const formattedMtime = tsvStatsObject.mtime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
    const formattedMtimeDate = tsvStatsObject.mtime.toLocaleString("en-gb", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    console.log(`📅 TSV creation date: ${formattedMtimeDate} ${formattedMtime}`);
  } catch (err) {
    console.log(err);
  }

  let lines = csvData.split("\n");

  for (let i = 0; i < lines.length; i++) {
    rawIndexArray[i] = lines[i].split("\t");
  }

  // count total unique locators
  const allLocatorsArray = [];
  for (let i = 0; i < rawIndexArray.length - 1; i++) {
    const locator = rawIndexArray[i][2].trim();
    if (!locator.match(/xref/)) {
      allLocatorsArray.push(locator);
    }
  }
  const totalUniqueLocatorsLength = [...new Set(allLocatorsArray.flat())].length;
  console.log(`#️⃣  Total unique locators: ${totalUniqueLocatorsLength}`);

  try {
    fs.writeFileSync("./src/data/uniqueLocators.js", `export const uniqueLocators =${totalUniqueLocatorsLength}`);
  } catch (err) {
    console.log("❌There was an error writing total unique locators");
    console.error(err);
  }

  // end of total unique locators

  function normalizeDiacriticString(string) {
    return string
      .normalize("NFD") /*separates diacritics from letter */
      .replace(/[\u0300-\u036f]/g, ""); /*removes diacritic characters */
  }

  for (let i = 0; i < rawIndexArray.length - 1; i++) {
    const head = rawIndexArray[i][0].trim();
    const sub = rawIndexArray[i][1].trim();
    const locator = rawIndexArray[i][2].trim();

    const headStartingWithLetter = head.replace("“", "");
    const firstRealLetter = normalizeDiacriticString(headStartingWithLetter.charAt(0)).toUpperCase();
    if (head === "") {
      console.error(`❌  @${i + 1} there is a blank headword! Sub: ${sub}, Locator: ${locator}`);
    }
    if (/xref/.test(head)) {
      console.warn(`❌ The headword  @${i + 1} "${head}" contains 'xref'`);
    }
    if (/["']/.test(sub + head)) {
      console.warn(`❌ The sub/headword @${i + 1} ${head}/${sub} contains straight quotes
      This may indicate that the csv file format was incorrect`);
    }
    if (!alphabetGroupedObject[firstRealLetter].hasOwnProperty(head)) {
      // the key of the headword does not exist in the object yet, so create the key and add the locator-xref object
      alphabetGroupedObject[firstRealLetter][head] = { [sub]: { locators: [], xrefs: [] } };
      if (/xref/.test(locator)) {
        alphabetGroupedObject[firstRealLetter][head][sub].xrefs.push(locator);
      } else {
        alphabetGroupedObject[firstRealLetter][head][sub].locators.push(locator);
      }
    } else {
      if (!alphabetGroupedObject[firstRealLetter][head].hasOwnProperty(sub)) {
        // the key for the headword exists, but the sub does not exist as a key
        alphabetGroupedObject[firstRealLetter][head][sub] = { locators: [], xrefs: [] };

        if (/xref/.test(locator)) {
          alphabetGroupedObject[firstRealLetter][head][sub].xrefs.push(locator);
        } else {
          alphabetGroupedObject[firstRealLetter][head][sub].locators.push(locator);
        }
      } else {
        // the head and sub already exist, so the locator must be pushed into the array
        if (/xref/.test(locator)) {
          alphabetGroupedObject[firstRealLetter][head][sub].xrefs.push(locator);
        } else {
          alphabetGroupedObject[firstRealLetter][head][sub].locators.push(locator);
        }
      }
    }
  }

  // sort locators
  const alphabetArray = Object.keys(alphabetGroupedObject);
  for (let a = 0; a < alphabetArray.length; a++) {
    const headwords = Object.keys(alphabetGroupedObject[alphabetArray[a]]);
    const alphabetObject = alphabetGroupedObject[alphabetArray[a]];

    for (let i = 0; i < headwords.length; i++) {
      const subs = Object.keys(alphabetObject[headwords[i]]);
      const headWordObject = alphabetObject[headwords[i]];
      for (let x = 0; x < subs.length; x++) {
        headWordObject[subs[x]].locators = sortCitationsList(headWordObject[subs[x]].locators);
      }

      for (let x = 0; x < subs.length; x++) {
        headWordObject[subs[x]].xrefs.sort();
      }
    }
  }

  function sortedKeys(object) {
    return Object.keys(object).sort((a, b) => {
      a = a.replace("“", "");
      b = b.replace("“", "");
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    });
  }

  alphabetKeys = Object.keys(newObject);

  for (let i = 0; i < alphabetKeys.length; i++) {
    const unsortHeadwObj = alphabetGroupedObject[alphabetKeys[i]];
    const sortedHeadwObjArr = sortedKeys(unsortHeadwObj);
    for (let x = 0; x < sortedHeadwObjArr.length; x++) {
      newObject[alphabetKeys[i]][sortedHeadwObjArr[x]] = alphabetGroupedObject[alphabetKeys[i]][sortedHeadwObjArr[x]];
    }
  }

  function getRootHeadword(headword) {
    return headword.replace(/ \(.+?\)/, "");
  }

  for (let i = 0; i < alphabetKeys.length; i++) {
    const letter = alphabetKeys[i];
    const headwords = Object.keys(newObject[letter]);
    let counter = 1;
    for (let x = 0; x < headwords.length - 1; x++) {
      const currentHeadword = headwords[x];
      const currentRootHeadword = getRootHeadword(headwords[x]);
      const nextRootHeadword = getRootHeadword(headwords[x + 1]);
      if (currentRootHeadword === nextRootHeadword) {
        newObject[letter][currentHeadword].counter_value = counter;
        counter++;
      } else if (x > 0) {
        const previousRootHeadword = getRootHeadword(headwords[x - 1]);
        if (currentRootHeadword === previousRootHeadword) {
          newObject[letter][currentHeadword].counter_value = counter;
          counter = 1;
        }
      }
    }
  }

  // count number of unique locators per headword

  let locatorCountHeadwordsList = [];
  const alphabetList = Object.keys(newObject);
  for (let i = 0; i < alphabetList.length; i++) {
    const letter = alphabetList[i];
    const letterObject = newObject[letter];
    const headwordArray = Object.keys(letterObject);

    // console.log(letterObject[headwordArray[0]]);
    for (let x = 0; x < headwordArray.length; x++) {
      const headword = headwordArray[x];
      // console.log("HEADWORD: " + headword);
      let allLocators = [];
      const headwordObject = letterObject[headword];
      const subheadArray = Object.keys(headwordObject);
      for (let y = 0; y < subheadArray.length; y++) {
        const subhead = subheadArray[y];
        // console.log("SUBHEAD: " + subhead);
        const subheadObject = headwordObject[subhead];
        allLocators.push(subheadObject.locators);
      }
      const uniqueLocatorsLength = [...new Set(allLocators.flat())].length;
      // console.log(headword + ": " + uniqueLocatorsLength);
      if (uniqueLocatorsLength > 0) {
        locatorCountHeadwordsList.push([headword, uniqueLocatorsLength]);
      }
    }
  }
  locatorCountHeadwordsList.sort(function (a, b) {
    return a[1] - b[1];
  });
  locatorCountHeadwordsList.reverse();

  const object = `export const indexObject =${JSON.stringify(newObject, null, 5)}`;
  try {
    fs.writeFileSync("./src/data/index-object.js", object);
    console.log("✅ indexObject written");
  } catch (err) {
    console.log("❌There was an error writing indexObject");
    console.error(err);
  }

  const headwordLocatorCount = `export const indexObject =${JSON.stringify(locatorCountHeadwordsList, null, 5)}`;

  try {
    fs.writeFileSync("./src/data/headwordLocatorCount.js", headwordLocatorCount);
    console.log("✅ headwordLocatorCount written");
  } catch (err) {
    console.log("❌There was an error writing headwordLocatorCount");
    console.error(err);
  }

  let headwordLocatorCountHTML = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-table.png">
  <title>Headwords sorted by number of locators</title>
  <style>
  .table{
    display:flex;
    flex-direction:column;
    max-width:20rem;
    border-top:solid 1px black;
    font-family:Arial, Helvetica, sans-serif
  }
  .row{
    display:flex;
    flex-direction:row;
    border-bottom:solid 1px black;
    justify-content: space-between;
    padding:.2rem .5rem;
    border-left:solid 1px black;
    border-right:solid 1px black;
  }
  .row:nth-child(even) {background: #ee7121}
  .row:nth-child(odd) {background: #fff9f1}
  </style>
  </head>
  
  <body>
  <div>The following is the number of unique locators (i.e. citations) that each headword has (across all subheads). Headwords without actual locators are not included.</div>`;

  headwordLocatorCountHTML += `<div class="table">`;
  for (let i = 0; i < locatorCountHeadwordsList.length; i++) {
    headwordLocatorCountHTML += `
    <div class="row">
    <div class="headword">${locatorCountHeadwordsList[i][0]}</div>
    <div class="count">${locatorCountHeadwordsList[i][1]}</div>
    </div>`;
  }
  headwordLocatorCountHTML += `
  <div>
  </body>`;

  try {
    fs.writeFileSync("./public/locatorcounttable.html", headwordLocatorCountHTML);
    console.log("✅ headwordLocatorCountHTML written");
  } catch (err) {
    console.log("❌There was an error writing headwordLocatorCountHTML");
    console.error(err);
  }
}

function createHeadingsArray() {
  function makeArrayOfXrefs(rawIndexArray) {
    for (let i = 0; i < rawIndexArray.length; i++) {
      if (/xref/.test(rawIndexArray[i][2])) xrefArray.push(rawIndexArray[i][2].replace("xref ", "").replace("\r", ""));
    }
  }

  let listOfHeadwords = [];
  for (let i = 0; i < alphabetKeys.length; i++) {
    const headwords = Object.keys(newObject[alphabetKeys[i]]);
    listOfHeadwords.push(headwords);
  }
  listOfHeadwords = listOfHeadwords.flat();

  const headwordsArray = `export const headwordsArray =${JSON.stringify(listOfHeadwords, null, 5)}`;

  try {
    fs.writeFileSync("./src/data/headwords-array.js", headwordsArray);
    console.log("✅ headwordsArray written");
  } catch (err) {
    console.log("❌There was an error writing headwordsArray");
    console.error(err);
  }

  makeArrayOfXrefs(rawIndexArray);

  //go through xrefArray and make sure that each one appears in the list of headwords
  for (let i = 0; i < xrefArray.length; i++) {
    if (!headwordsArray.includes(xrefArray[i].trim())) {
      console.log(`❌  ${xrefArray[i]} is not a valid xref`);
    }
  }
}

function createLocatorSortedArray() {
  for (let i = 0; i < rawIndexArray.length - 1; i++) {
    if (!/xref/.test(rawIndexArray[i][2]) && !/CUSTOM/.test(rawIndexArray[i][2])) {
      locatorFirstArray.push([rawIndexArray[i][2].replace(/\r/, ""), rawIndexArray[i][0], rawIndexArray[i][1]]);
    }
  }

  locatorFirstArray = locatorFirstArray.sort(natsort());

  // test for blank locator field
  for (let i = 0; i < locatorFirstArray.length; i++) {
    if (locatorFirstArray[i][0] === "") {
      console.error(`❌ Missing Locator, Head: ${locatorFirstArray[i][1]}; Sub: ${locatorFirstArray[i][2] ? locatorFirstArray[i][2] : "blank"}`);
    }
    if (!/(DN|MN|SN|AN|Kp|Dhp|Ud|Iti|Snp|Vv|Pv|Thag|Thig|xref)/.test(locatorFirstArray[i][0])) {
      console.error(`❌ Bad citation or xref:${locatorFirstArray[i][0] ? locatorFirstArray[i][0] : "blank"}; Head: ${locatorFirstArray[i][1]}; Sub: ${locatorFirstArray[i][2] ? locatorFirstArray[i][2] : "blank"}`);
    }
  }

  // test for blank subheads
  let blankSubheads = 0;
  for (let i = 0; i < locatorFirstArray.length; i++) {
    if (locatorFirstArray[i][2] === "") blankSubheads++;
  }

  const array = `export const indexArray =${JSON.stringify(locatorFirstArray, null, 5)}`;

  try {
    fs.writeFileSync("./src/data/index-array.js", array);
    console.log(`✅ indexArray written with ⫷ ${blankSubheads}⫸ blank subheads`);
  } catch (err) {
    console.log("❌There was an error writing indexArray");
    console.error(err);
  }
}

function createLocatorBookObject() {
  // const locatorObject = {};
  // for (let i = 0; i < locatorFirstArray.length; i++) {
  //   if (locatorObject.hasOwnProperty(locatorFirstArray[i][0])) {
  //     locatorObject[locatorFirstArray[i][0]].push(locatorFirstArray[i][1] + ", " + locatorFirstArray[i][2]);
  //   } else {
  //     locatorObject[locatorFirstArray[i][0]] = [locatorFirstArray[i][1] + ", " + locatorFirstArray[i][2]];
  //   }
  // }

  const locatorBookObject = {
    DN: [],
    MN: [],
    SN: [],
    AN: [],
    Kp: [],
    Dhp: [],
    Ud: [],
    Iti: [],
    Snp: [],
    Vv: [],
    Pv: [],
    Thag: [],
    Thig: [],
  };

  function findBook(citation) {
    return citation.match(/(DN|MN|SN|AN|Kp|Dhp|Ud|Iti|Snp|Vv|Pv|Thag|Thig|xref)/)[0];
  }

  for (let i = 0; i < locatorFirstArray.length; i++) {
    const book = findBook(locatorFirstArray[i][0]);
    locatorBookObject[book].push(locatorFirstArray[i]);
  }

  const locatorBookObjectString = `export const locatorBookObject =${JSON.stringify(locatorBookObject, null, 2)}`;

  try {
    fs.writeFileSync("./src/data/locator-book-object.js", locatorBookObjectString);
    console.log("✅ locatorBookObject written");
  } catch (err) {
    console.log("❌There was an error writing locatorBookObject");
    console.error(err);
  }
}

function createDate() {
  const currentDate = new Date().toLocaleString("en-gb", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
  try {
    fs.writeFileSync("./src/data/updateDate.js", `export const updateDate ="${currentDate + ", " + currentTime}"`);
    console.log(`📅 Job completed: ${currentDate} ${currentTime}`);
  } catch (err) {
    console.log("❌There was an error writing updateDate");
    console.error(err);
  }
}

console.log("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");

createIndexObject();
createLocatorSortedArray();
createHeadingsArray();
createLocatorBookObject();
createDate();

console.log("▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲");
