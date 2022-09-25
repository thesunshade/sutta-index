import makeNormalizedId from "../functions/makeNormalizedId.js";
import { useState } from "react";

export default function Favorites(props) {
  const { lastClickedLink } = props;

  const rawFavoritesList = localStorage.favoritesList;

  const [favoritesList, setFavoritesList] = useState(rawFavoritesList ? JSON.parse(rawFavoritesList) : []);

  //   console.log(favoritesList);

  function FavoritesList() {
    if (!favoritesList) {
      return <div>No favorites yet!</div>;
    }

    function hideArea() {
      const hideableAreas = document.getElementsByClassName("hideable-area");
      for (let i = 0; i < hideableAreas.length; i++) {
        hideableAreas[i].classList.add("hidden");
      }
    }

    return (
      <div id="favorites-list" className="favorites-list ">
        <ul className="link-list">
          {favoritesList.map((item, index) => {
            return (
              <a key={index} href={"#" + makeNormalizedId(item)} onClick={hideArea}>
                <li>{item}</li>
              </a>
            );
          })}
        </ul>
        {favoritesList.length > 0 ? (
          <div className="bottom-fav-row">
            <button className="clear-button" onClick={clearFavorites}>
              Clear Favorites
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  function addToFavorites(lastClickedLink) {
    setFavoritesList(oldArray => [...favoritesList, lastClickedLink]);
    storeFavoritesInLocalStorage(lastClickedLink);
  }

  function storeFavoritesInLocalStorage() {
    // console.log("Before storing" + favoritesList);
    localStorage.favoritesList = JSON.stringify([...favoritesList, lastClickedLink]);
  }

  function clearFavorites() {
    if (window.confirm("Do you really want to delete them?") === true) {
      setFavoritesList([]);
      localStorage.removeItem("favoritesList");
    }
  }

  //   console.log(favoritesList);
  return (
    <div>
      <div className="favorites-header">
        <h2>Favorite Topics</h2>
        {lastClickedLink ? (
          <div className="to-be-added-area">
            <span className="to-be-added">{lastClickedLink}</span>
            <button onClick={() => addToFavorites(lastClickedLink)}>Add</button>
          </div>
        ) : (
          ""
        )}

        {!lastClickedLink ? <div className="favorites-instructions">Click on a topic in the index.</div> : ""}
      </div>
      <div className="favorites-instructions">This feature is a work in progress</div>
      <FavoritesList />
    </div>
  );
}
