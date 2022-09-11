export default function fuzz(term) {
  return term
    .normalize("NFD") /*separates diacritics from letter */
    .replace(/[\u0300-\u036f]/g, "") /*removes diacritic characters */
    .replace(/\s/g, "")
    .replace(/[;/(),-]/, "");
}
