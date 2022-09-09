import "./App.css";
import SuttaIndex from "./Components/SuttaIndex.js";
import Stats from "./Components/Stats.js";
import LocatorSortedTable from "./Components/LocatorSortedTable.js";
import { useState } from "react";

function App() {
  const [destination, setDestination] = useState(localStorage.destination ? localStorage.destination : "SC");
  const [isLocatorView, setIsLocatorView] = useState(
    localStorage.isLocatorView ? JSON.parse(localStorage.isLocatorView) : false
  );

  function toggleView() {
    if (isLocatorView === false) {
      setIsLocatorView(true);
      localStorage.isLocatorView = "true";
    } else {
      setIsLocatorView(false);
      localStorage.isLocatorView = "false";
    }
    console.log("hello");
  }

  return (
    <div className="App">
      <div className="settings-bar">
        <div
          className="radiobuttonarea"
          onChange={e => {
            setDestination(e.target.value);
            localStorage.destination = e.target.value;
          }}
        >
          <div>
            <span className="button-title">Open in:</span>
            <label>
              <input
                type="radio"
                name="destination"
                value="SC"
                defaultChecked={destination === "SC" ? "checked" : ""}
              />
              SC
            </label>
            <label>
              <input
                type="radio"
                name="destination"
                value="CH"
                defaultChecked={destination === "CH" ? "checked" : ""}
              />
              CH
            </label>
            <label>
              <input
                type="radio"
                name="destination"
                value="SCL"
                defaultChecked={destination === "SCL" ? "checked" : ""}
              />
              SCL
            </label>
          </div>
        </div>{" "}
        <button
          onClick={() => {
            toggleView();
          }}
        >
          Locators
        </button>
      </div>
      {/* close settings bar */}
      {isLocatorView ? <LocatorSortedTable /> : <SuttaIndex destination={destination} />}

      <Stats />
    </div>
  );
}

export default App;
