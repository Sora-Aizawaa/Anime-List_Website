import axios from "axios";

export const getMovieList = async () => {
  const movie = await axios.get("https://api.jikan.moe/v4/top/anime");
  // console.log({ movieList: movie });
  return movie.data.data;
};

export const searchMovie = async (query) => {
  const search = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
  return search.data.data;
};
