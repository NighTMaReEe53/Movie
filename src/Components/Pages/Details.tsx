import { Eye, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Swiper
import { Scrollbar } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./details.scss";
import ReactPlayer from "react-player";
import Movie from "../Movies/Movie";
import { useDispatch } from "react-redux";
import { ADD_MOVIE } from "../RTK/SLICES/Movie_Slice";
import Skeleton from "react-loading-skeleton";
import { ADD_MOVIE_Favourite } from "../RTK/SLICES/Favourite_Slice";

interface IPROPS {
  backdrop_path?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  original_title?: string;
  original_language?: string;
  genres?: { id: number; name: string }[];
  production_companies?: { id: number; name: string }[];
  overview?: string;
}

const Details = () => {
  const { MovieID } = useParams();
  const [movie, setMovie] = useState<IPROPS>();
  const [video, setVideo] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const MOVIE_CLONE = { ...movie };

  const dispatch = useDispatch();

  const GET_MOVIE_DETAILS = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${MovieID}?language=en-US&api_key=82ad1a9e357bc59d597d6b1254ba5ae2`
    );
    const myData = await res.json();
    setMovie(myData);
  };

  const GET_VIDEO = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${MovieID}/videos?language=en-US&api_key=82ad1a9e357bc59d597d6b1254ba5ae2`
    );
    const myData = await res.json();
    setVideo(myData.results);
  };

  const THE_CAST = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${MovieID}?api_key=82ad1a9e357bc59d597d6b1254ba5ae2&language=en-US&append_to_response=credits`
    );
    const myData = await res.json();
    setCast(myData.credits.cast);
  };

  const MY_GENERS = movie?.genres?.map(({ id, name }) => (
    <span key={id}>{name}</span>
  ));

  const GENERATE_MOVIE = movie?.production_companies?.map(({ id, name }) => (
    <span key={id}>{name}</span>
  ));

  const MY_VIDEO = video
    .filter((_, indx) => {
      return indx < 4;
    })
    .map((el: { key: string; id: number }) => (
      <SwiperSlide key={el.id}>
        <div className="box-video">
          {loading ? (
            <Skeleton width={300} height={300} />
          ) : (
            <ReactPlayer
              style={{ width: "100%" }}
              url={`https://www.youtube.com/watch?v=${el.key}`}
              controls={true}
            />
          )}
        </div>
      </SwiperSlide>
    ));

  const MY_CAST = cast
    .filter((_, indx) => indx < 10)
    .map((el: { name: string; profile_path: string }, indx) => (
      <div className={`item item-${indx + 1}`} key={el.name}>
        {el.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${el.profile_path}`}
            draggable={false}
          />
        ) : (
          <Skeleton circle width={100} height={100} className="Item-skeleton" />
        )}
        <h6>{el.name.slice(0, 10)}...</h6>
      </div>
    ));
  useEffect(() => {
    GET_MOVIE_DETAILS();
    GET_VIDEO();
    THE_CAST();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [MovieID]);

  return (
    <div className="info-details flex justify-center px-3">
      <div
        className="container flex gap-2 p-3 rounded-md"
        style={{
          backgroundImage: `${
            loading
              ? `url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie?.backdrop_path}")`
              : `url("https://image.tmdb.org/t/p/w3840_and_h2160_multi_faces/${movie?.backdrop_path}")`
          }`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <img
          draggable={false}
          src="./Image/watching.png"
          className="watching-tv"
          alt=""
        />
        <div className="image">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt=""
            draggable={false}
          />
        </div>
        <div className="content-right">
          <div className="text-info">
            <h2
              style={
                movie?.original_language === "ar"
                  ? { direction: "rtl" }
                  : { direction: "ltr" }
              }
            >
              {movie?.original_title}
            </h2>
          </div>
          <div className="item flex gap-2 items-center my-2 justify-between">
            <div className="flex gap-2">
              <span className="flex gap-2 items-center">
                <Star size={20} color="#ffc107" />
                {movie?.vote_average?.toFixed(2)}
              </span>
              <span>-</span>
              <div className="date" style={{ opacity: 1 }}>
                {movie?.release_date?.slice(0, 4)}
              </div>
            </div>
            <div className="icons flex gap-2">
              <Link to={`/favourite`} className="flex gap-2 items-center">
                <button
                  className="flex gap-2 items-center"
                  onClick={() => dispatch(ADD_MOVIE_Favourite(MOVIE_CLONE))}
                >
                  <Heart size={17} /> Favourite
                </button>
              </Link>
              <Link
                to={`/watchlist`}
                onClick={() => dispatch(ADD_MOVIE(MOVIE_CLONE))}
                className="btn"
              >
                <button className="flex gap-2 items-center">
                  <Eye size={17} /> WatchList
                </button>
              </Link>
            </div>
          </div>
          <div className="category">Category : {MY_GENERS}</div>
          <p className="discription">
            <span>Desciption : </span> {movie?.overview}
          </p>
          {GENERATE_MOVIE?.length != undefined && (
            <div className="made">Directed By : {GENERATE_MOVIE}</div>
          )}
          {/* Video */}
          {MY_VIDEO.length > 0 && (
            <>
              <h2 className="title">Trailer & Video`s : </h2>
              {/* Video's */}
              <Swiper
                modules={[Scrollbar]}
                spaceBetween={30}
                slidesPerView={3}
                scrollbar={{ draggable: true }}
                className="mt-2"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                }}
              >
                {MY_VIDEO}
              </Swiper>
            </>
          )}
          {/* Cast */}
          <h2 className="title uppercase">Cast : </h2>
          <div className="cast-item">{MY_CAST}</div>
          {/* MOVIE */}
          <Movie
            API={`https://api.themoviedb.org/3/movie/${MovieID}/similar?api_key=82ad1a9e357bc59d597d6b1254ba5ae2`}
            TITLE={
              <h2>
                Another <span>Movie</span> Maybe Like
              </h2>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
