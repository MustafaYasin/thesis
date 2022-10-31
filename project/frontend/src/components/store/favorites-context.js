import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteProfile) => {},
  removeFavorite: (profileId) => {},
  itemIsFavorite: (profileId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteProfile) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteProfile);
    });
  }

  function removeFavoriteHandler(profileId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((profile) => profile.email !== profileId);
    });
  }

  function itemIsFavoriteHandler(profileId) {
    return userFavorites.some((profile) => profile.email === profileId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
