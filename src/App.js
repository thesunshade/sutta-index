import "./App.css";
import SuttaIndex from "./Components/SuttaIndex.js";
import Info from "./Components/Info.js";
import Stats from "./Components/Stats.js";
// import Favorites from "./Components/Favorites.js";
import OtherToolsIcons from "./Components/OtherToolsIcons.js";
import HeadwordsSearchTool from "./Components/HeadwordsSearchTool.js";
import SearchResults from "./Components/SearchResults.js";
import LocatorSortedTable from "./Components/LocatorSortedTable.js";
import Alphabet from "./Components/Alphabet.js";
import { useState, useEffect, createContext } from "react";
import settingsIcon from "./images/settings.png";
import infoDot from "./images/info-dot.png";
// import favoritesDot from "./images/favorites-dot.png";
import upIcon from "./images/7122424_chevron_up_double_icon.png";
import themeIcon from "./images/8673129_ic_fluent_dark_theme_filled.png";
export const ContextDestination = createContext();
function App() {
  const [destination, setDestination] = useState(localStorage.destination ? localStorage.destination : "SC");
  const [isLocatorView, setIsLocatorView] = useState(false);
  const [showVisited, setShowVisited] = useState(localStorage.showVisited ? localStorage.showVisited : "on");
  const [searchText, setSearchText] = useState("");

  document.addEventListener("click", e => {
    if (!e.target.classList.contains("letter") && !e.target.classList.contains("input-box")) {
      const subMenus = document.getElementsByClassName("dropdown-list");
      for (let i = 0; i < subMenus.length; i++) {
        subMenus[i].classList.add("hidden");
      }
    }
  });

  if (showVisited === "on") {
    document.body.classList.remove("dont-show-visited");
  } else if (showVisited === "off") {
    document.body.classList.add("dont-show-visited");
  }
  useEffect(() => {
    if (showVisited === "on") {
      document.body.classList.remove("dont-show-visited");
    } else if (showVisited === "off") {
      document.body.classList.add("dont-show-visited");
    }
  }, [showVisited]);

  function closeAllDrawers() {
    const allHideableAreas = document.getElementsByClassName("hideable-area");
    for (let i = 0; i < allHideableAreas.length; i++) {
      allHideableAreas[i].classList.add("hidden");
    }
  }

  if (localStorage.theme === "dark") {
    document.body.classList.add("dark");
  } else {
    localStorage.theme = "light";
  }

  function toggleTheme() {
    if (localStorage.theme === "light") {
      document.body.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.body.classList.remove("dark");
      localStorage.theme = "light";
    }
  }

  function toggleArea(areaName) {
    const area = document.getElementById(areaName);
    if (area.classList.contains("hidden")) {
      const allHideableAreas = document.getElementsByClassName("hideable-area");
      for (let i = 0; i < allHideableAreas.length; i++) {
        allHideableAreas[i].classList.add("hidden");
      }
      area.classList.remove("hidden");
    } else area.classList.add("hidden");
  }

  function toggleTableView() {
    if (isLocatorView === false) {
      setIsLocatorView(true);
    } else {
      setIsLocatorView(false);
    }
  }

  return (
    <div id="app" className="App">
      <div className="settings-bar">
        <div className="top-row">
          <HeadwordsSearchTool searchText={searchText} setSearchText={setSearchText} />

          <button className="up-icon" onClick={() => closeAllDrawers()}>
            <img className="icon" height="20px" alt="Go to top" src={upIcon} />
          </button>
          <div id="theme-button" className="theme-button" onClick={toggleTheme}>
            <img className="icon" height="20" alt="Toggle theme" src={themeIcon} />
          </div>
          <div className="settings-button">
            <img
              className="icon"
              width="17px"
              src={settingsIcon}
              alt="Settings Toggle"
              onClick={() => {
                toggleArea("options-area");
              }}
            ></img>
          </div>
          <div className="settings-button">
            <img
              className="icon"
              width="17px"
              src={infoDot}
              alt="Settings Toggle"
              onClick={() => {
                toggleArea("info-area");
              }}
            ></img>
          </div>
          {/* <div className="favorites-button">
            <img
              className="icon"
              width="22px"
              src={favoritesDot}
              alt="Favorites Toggle"
              onClick={() => {
                toggleArea("favorites-area");
              }}
            ></img>
          </div> */}
        </div>

        <Alphabet />

        <div id="info-area" className="info-area hidden hideable-area">
          <Info />
        </div>
        {/* <div id="favorites-area" className="favorites-area hidden hideable-area">
          <Favorites lastClickedLink={lastClickedLink} />
        </div> */}
        <SearchResults searchText={searchText} setSearchText={setSearchText} />
        <div id="options-area" className="options-area hidden  hideable-area">
          <label className="table-view">
            <button
              onClick={() => {
                toggleTableView();
              }}
            >
              Toggle Table View
            </button>{" "}
            To see listing by book
          </label>
          <div
            className="radiobuttonarea"
            onChange={e => {
              setDestination(e.target.value);
              localStorage.destination = e.target.value;
            }}
          >
            <div className="radio-items">
              <span className="button-title"></span>
              Open in:
              <label>
                <input
                  type="radio"
                  name="destination"
                  value="SC"
                  defaultChecked={destination === "SC" ? "checked" : ""}
                />
                Sutta Central
              </label>
              <label>
                <input
                  type="radio"
                  name="destination"
                  value="CH"
                  defaultChecked={destination === "CH" ? "checked" : ""}
                />
                Citation Helper
              </label>
              <label>
                <input
                  type="radio"
                  name="destination"
                  value="SCL"
                  defaultChecked={destination === "SCL" ? "checked" : ""}
                />
                SC Light
              </label>
              <label>
                <input
                  type="radio"
                  name="destination"
                  value="SCV"
                  defaultChecked={destination === "SCV" ? "checked" : ""}
                />
                SC Voice
              </label>
            </div>
          </div>{" "}
          <label>
            <input
              type="checkbox"
              checked={showVisited}
              onChange={e => {
                // setShowVisited(!showVisited);
                if (showVisited === "on") {
                  setShowVisited("off");
                } else if (showVisited === "off") {
                  setShowVisited("on");
                }
                localStorage.showVisited = e.target.checked;
              }}
            ></input>{" "}
            Indicate visited links
          </label>
          <Stats />
          <OtherToolsIcons />
        </div>
      </div>
      {/* close settings bar */}
      {isLocatorView ? (
        <LocatorSortedTable />
      ) : (
        <ContextDestination.Provider value={destination}>
          <SuttaIndex />
        </ContextDestination.Provider>
      )}
    </div>
  );
}

export default App;
