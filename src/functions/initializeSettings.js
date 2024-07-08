export function initializeSettings() {
  if (localStorage.theme === "dark") {
    document.body.classList.add("dark");
  } else {
    localStorage.theme = "light";
  }

  if (localStorage.coloredLocators === "true") {
    document.body.classList.add("colored-locators");
  } else {
    localStorage.coloredLocators = "false";
    document.body.classList.remove("colored-locators");
  }
}
