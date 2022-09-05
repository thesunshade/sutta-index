import { allSuttasPali } from "../data/allSuttasPali.js";

export default function findSuttaName(bookName, suttaNumber) {
  const firstNumber = suttaNumber.firstNumber;
  const secondNumber = suttaNumber.secondNumber;
  let suttaName = "";
  // console.log(bookName, firstNumber, secondNumber);

  const completeCitation = `${bookName}${firstNumber ? " " + firstNumber : ""}${
    secondNumber ? "." + secondNumber : ""
  }`;

  for (let i = 0; i < allSuttasPali.length; i++) {
    // console.log(completeCitation + " " + allSuttasPali[i][0].toLowerCase());
    if (completeCitation === allSuttasPali[i][0].toLowerCase()) {
      suttaName = allSuttasPali[i][1];
      // document.title = `${decodeURI(document.location.search).replace("?q=", "")} ${allSuttasPali[i][1]}`;
      i = allSuttasPali.length + 1;
    }
  }

  return suttaName;
}
