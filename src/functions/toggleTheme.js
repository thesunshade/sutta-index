export function toggleTheme() {
  if (localStorage.theme === "light") {
    document.body.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.body.classList.remove("dark");
    localStorage.theme = "light";
  }
}
