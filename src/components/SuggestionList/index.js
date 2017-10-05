import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import { LeftChevron, RightChevron } from './chevrons';
import {
  TMDB_API_KEY,
  TMDB_POSTER_WIDTH,
  TMDB_BACKDROP_WIDTH,
  TMDB_DISCOVER_URL,
  SORT_MAP
} from '../config';
import { getPosterURL, getBackdropURL } from './helpers';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const StyledLink = styled(Link)`
  font-weight: 100;
  font-family: roboto;
  font-size: 24px;
  text-decoration: none;
  position: absolute;
  color: #ccc;
  top: 40px;
  &:hover {
    color: #55c4cd;
  }
`;
const BackLink = styled(StyledLink)`
  color: #999;
  margin-left: 12px;
`;
const ShareLink = styled(StyledLink)`
  font-size: 32px;
  align-self: center;
`;
const HiddenImg = styled.img`
  max-height: 600px;
  visibility: hidden;
`;
const Poster = styled.div`
  background: ${({ bgURL }) => `url(${bgURL})`};
  width: ${({width}) => `${width}px`};
`;
const PosterButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  color: #aaa;
  text-align: center;
  font-family: roboto;
  font-weight: 300;
  font-size: 24px;
  background: rgba(0,0,0,0.7);
  &:hover {
    background: rgba(85, 196, 205, 0.5);
    color: #fff;
  }
  padding: 12px;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
  border: none;
  outline: none;
  cursor: ${({ onWatchlist }) => onWatchlist ? 'not-allowed' : 'pointer' };
`;
const AddButton = styled(PosterButton)`
  width: ${({ maxWidth }) => `${maxWidth}px`};
  ${'' /* width: ${({ maxWidth }) => `${0.20*maxWidth}px`};
  &:hover {
    width: ${({ maxWidth }) => `${0.80*maxWidth}px`};
  } */}
`;
const WatchedButton = styled(PosterButton)`
  left: ${({ maxWidth }) => `${0.20*maxWidth}px`};
  width: ${({ maxWidth }) => `${0.80*maxWidth}px`};
  &:hover {
    width: ${({ maxWidth }) => `${0.20*maxWidth}px`};
  }
`;
const NavLink = styled.a`
  cursor: pointer;
  color: #bbb;
  font-size: 180px;
  font-family: roboto;
  font-weight: 100;
  position: absolute;
  top: 35vh;
`;
const WatchList = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-bottom: ${({ numItems }) => numItems>0 ? '-140px' : '0' };
  ${({ overflow }) => !overflow && 'justify-content: center;'}
`;
const WatchMovieImg = styled.img`
  margin-right: 16px;
  margin-top: 20px;
  max-height: 120px;
`;

class SuggestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      watchlist: [],
      watchlistOverflow: false,
      watchlistItemWidth: 'xxsmall'
    };
  }
  componentWillMount() {
    this.fetchMovies()
      .then(({ page, movies }) => {
        // TODO fetch watchlist from localstorage
        let watchlist = localStorage.getItem('watchlist');
        if (watchlist) {
          watchlist = JSON.parse(watchlist);
        } else {
          watchlist = [];
        }
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
  formatDate = dateObject => {
    // TODO write a generic version
    return `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()}`;
  }
  fetchMovies = () => {
    const queryParams = queryString.parse(window.location.search);
    const discoverQueryString = queryString.stringify({
      api_key: TMDB_API_KEY,
      sort_by: queryParams.sort_by && SORT_MAP[queryParams.sort_by],
      with_genres: queryParams.genreId,
      language: 'en-US',
      'primary_release_date.lte': this.formatDate(new Date()),
    });
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
  }
  isWatchlistOverflowing = () => {
    const numWatchList = this.state.watchlist.length;
    const scrollWidth = numWatchList*(16+TMDB_POSTER_WIDTH[this.state.watchlistItemWidth]);
    return (scrollWidth > this.watchlist.clientWidth);
  }
  addToLocalStorage = movie => {
    let watchlist = localStorage.getItem('watchlist');
    if (watchlist) {
      watchlist = JSON.parse(watchlist);
    } else {
      watchlist = [];
    }
    watchlist.push(movie);
    const serializedWatchlist = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', serializedWatchlist);
  }
  addToWatchList = movieIndex => {
    // TODO add movie to localstorage
    const movie = this.state.movies[movieIndex];
    this.setState({
      watchlist: [...this.state.watchlist, movie],
      watchlistOverflow: this.isWatchlistOverflowing(),
    }, () => this.addToLocalStorage(movie));
  }
  render() {
    return (
      <Wrapper>
        <BackLink to="/">{'<'} Back</BackLink>
        <ShareLink to="/">
          Share watchlist
        </ShareLink>
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
        <WatchList
          innerRef={(comp) => { this.watchlist = comp }}
          numItems={this.state.watchlist.length}
          {...this.state.watchlistOverflow && {overflow: 'overflow'}}
        >
          {
            this.state.watchlist.map(
              movie => {
                const imgURL = `${getPosterURL(this.state.watchlistItemWidth)}${movie.posterPath}?api_key=${TMDB_API_KEY}`;
                return <WatchMovieImg src={imgURL} key={movie.id} />;
              }
            )
          }
        </WatchList>
      </Wrapper>
    );
  }
}

export default SuggestionList;
