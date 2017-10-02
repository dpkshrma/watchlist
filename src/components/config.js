const TMDB_API_URL = 'https://api.themoviedb.org/3';
export const TMDB_DISCOVER_URL = `${TMDB_API_URL}/discover/movie`;
export const TMDB_API_KEY = '43ebc6d83fb90584067dc3b4f6d8b723';
export const SORT_MAP = {
  latest: 'release_date.desc',
  mostWatched: 'popularity.desc',
  topRated: 'vote_average.desc',
  rare: 'release_date.asc',
};
export const TMDB_POSTER_URL = `https://image.tmdb.org/t/p/w342`;
export const TMDB_BACKDROP_URL = `https://image.tmdb.org/t/p/w342`;
export const TMDB_GENRE_URL = `${TMDB_API_URL}/genre/movie/list`;
