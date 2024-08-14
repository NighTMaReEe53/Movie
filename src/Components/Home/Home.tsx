import Movie from "../Movies/Movie";

const Home = () => {
  return (
    <div className="main-app">
      <img src="./Image/main.png" className="main-img" alt="" />
      <Movie
        NEED={true}
        TITLE={
          <h2>
            Trending <span>This Week</span>{" "}
          </h2>
        }
        TYPE_MOVIE="Popular"
        API="https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=82ad1a9e357bc59d597d6b1254ba5ae2"
      />
      <Movie
        NEED={true}
        TITLE={
          <h2>
            Now Playing <span>Movie's</span>{" "}
          </h2>
        }
        TYPE_MOVIE="Popular"
        API="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1?&api_key=82ad1a9e357bc59d597d6b1254ba5ae2"
      />
      <Movie
        NEED={true}
        TITLE={
          <h2>
            Top Rated <span>Movie's</span>{" "}
          </h2>
        }
        TYPE_MOVIE="Popular"
        API="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=82ad1a9e357bc59d597d6b1254ba5ae2"
      />
      <Movie
        NEED={true}
        TITLE={
          <h2>
            UP Coming <span>Movie's</span>{" "}
          </h2>
        }
        TYPE_MOVIE="Popular"
        API="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=82ad1a9e357bc59d597d6b1254ba5ae2"
      />
      <Movie
        NEED={true}
        TITLE={
          <h2>
            Arabic <span>Movie's</span>{" "}
          </h2>
        }
        TYPE_MOVIE="Popular"
        API="https://api.themoviedb.org/3/discover/movie?api_key=82ad1a9e357bc59d597d6b1254ba5ae2&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2024&with_original_language=ar"
      />
    </div>
  );
};

export default Home;
