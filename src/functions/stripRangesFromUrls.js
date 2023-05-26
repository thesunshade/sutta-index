export default function stripRangesFromUrls(locator) {
  return locator.replace(/–.+/, "");
}
