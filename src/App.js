import { useState, createContext, useEffect } from "react";
import "./App.css";
// Components
import SuttaIndex from "./Components/SuttaIndex.js";
import Info from "./Components/Info.js";
import OtherToolsIcons from "./Components/OtherToolsIcons.js";
import HeadwordsSearchTool from "./Components/HeadwordsSearchTool.js";
import SearchResults from "./Components/SearchResults.js";
import LocatorSortedTable from "./Components/LocatorSortedTable.js";
import BookSelector from "./Components/BookSelector";
import Alphabet from "./Components/Alphabet.js";
// images
import settingsIcon from "./images/settings.png";
import infoDot from "./images/info-dot.png";
import themeIcon from "./images/8673129_ic_fluent_dark_theme_filled.png";
import VisuallyHidden from "./Components/VisuallyHidden.js";
// functions
import { initializeSettings } from "./functions/initializeSettings.js";
import { toggleArea } from "./functions/toggleArea.js";
import { toggleTheme } from "./functions/toggleTheme.js";

export const ContextDestination = createContext();

function App() {
  const [destination, setDestination] = useState(localStorage.destination ? localStorage.destination : "SC");

  const [searchText, setSearchText] = useState("");

  initializeSettings();

  // only add GoatCounter script on production
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const script = document.createElement("script");
      script.setAttribute("data-goatcounter", "https://readingfaithfully.goatcounter.com/count");
      script.async = true;
      script.src = "//gc.zgo.at/count.js";
      document.body.appendChild(script);
    }
  }, []);

  // hide submenus when clicking outsid them
  document.addEventListener("click", e => {
    if (!e.target.classList.contains("letter") && !e.target.classList.contains("input-box")) {
      const subMenus = document.getElementsByClassName("dropdown-list");
      for (let i = 0; i < subMenus.length; i++) {
        subMenus[i].classList.add("hidden");
      }
      if (!e.target.classList.contains("icon") && e.target.classList.length > 0) {
        const hideableAreas = document.getElementsByClassName("hideable-area");
        for (let i = 0; i < hideableAreas.length; i++) {
          hideableAreas[i].classList.add("hidden");
        }
      }
    }
  });



  function toggleColorView() {
    if (localStorage.coloredLocators === "true") {
      document.body.classList.remove("colored-locators");
      localStorage.coloredLocators = "false";
    } else {
      document.body.classList.add("colored-locators");
      localStorage.coloredLocators = "true";
    }
  }

  return (
    <div id="app" className="App hide-snack-bar">
      <div className="snack-bar">Copied!</div>
      <div className="settings-bar">
        <div className="top-row">
          <HeadwordsSearchTool searchText={searchText} setSearchText={setSearchText} />

          <div id="theme-button" className="theme-button" onClick={toggleTheme}>
            <VisuallyHidden>Toggle Theme</VisuallyHidden>
            <img className="icon" height="20" alt="Toggle theme" src={themeIcon} />
          </div>
          <div className="settings-button">
            <VisuallyHidden>Settings</VisuallyHidden>
            <img
              className="icon"
              width="17px"
              src={settingsIcon}
              alt="Settings Toggle"
              onClick={() => {
                toggleArea("options-area");
              }}></img>
          </div>
          <div className="settings-button">
            <VisuallyHidden>Information</VisuallyHidden>
            <img
              className="icon"
              width="17px"
              src={infoDot}
              alt="Settings Toggle"
              onClick={() => {
                toggleArea("info-area");
              }}></img>
          </div>
        </div>
        <Alphabet />
        <div id="info-area" className="info-area hidden hideable-area">
          <Info />
        </div>
        <SearchResults searchText={searchText} setSearchText={setSearchText} />
        <div id="options-area" className="options-area hidden  hideable-area">
          <label className="color-view">
            <button
              onClick={() => {
                toggleColorView();
              }}>
              Toggle Color
            </button> of citations by book
          </label>
          <div
            className="radiobuttonarea"
            onChange={e => {
              setDestination(e.target.value);
              localStorage.destination = e.target.value;
            }}>
            <div className="radio-items">
              <span className="button-title"></span>
              Open in:
              <label>
                <input type="radio" name="destination" value="SC" defaultChecked={destination === "SC" ? "checked" : ""} />
                Sutta Central
              </label>
              <label>
                <input type="radio" name="destination" value="CH" defaultChecked={destination === "CH" ? "checked" : ""} />
                Citation Helper
              </label>
              <label>
                <input type="radio" name="destination" value="SCL" defaultChecked={destination === "SCL" ? "checked" : ""} />
                SC Light
              </label>
              <label>
                <input type="radio" name="destination" value="SCV" defaultChecked={destination === "SCV" ? "checked" : ""} />
                SC Voice
              </label>
            </div>
          </div>{" "}
          <OtherToolsIcons />
        </div>
      </div>
      {/* close settings bar */}
        <ContextDestination.Provider value={destination}>
          <SuttaIndex />
        </ContextDestination.Provider>
    </div>
  );
}

export default App;
