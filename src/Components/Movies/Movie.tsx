import { ReactNode, useEffect, useState } from "react";
import "./movie.scss";

import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Eye, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_MOVIE } from "../RTK/SLICES/Movie_Slice";

interface IMOVIE_PROPS {
  API: string;
  TITLE?: ReactNode;
  ICON?: ReactNode;
  TYPE_MOVIE?: string;
  NEED?: boolean;
}

interface MOVIE {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
  name?: string;
  overview?: string;
}

const Movie = ({ API, TITLE, ICON, NEED }: IMOVIE_PROPS) => {
  const [movie, setMovie] = useState([]);

  const dispatch = useDispatch();

  const FETCH_MOVIE = async () => {
    const res = await fetch(`${API}`);
    const myData = await res.json();
    setMovie(myData.results);
  };

  const handleLink = (product: MOVIE) => {
    dispatch(ADD_MOVIE(product));
  };

  function HandleAlert() {
    setInterval(() => {
      document.querySelectorAll(".showing")?.forEach((el) => el.remove());
    }, 20000);
  }
  HandleAlert();

  useEffect(() => {
    FETCH_MOVIE();
  }, [API]);

  return (
    <div className={`p-3 needle ${NEED && "main-content"}`}>
      <div className="main-title flex justify-between items-center">
        <div className="flex items-center gap-2">
          {movie.length > 0 && TITLE}
          {ICON}
        </div>
      </div>
      <Swiper
        // Break Point
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.7,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={6}
        navigation
        loop={true}
      >
        {movie.length > 0 &&
          movie.map((el: MOVIE) => (
            <SwiperSlide key={el.id}>
              <div className="box">
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
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                    alt=""
                  />
                </div>
                <div className="stars flex justify-between items-center px-1">
                  <div className="star flex gap-1">
                    <Star size={20} color="#ffc107" />
                    <span className="rate font-medium">
                      {el.vote_average.toFixed(2)}
                    </span>
                  </div>
                  <div className="details flex gap-1">
                    <Link to={"/"}>
                      <Heart size={15} />
                    </Link>
                    <Link to={`/watchlist`} onClick={() => handleLink(el)}>
                      <Eye size={15} />
                    </Link>
                  </div>
                </div>
                <div className="text px-1 mt-1">
                  <h2>
                    {el.title
                      ? el.title.slice(0, 15) + "..."
                      : el.name?.slice(0, 15) + "..."}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Movie;
