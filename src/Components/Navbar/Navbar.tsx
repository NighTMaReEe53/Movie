import { Search, Menu } from "lucide-react";
import "./navbar.scss";
import { FormEvent, useEffect, useState } from "react";
import SearchComponent from "../Search/Search";

const Navbar = ({ handleClick }: { handleClick: () => void }) => {
  const [show, setShow] = useState("");
  const [movie, setMovie] = useState([]);

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
  }, [show]);

  const hanldeLink = () => {
    setMovie([]);
  };

  return (
    <nav className="navbar p-3 flex justify-center md:justify-between">
      <div className="container flex justify-between w-full items-center">
        <span onClick={handleClick}>
          <Menu size={30} />
        </span>
        <form
          className="search flex items-center relative"
          onKeyUp={handleForm}
        >
          <span>
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search For Movie !!"
            value={show}
            onChange={(e) => setShow(e.target.value)}
          />
        </form>
        {movie.length > 0 && (
          <SearchComponent DATA={movie} HANLDEMOVIE={hanldeLink} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
