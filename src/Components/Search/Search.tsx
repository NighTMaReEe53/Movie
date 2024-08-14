import { Star } from "lucide-react";
import "./Search.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import SEARCH_SKELETON from "./SEARCH_SKELETON";
const Search = ({
  DATA,
  HANLDEMOVIE,
  movie,
}: {
  DATA: {
    backdrop_path?: string;
    poster_path: string;
    title: string;
    vote_average: number;
    id: number;
  }[];
  HANLDEMOVIE: () => void;
  movie: never[];
}) => {
  const [loading, setLoading] = useState(false);

  const restLoading = () => {
    setLoading(true);
  };

  useEffect(() => {
    setTimeout(restLoading, 2000);
  }, [movie]);

  const MY_DATA = DATA.map((el) => {
    return (
      <>
        {loading ? (
          <Link
            to={`/${el.id}`}
            onClick={HANLDEMOVIE}
            className={`box-search`}
            key={el.id}
          >
            {el.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} />
            ) : (
              <Skeleton width={50} height={50} />
            )}
            <div className="text">
              <h2>{el.title.slice(0, 15)}...</h2>
              <div className="stars flex gap-2 items-center">
                <Star size={17} color="#ffc107" />
                <div className="rate">{el.vote_average.toFixed(2)}</div>
              </div>
            </div>
          </Link>
        ) : (
            <SEARCH_SKELETON />
        )}
      </>
    );
  });

  return (
    <div className={`content`}>
      {MY_DATA}
    </div>
  );
};

export default Search;
