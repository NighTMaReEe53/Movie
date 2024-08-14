import "./Sidebar.scss";
import List_Category from "./List_Category";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../RTK/SLICES/Sidebar_Slice";

const Sidebar = () => {
  const MY_Redux = useSelector(
    (state: { sidebar: { isOpen: boolean } }) => state.sidebar
  );

  const dispatch = useDispatch();

  const closeTheMenu = () => dispatch(closeMenu());

  useEffect(() => {
    document.body.style.overflow = `${MY_Redux.isOpen ? "hidden" : "auto"}`;
  }, [MY_Redux.isOpen]);

  return (
    <nav
      className={`sidebar ${MY_Redux.isOpen ? "show" : ""}`}
      onClick={closeTheMenu}
    >
      <img src="./1.webp" className="edition" alt="" />
      <div className="close" onClick={closeTheMenu}>
        X
      </div>
      <div className="container p-3">
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
