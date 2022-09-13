import natsort from "./natsort.js";

export default function sortCitations(citations) {
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

// sortCitations([
//   "DN7",
//   "MN89",
//   "SN34.8",
//   "Ud56",
//   "AN2.4",
//   "Kp9",
//   "Dhp456",
//   "DN1",
//   "MN9",
//   "SN3.8",
//   "Ud6",
//   "AN2.4",
//   "Kp3",
//   "Dhp122",
// ]);
