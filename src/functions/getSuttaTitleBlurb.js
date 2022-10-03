import { allSuttasPaliNameDictionary } from "../data/allSuttasPaliNameDictionary";
import { blurbs } from "../data/blurbs";

export default function getSuttaTitleBlurb(citation) {
  let title = allSuttasPaliNameDictionary[citation] ? allSuttasPaliNameDictionary[citation] : "";
  if (allSuttasPaliNameDictionary[citation] && blurbs[citation.toLowerCase()]) {
    title += ": ";
  }
  title += blurbs[citation.toLowerCase()] ? blurbs[citation.toLowerCase()] : "";
  return title;
}
