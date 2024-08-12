import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Components/Home/Home";
import WatchList from "./Components/Pages/WatchList";
import Favourite from "./Components/Pages/Favourite";
import Navbar from "./Components/Navbar/Navbar";
import { useState } from "react";
import Popular from "./Components/Pages/Popular";
import Details from "./Components/Pages/Details";
import CATEGORY from "./Components/Pages/CATEGORY";
import MOVIE_CLONE from "./Components/Pages/MOVIE_CLONE";

function App() {
  const [toggle, setToggle] = useState(false);

  function toggleItem() {
    setToggle(!toggle);
  }

  return (
    <div className="app flex gap-3">
      <div className="page flex gap-3 w-full">
        <Sidebar addClass={toggle} handleClick={toggleItem} />
        <div className="right__content flex-1">
          <Navbar handleClick={toggleItem} />
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
  );
}

export default App;
