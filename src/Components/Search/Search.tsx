import { Star } from "lucide-react";
import "./Search.scss";
import { Link } from "react-router-dom";
const Search = ({
  DATA,
  HANLDEMOVIE,
}: {
  DATA: {
    backdrop_path: string;
    title: string;
    vote_average: number;
    id: number;
  }[];
  HANLDEMOVIE: () => void;
}) => {
  const MY_DATA = DATA.map((el) => {
    return (
      <Link
        to={`/${el.id}`}
        onClick={HANLDEMOVIE}
        className="box-search"
        key={el.id}
      >
        <img src={`https://image.tmdb.org/t/p/w500/${el.backdrop_path}`} />
        <div className="text">
          <h2>{el.title.slice(0, 15)}...</h2>
          <div className="stars flex gap-2 items-center">
            <Star size={17} color="#ffc107" />
            <div className="rate">{el.vote_average.toFixed(2)}</div>
          </div>
        </div>
      </Link>
    );
  });

  return <div className="content">{MY_DATA}</div>;
};

export default Search;
