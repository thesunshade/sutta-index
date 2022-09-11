export default function makeNormalizedId(text) {
  return text
    .replace("xref ", "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "-")
    .replace(/,/, "")
    .replace(/;/, "")
    .replace(/\//, "")
    .replace(/\(/, "")
    .replace(/\)/, "");
}
