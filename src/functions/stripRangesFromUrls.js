export default function stripRangesFromUrls(locator) {
  return locator.replace(/[–:].+/, "");
}

// This actually strips the ids as well
