const TMDB_API_URL = 'https://api.themoviedb.org/3';
export const TMDB_DISCOVER_URL = `${TMDB_API_URL}/discover/movie`;
export const TMDB_API_KEY = '43ebc6d83fb90584067dc3b4f6d8b723';
export const SORT_MAP = {
  latest: 'release_date.desc',
  mostWatched: 'popularity.desc',
  topRated: 'vote_average.desc',
  rare: 'release_date.asc',
};
const IMG_URL = 'https://image.tmdb.org/t/p';
export const TMDB_POSTER_WIDTH = 342;
export const TMDB_BACKDROP_WIDTH = 300;
export const TMDB_POSTER_URL = `${IMG_URL}/w${TMDB_POSTER_WIDTH}`;
export const TMDB_BACKDROP_URL = `${IMG_URL}/w${TMDB_BACKDROP_WIDTH}`;
export const TMDB_GENRE_URL = `${TMDB_API_URL}/genre/movie/list`;
