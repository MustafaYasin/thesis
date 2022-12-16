import { Route, Routes } from "react-router-dom";
import RecommendedProfilesPage from "./pages/RecommendedProfilesPage";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";
import CompareFavoritesPage from "./pages/CompareFavorites";
import HomePage from "./pages/HomePage";
import RecommendedProfilesPage2 from "./pages/RecommendedProfilesPage2";

function App() {
  var random_boolean = Math.random() < 0.5;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {random_boolean?<Route path="/recommend" element={<RecommendedProfilesPage />}></Route>:
        <Route path="/recommend" element={<RecommendedProfilesPage2 />}></Route>}
        {/* <Route path="/compare" element={<CompareFavoritesPage />}></Route> */}
        <Route path="/favorites" element={<FavoritesPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
