import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Components/Home/Home";
import WatchList from "./Components/Pages/WatchList";
import Favourite from "./Components/Pages/Favourite";
import Navbar from "./Components/Navbar/Navbar";
import Popular from "./Components/Pages/Popular";
import Details from "./Components/Pages/Details";
import CATEGORY from "./Components/Pages/CATEGORY";
import MOVIE_CLONE from "./Components/Pages/MOVIE_CLONE";
import { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";

function App() {
  const MY_Redux = useSelector(
    (state: { sidebar: { isOpen: boolean } }) => state.sidebar
  );

  return (
    <SkeletonTheme baseColor="var(--bgFlah)" highlightColor="var(--flash)">
      <div className="app flex gap-3">
        <div className="page flex gap-3 w-full">
          <Sidebar />
          <div
            className={`right__content flex-1 ${
              MY_Redux.isOpen ? "addition" : ""
            }`}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/:MovieID" element={<Details />} />
              <Route path="/Movies/:ID" element={<CATEGORY />} />
              <Route path="/Movies/:ID/:MOVIEID" element={<MOVIE_CLONE />} />
            </Routes>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default App;
