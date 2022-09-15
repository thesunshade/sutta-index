import "./App.css";
import SuttaIndex from "./Components/SuttaIndex.js";
import Stats from "./Components/Stats.js";
import OtherToolsIcons from "./Components/OtherToolsIcons.js";
import LocatorSortedTable from "./Components/LocatorSortedTable.js";
import { useState, createContext } from "react";
import settingsIcon from "./images/settings.png";
import xIcon from "./images/30632_close_cross_x_icon.png";
import upIcon from "./images/7122424_chevron_up_double_icon.png";
import themeIcon from "./images/8673129_ic_fluent_dark_theme_filled.png";
import randomSuggestion from "./functions/randomSuggestion";

export const ContextDestination = createContext();
export const ContextFilterSetters = createContext();

function App() {
  const [destination, setDestination] = useState(localStorage.destination ? localStorage.destination : "SC");
  const [isLocatorView, setIsLocatorView] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const [filterByText, setFilterByText] = useState("");

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

  function toggleView() {
    if (isLocatorView === false) {
      setIsLocatorView(true);
    } else {
      setIsLocatorView(false);
    }
  }

  window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setFilterInput("");
      setFilterByText("");
      document.getElementById("user-input").focus();
    }
  });

  function updateFilterByText(inputText) {
    setFilterInput(inputText);
    if (inputText.length > 2) {
      setFilterByText(inputText);
    } else if (filterByText) {
      setFilterByText("");
    }
  }

  return (
    <div id="app" className="App">
      <div className="settings-bar">
        <div className="top-row">
          <div className="filter-area">
            <label id="user-input-label" htmlFor="user-input">
              Filter:
              <input
                className="filter-input-box"
                id="user-input"
                autoFocus
                type="text"
                value={filterInput}
                onChange={event => updateFilterByText(event.target.value)}
                placeholder={"e.g. " + randomSuggestion()}
              />
              <button
                className="clear-filter-button"
                onClick={() => {
                  setFilterInput("");
                  setFilterByText("");
                  document.getElementById("user-input").focus();
                }}
              >
                <img height="20" alt="clear filter" src={xIcon} />
              </button>
            </label>
          </div>
          <button className="up-icon" onClick={() => window.scrollTo(0, 0)}>
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
                document.getElementById("options-area").classList.toggle("hidden");
              }}
            ></img>
          </div>
        </div>
        <div id="options-area" className="options-area hidden">
          <label className="table-view">
            <button
              onClick={() => {
                toggleView();
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
          <div className="settings-notice">
            <i>Currently</i> the Citation Helper is the best choice. Links to other sites <i>may</i> be broken. Patience
            is the highest virtue.
          </div>
          <Stats />
          <OtherToolsIcons />
        </div>
      </div>
      {/* close settings bar */}
      {isLocatorView ? (
        <LocatorSortedTable />
      ) : (
        <ContextFilterSetters.Provider value={[setFilterByText, setFilterInput]}>
          <ContextDestination.Provider value={destination}>
            <SuttaIndex filterByText={filterByText} />
          </ContextDestination.Provider>
        </ContextFilterSetters.Provider>
      )}
    </div>
  );
}

export default App;
