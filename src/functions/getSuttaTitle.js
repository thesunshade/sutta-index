import { allSuttasPaliNameDictionary } from "../data/allSuttasPaliNameDictionary";

export default function getSuttaTitle(citation) {
  let title = allSuttasPaliNameDictionary[citation] ? allSuttasPaliNameDictionary[citation] : "";
  return title.replace(/ \[.+?\]/g, "");
}
