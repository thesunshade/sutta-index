const fs = require("fs");

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
  var dre =
    /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/; // tslint:disable-line
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
    console.warn(
      "There is an invalid citation or a citation is missing. Check arrays below. Bad citations don't appear on the front end, so you will have to check original data"
    );
    console.table(citations);
    console.table(bookSubList);
  }

  return bookSubList;
}

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
  if (head === "")
    console.error(`!!!!!!!!!!!!!!!!!!!!!!
  !!!!!!!!!!!!!there is a blank headword!!!!!!!!!!!!!!!!!!!!!
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
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

function sortedKeys(object) {
  return Object.keys(object).sort((a, b) => {
    a = a.replace("“", "");
    b = b.replace("“", "");
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });
}

const newObjectKeys = Object.keys(newObject);

for (let i = 0; i < newObjectKeys.length; i++) {
  const unsortHeadwObj = alphabetGroupedObject[newObjectKeys[i]];
  const sortedHeadwObjArr = sortedKeys(unsortHeadwObj);
  // console.log(sortedHeadwObjArr);
  for (let x = 0; x < sortedHeadwObjArr.length; x++) {
    newObject[newObjectKeys[i]][sortedHeadwObjArr[x]] = alphabetGroupedObject[newObjectKeys[i]][sortedHeadwObjArr[x]];
  }
}

const object = `export const indexObject =\`${JSON.stringify(newObject, null, 5)}\``;

try {
  fs.writeFileSync("./src/data/index-object.js", object);
} catch (err) {
  console.error(err);
}

// ---------------------  create the array sorted by locator first
let locatorFirstArray = [];

for (let i = 0; i < rawIndexArray.length - 1; i++) {
  if (!/xref/.test(rawIndexArray[i][2])) {
    locatorFirstArray.push([rawIndexArray[i][2].replace(/\r/, ""), rawIndexArray[i][0], rawIndexArray[i][1]]);
  }
}

locatorFirstArray.sort((a, b) => {
  return a[0].localeCompare(b[0]);
});

// test for blank locator field
for (let i = 0; i < locatorFirstArray.length; i++) {
  if (locatorFirstArray[i][0] === "") {
    console.error("Missing Locator:");
    console.error(locatorFirstArray[i]);
  }
  if (!/(DN|MN|SN|AN|Kp|Dhp|Ud|Iti|Snp|Vv|Pv|Thag|Thig|xref)/.test(locatorFirstArray[i][0])) {
    console.error("Badd citation or xref:");
    console.error(locatorFirstArray[i]);
  }
}

const array = `export const indexArray =\`${JSON.stringify(locatorFirstArray, null, 5)}\``;

try {
  fs.writeFileSync("./src/data/index-array.js", array);
  console.log("array written");
} catch (err) {
  console.error(err);
}
