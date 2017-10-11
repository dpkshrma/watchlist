import React from 'react';
import queryString from 'query-string';
import fetch from 'isomorphic-fetch';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import { LeftChevron, RightChevron } from './chevrons';
import {
  TMDB_API_KEY,
  TMDB_POSTER_WIDTH,
  TMDB_BACKDROP_WIDTH,
  TMDB_DISCOVER_URL,
  TMDB_MOVIE_URL,
  WEB_APP_URL,
  TWITTER_SHARE_URL,
  SORT_MAP
} from '../../config';
import { getPosterURL, getBackdropURL } from './helpers';
import {
  Wrapper,
  BackLink,
  ShareLink,
  HiddenImg,
  Poster,
  AddButton,
  NavLink,
  Watchlist,
  WatchlistBackdrop,
  WatchlistItem,
  MovieThumb,
  Cross,
} from './styled';

class SuggestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      movies: [],
      watchlist: [],
      watchlistOverflow: false,
      watchlistItemWidth: 'xxsmall',
    };
  }
  componentWillMount() {
    const queryParams = queryString.parse(window.location.search);
    const watchlist = this.getFromLocalStorage();
    if (queryParams.movies) {
      const movieIds = queryParams.movies.split(',');
      movieIds.map(movieId => {
        const url = `${TMDB_MOVIE_URL}/${movieId}?api_key=${TMDB_API_KEY}`;
        return fetch(url)
          .then(response => response.json())
          .then(({ poster_path, backdrop_path, id, title, release_date, overview }) => {
            this.setState({
              watchlist,
              movies: [
                ...this.state.movies,
                {
                  posterPath: poster_path,
                  backdropPath: backdrop_path,
                  id,
                  title,
                  releaseDate: release_date,
                  overview,
                }
              ]
            })
          })
      })
    } else {
      this.discoverMovies()
        .then(({ page, movies }) => {
          this.setState({
            page,
            movies,
            watchlist,
          }, () => {
            this.setState({
              watchlistOverflow: this.isWatchlistOverflowing(),
            });
          });
        });
    }
  }
  formatDate = dateObject => {
    // TODO write a generic version
    return `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()}`;
  }
  discoverMovies = nextPage => {
    const queryParams = queryString.parse(window.location.search);
    const discoverQueryParams = {
      api_key: TMDB_API_KEY,
      sort_by: queryParams.sort_by && SORT_MAP[queryParams.sort_by],
      with_genres: queryParams.genreId,
      language: 'en-US',
      'primary_release_date.lte': this.formatDate(new Date()),
    };
    if (nextPage) {
      discoverQueryParams.page =  nextPage;
    }
    const discoverQueryString = queryString.stringify(discoverQueryParams);
    const url = `${TMDB_DISCOVER_URL}?${discoverQueryString}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return {
          page: data.page,
          totalResults: data.total_results,
          totalPages: data.total_pages,
          movies: data.results
            .filter(movie => (movie.poster_path || movie.backdrop_path))
            .map(({ poster_path, backdrop_path, id, title, release_date, overview }) => {
              return {
                posterPath: poster_path,
                backdropPath: backdrop_path,
                id,
                title,
                releaseDate: release_date,
                overview,
              };
            })
        }
      });
  }
  onViewChange = currentViewIndices => {
    const [lastViewIndex] = currentViewIndices.slice(-1);
    if (lastViewIndex===this.state.movies.length-1) {
      // load more movies
      this.discoverMovies(this.state.page + 1)
        .then(({ page, movies }) => {
          this.setState({ page, movies: [...this.state.movies, ...movies] });
        });
    }
  }
  isWatchlistOverflowing = () => {
    const numWatchList = this.state.watchlist.length;
    const scrollWidth = numWatchList*(16+TMDB_POSTER_WIDTH[this.state.watchlistItemWidth]);
    return (scrollWidth > this.watchlist.clientWidth);
  }
  getFromLocalStorage = () => {
    const watchlist = localStorage.getItem('watchlist');
    if (watchlist) {
      return JSON.parse(watchlist);
    }
    return [];
  }
  addToLocalStorage = movie => {
    const watchlist = this.getFromLocalStorage();
    watchlist.push(movie);
    const serializedWatchlist = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', serializedWatchlist);
  }
  removeFromLocalStorage = movieId => {
    let watchlist = this.getFromLocalStorage();
    watchlist = watchlist.filter(movie => movie.id !== movieId);
    const serializedWatchlist = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', serializedWatchlist);
  }
  addToWatchList = movieIndex => {
    const movie = this.state.movies[movieIndex];
    this.setState({
      watchlist: [...this.state.watchlist, movie],
      watchlistOverflow: this.isWatchlistOverflowing(),
    }, () => this.addToLocalStorage(movie));
  }
  removeFromWatchlist = movieId => {
    this.setState({
      watchlist: [...this.state.watchlist.filter(m => m.id !== movieId)],
      watchlistOverflow: this.isWatchlistOverflowing(),
    }, () => this.removeFromLocalStorage(movieId));
  }
  getShareURL = () => {
    const shareText = `Check out ${this.state.watchlist.length} movies on my watchlist:`;
    const movieIds = this.state.watchlist.map(m => m.id).join(',');
    const listURL = encodeURI(`${WEB_APP_URL}/list?movies=${movieIds}`);
    const shareURL = `${TWITTER_SHARE_URL}?text=${shareText}&url=${listURL}`;
    return shareURL;
  }
  render() {
    return (
      <Wrapper>
        <BackLink to="/">{'<'} Back</BackLink>
        <ShareLink href={this.getShareURL()} target="_blank">Share watchlist</ShareLink>
        <ViewPager tag="main">
          <Frame className="frame">
            <Track
              ref={c => this.track = c}
              viewsToShow={3}
              infinite
              className="track"
              onViewChange={this.onViewChange}
            >
              {
                this.state.movies
                  .filter(movie => movie.posterPath || movie.backdropPath)
                  .map((movie, movieIndex) => {
                    let imgURL, posterWidth=TMDB_POSTER_WIDTH.medium;
                    if (movie.posterPath) {
                      imgURL = `${getPosterURL('medium')}${movie.posterPath}?api_key=${TMDB_API_KEY}`;
                    } else if (movie.backdropPath) {
                      posterWidth=TMDB_BACKDROP_WIDTH.medium;
                      imgURL = `${getBackdropURL('medium')}${movie.backdropPath}?api_key=${TMDB_API_KEY}`;
                    }
                    const onWatchlist = this.state.watchlist.map(m => m.id).indexOf(movie.id) !== -1;
                    return (
                      <View className="view" key={movie.id} style={{ position: 'relative' }}>
                        <Poster bgURL={imgURL} width={posterWidth}>
                          <HiddenImg src={imgURL} />
                          <AddButton
                            maxWidth={posterWidth}
                            onClick={() => this.addToWatchList(movieIndex)}
                            disabled={onWatchlist}
                            onWatchlist={onWatchlist}
                          >
                            {
                              !onWatchlist ?
                              'Add to Watch list' :
                              'On the watch!'
                            }
                          </AddButton>
                        </Poster>
                      </View>
                    );
                  })
              }
              {
                this.state.movies.length===0 &&
                <View className="view"></View>
              }
            </Track>
          </Frame>
          <nav className="pager-controls">
            <NavLink
              className="pager-control pager-control--prev"
              onClick={() => this.track.prev()}
              style={{ left: 12 }}
            >
              <LeftChevron />
            </NavLink>
            <NavLink
              className="pager-control pager-control--next"
              onClick={() => this.track.next()}
              style={{ right: 12 }}
            >
              <RightChevron />
            </NavLink>
          </nav>
        </ViewPager>
        <Watchlist
          innerRef={(comp) => { this.watchlist = comp }}
          numItems={this.state.watchlist.length}
          {...this.state.watchlistOverflow && {overflow: 'overflow'}}
        >
          <WatchlistBackdrop>WATCHLIST</WatchlistBackdrop>
          {
            this.state.watchlist.map(
              movie => {
                const imgURL = `${getPosterURL(this.state.watchlistItemWidth)}${movie.posterPath}?api_key=${TMDB_API_KEY}`;
                return (
                  <WatchlistItem key={movie.id}>
                    <MovieThumb src={imgURL} />
                    <Cross onClick={() => this.removeFromWatchlist(movie.id)}>
                      x
                    </Cross>
                  </WatchlistItem>
                );
              }
            )
          }
        </Watchlist>
      </Wrapper>
    );
  }
}

export default SuggestionList;
