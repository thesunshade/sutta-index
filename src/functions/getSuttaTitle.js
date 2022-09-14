import { allSuttasPaliNameDictionary } from "../data/allSuttasPaliNameDictionary";
import { blurbs } from "../data/blurbs";

export default function getSuttaTitle(citation) {
  let title = allSuttasPaliNameDictionary[citation] ? allSuttasPaliNameDictionary[citation] + ": " : "";
  title += blurbs[citation.toLowerCase()] ? " " + blurbs[citation.toLowerCase()] : "";
  return title;
}
