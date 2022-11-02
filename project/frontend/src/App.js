import { Route, Routes } from "react-router-dom";
import RecommendedProfilesPage from "./pages/RecommendedProfilesPage";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";
import CompareFavoritesPage from "./pages/CompareFavorites";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/recommend" element={<RecommendedProfilesPage />}></Route>
        <Route path="/compare" element={<CompareFavoritesPage />}></Route>
        <Route path="/favorites" element={<FavoritesPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
