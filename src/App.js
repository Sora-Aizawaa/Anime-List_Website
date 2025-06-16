import "./App.css";
import { getMovieList, searchMovie } from "./Api.js";
import { useEffect, useState } from "react";

const App = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    getMovieList().then((data) => {
      setAnimeList(data);
    });
  }, []);

  const BestAnimeList = () => {
    return animeList.map((anime, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{anime.title}</div>
          <img
            className="Movie-image"
            src={anime.images.jpg.image_url}
            alt="Movie Poster"
          />
          <div className="Movie-episode">Episodes: {anime.episodes} Ep</div>
          <div className="Movie-rate">Anime Score: {anime.score}</div>
          <div className="Movie-trailers">
            {anime.trailer?.embed_url ? (
              <a
                href={anime.trailer.embed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 underline"
              >
                Trailers Video
              </a>
            ) : (
              <span className="text-gray-500 italic">
                Trailers Video: Empty
              </span>
            )}
          </div>
        </div>
      );
    });
  };

  console.log({ animeList: animeList });

  let debounceTimeout;

  const search = (r) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      if (r.length > 2) {
        const query = await searchMovie(r);
        setAnimeList(query);
      } else {
        const data = await getMovieList(); // tampilkan semua kalau input kosong
        setAnimeList(data);
      }
    }, 500); // delay 500ms
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ANIME LIST WEBSITE </h1>
        <input
          placeholder="Search Movie..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <BestAnimeList />
        </div>
      </header>
    </div>
  );
};

export default App;
