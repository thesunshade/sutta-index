export function toggleArea(areaName) {
  const area = document.getElementById(areaName);
  if (area.classList.contains("hidden")) {
    const allHideableAreas = document.getElementsByClassName("hideable-area");
    for (let i = 0; i < allHideableAreas.length; i++) {
      allHideableAreas[i].classList.add("hidden");
    }
    area.classList.remove("hidden");
  } else area.classList.add("hidden");
}
