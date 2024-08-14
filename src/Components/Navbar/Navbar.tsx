import { Search, Menu, ArrowBigLeftDash } from "lucide-react";
import "./navbar.scss";
import { FormEvent, useEffect, useState } from "react";
import SearchComponent from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, openMenu } from "../RTK/SLICES/Sidebar_Slice";

const Navbar = () => {
  const [show, setShow] = useState("");
  const [movie, setMovie] = useState([]);

  const [scroll, setScroll] = useState(false);

  const MY_Redux = useSelector(
    (state: { sidebar: { isOpen: boolean } }) => state.sidebar
  );

  const { isOpen } = MY_Redux;

  const dispatch = useDispatch();

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const FETCH_DATA = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=82ad1a9e357bc59d597d6b1254ba5ae2&query=${show}`
    );
    const myData = await res.json();
    setMovie(myData.results);
  };

  useEffect(() => {
    FETCH_DATA();

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, [show]);

  const hanldeLink = () => {
    setMovie([]);
  };

  return (
    <nav
      className={`navbar p-3 flex justify-center md:justify-around  ${
        scroll ? "navbar__fixed" : ""
      }  ${isOpen ? "addition-form" : ""} `}
    >
      <div className="container flex justify-between w-full items-center">
        {isOpen ? (
          <span onClick={() => dispatch(closeMenu())}>
            <ArrowBigLeftDash size={30} color="#F74346" />
          </span>
        ) : (
          <span onClick={() => dispatch(openMenu())}>
            <Menu size={30} />
          </span>
        )}
        <form
          className="search flex items-center relative"
          onKeyUp={handleForm}
        >
          <input
            type="text"
            placeholder="Search For Movie !!"
            value={show}
            onChange={(e) => setShow(e.target.value)}
          />
          <span>
            <Search size={20} />
          </span>
          {movie.length > 0 && (
            <SearchComponent
              DATA={movie}
              HANLDEMOVIE={hanldeLink}
              movie={movie}
            />
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
