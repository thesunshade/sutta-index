export default function sortCitations(citations) {
  const orderedBooks = ["DN", "MN", "SN", "AN", "Kp", "Dhp", "Ud", "Iti", "Snp", "Vv", "Pv", "Thag", "Thig", "xref"];

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
    xref: [],
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
    bookSubList.push(citationsObject[orderedBooks[i]]);
  }
  bookSubList = bookSubList.flat();

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
