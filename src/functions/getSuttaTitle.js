import { allSuttasPaliNameDictionary } from "../data/allSuttasPaliNameDictionary";

export default function getSuttaTitle(citation) {
  return allSuttasPaliNameDictionary[citation] ? allSuttasPaliNameDictionary[citation] : "";
}

// import { allSuttasPaliObject } from "../data/allSuttasPaliObject.js";

// export default function getSuttaTitle(citation) {
//   let suttaTitle = "";
//   const book = citation.match(/(DN|MN|SN|AN|Kp|Dhp|Ud|Iti|Snp|Vv|Pv|Thag|Thig)/)[0];
//   const numberOfSuttasInBook = allSuttasPaliObject[book].length;

//   for (let i = 0; i < numberOfSuttasInBook; i++)
//     if (citation === allSuttasPaliObject[book][i][0]) {
//       suttaTitle = allSuttasPaliObject[book][i][1];
//       i = numberOfSuttasInBook;
//     }
//   return suttaTitle;
// }
