import { Heart, Star } from "lucide-react";
import "./Watch.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_MOVIE_Favourite } from "../RTK/SLICES/Favourite_Slice";

const WatchList = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GET_ITEM_FROM_LOCAL: any = localStorage.getItem("pageMovie");

  const dispatch = useDispatch();

  const GET_DATA_LOCAL: [
    {
      backdrop_path: string;
      name?: string;
      title?: string;
      id?: number;
      poster_path?: string;
      overview?: string;
      vote_average?: number;
    }
  ] = JSON.parse(GET_ITEM_FROM_LOCAL);

  const MY_DATA = GET_DATA_LOCAL.map((el) => (
    <div className="movie-box" key={el.id}>
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
        <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt="" />
      </div>
      <div className="stars flex justify-between px-2 my-1">
        <div className="star flex gap-1 items-center">
          <Star size={20} color="#ffc107" />
          <div className="rate font-medium">{el.vote_average?.toFixed(2)}</div>
        </div>
        <div className="details flex gap-1">
          <span>
            <Heart
              size={18}
              onClick={() => dispatch(ADD_MOVIE_Favourite(el))}
            />
          </span>
        </div>
      </div>
      <div className="text">
        <h2 className="px-2">
          {el.title
            ? el.title.slice(0, 15) + "..."
            : el.name?.slice(0, 15) + "..."}
        </h2>
      </div>
    </div>
  ));

  return (
    <div className="watch-content p-3 ">
      <img src="./Image/watchlist.png" className="bottom-right" alt="" />
      <div className="main-title flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2>
            Your Watch <span>List</span>
          </h2>
        </div>
      </div>
      {GET_DATA_LOCAL.length < 1 && (
        <h2 className="font-bold text-white text-lg">
          No Movie's Add To Your Favourite List
        </h2>
      )}
      <div className="content-watch">{MY_DATA}</div>
    </div>
  );
};

export default WatchList;
