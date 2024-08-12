import "./Sidebar.scss";
import List_Category from "./List_Category";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = ({
  addClass,
  handleClick,
}: {
  addClass: boolean;
  handleClick: () => void;
}) => {
  function Toggle() {
    if (addClass) {
      document.querySelector(".sidebar")?.classList.add("show");
    } else {
      document.querySelector(".sidebar")?.classList.remove("show");
    }
  }

  useEffect(() => {
    Toggle();
  }, [addClass]);

  return (
    <nav className="sidebar">
      <img src="./1.webp" className="edition" alt="" />
      <div className="close" onClick={handleClick}>
        X
      </div>
      <div className="container p-4">
        <Link
          to={"/"}
          className="text-3xl flex items-center font-bold mb-3 uppercase gap-2"
        >
          <img src="./Image/logo.png" alt="" />
          <h2>
            Mov<span>ies</span>
          </h2>
        </Link>
        <ul className="list pb-3">
          <h2 className="text-xl font-bold mb-3 flex gap-2 items-center">
            <img
              src="./Image/home.png"
              style={{ width: "30px", marginBottom: "3px" }}
              alt=""
            />
            Main
          </h2>
          <Link to={"/watchlist"} className="flex items-center gap-2 mb-3">
            <img src="./Image/eye.png" style={{ width: "30px" }} alt="" />
            <span>WatchList</span>
          </Link>
          <Link to={"/favourite"} className="flex items-center gap-2">
            <img src="./Image/love.png" style={{ width: "30px" }} alt="" />
            <span>Favourtie</span>
          </Link>
        </ul>
        <List_Category />
      </div>
    </nav>
  );
};

export default Sidebar;
