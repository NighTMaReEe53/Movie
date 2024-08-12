import { Eye, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./category.scss";
import { useDispatch } from "react-redux";
import { ADD_MOVIE } from "../RTK/SLICES/Movie_Slice";

const CATEGORY = () => {
  const { ID } = useParams();
  const [count, setCount] = useState(1);
  const [movie, setMovie] = useState([]);
  const dispatch = useDispatch();

  const GET_MOVIES = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?page=${count}&api_key=82ad1a9e357bc59d597d6b1254ba5ae2&with_genres=${ID}`
    );
    const myData = await res.json();
    setMovie(myData.results);
  };

  const MY_MOVIE = movie.map(
    (el: {
      poster_path: string;
      id: number;
      vote_average: number;
      title: string;
      name?: string;
      overview?: string;
    }) => (
      <div className="box movie-box" key={el.id}>
        <div className="show">
          <h2>
            {el.title
              ? el.title.slice(0, 15) + "..."
              : el.name?.slice(0, 15) + "..."}
          </h2>
          <p>{el.overview?.slice(0, 40)}...</p>
          <Link to={`/${el.id}`} className="btn cursor-pointer">
            Details
          </Link>
        </div>
        <div className="image">
          <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} />
        </div>
        <div className="stars flex justify-between px-2 my-1">
          <div className="star flex gap-1 items-center">
            <Star size={20} color="#ffc107" />
            <div className="rate font-medium">{el.vote_average.toFixed(2)}</div>
          </div>
          <div className="details flex gap-1">
            <Link to={`/`}>
              <Heart size={18} />
            </Link>
            <Link to={`/watchlist`} onClick={() => dispatch(ADD_MOVIE(el))}>
              <Eye size={18} />
            </Link>
          </div>
        </div>
        <div className="text">
          <h2 className="px-2">{el.title.slice(0, 15)}...</h2>
        </div>
      </div>
    )
  );

  useEffect(() => {
    GET_MOVIES();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [ID, count]);

  return (
    <div className="movie-content px-3">
      {MY_MOVIE}
      <div className="mx-auto my-3 flex gap-2">
        {count > 1 && (
          <button className="btn" onClick={() => setCount(count - 1)}>
            Previous Page
          </button>
        )}
        <button className="load btn" onClick={() => setCount(count + 1)}>
          {movie.length < 1 ? "Loading..." : "Next Page"}
        </button>
      </div>
    </div>
  );
};

export default CATEGORY;
