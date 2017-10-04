import { IMG_URL, TMDB_POSTER_WIDTH, TMDB_BACKDROP_WIDTH } from '../config';

export const getPosterURL = size => {
  if (Object.keys(TMDB_POSTER_WIDTH).indexOf(size) === -1) {
    throw new Error('Unsupported poster size');
  }
  return `${IMG_URL}/w${TMDB_POSTER_WIDTH[size]}`;
};

export const getBackdropURL = size => {
  if (Object.keys(TMDB_BACKDROP_WIDTH).indexOf(size) === -1) {
    throw new Error('Unsupported backdrop size');
  }
  return `${IMG_URL}/w${TMDB_BACKDROP_WIDTH[size]}`;
};
