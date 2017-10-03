import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import { LeftChevron, RightChevron } from './chevrons';
import {
  TMDB_API_KEY,
  TMDB_POSTER_URL,
  TMDB_BACKDROP_URL,
  TMDB_POSTER_WIDTH,
  TMDB_BACKDROP_WIDTH,
  TMDB_DISCOVER_URL,
  SORT_MAP
} from '../config';

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
  max-height: 600px;
  background: ${({ bgURL }) => `url(${bgURL})`};
  width: ${({width}) => `${width}px`};
`;
const Button = styled.div`
  position: absolute;
  bottom: 0;
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
  cursor: pointer;
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
`;
const AddButton = styled(Button)`
  width: ${({ maxWidth }) => `calc(${maxWidth}px - 24px)`};
  ${'' /* width: ${({ maxWidth }) => `${0.20*maxWidth}px`};
  &:hover {
    width: ${({ maxWidth }) => `${0.80*maxWidth}px`};
  } */}
`;
const WatchedButton = styled(Button)`
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

class SuggestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }
  componentWillMount() {
    this.fetchMovies()
      .then(({ page, movies }) => {
        this.setState({ page, movies });
      });
  }
  formatDate = dateObject => {
    // TODO: write a generic version
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
            .filter(movie => {
              return (movie.poster_path || movie.backdrop_path);
            })
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
                  .map(movie => {
                    let imgURL, posterWidth=TMDB_POSTER_WIDTH;
                    if (movie.posterPath) {
                      imgURL = `${TMDB_POSTER_URL}${movie.posterPath}?api_key=${TMDB_API_KEY}`;
                    } else if (movie.backdropPath) {
                      posterWidth=TMDB_BACKDROP_WIDTH;
                      imgURL = `${TMDB_BACKDROP_URL}${movie.backdropPath}?api_key=${TMDB_API_KEY}`;
                    }
                    return (
                      <View className="view" key={movie.id} style={{ position: 'relative' }}>
                        <Poster bgURL={imgURL} width={posterWidth}>
                          <HiddenImg src={imgURL} />
                          <AddButton maxWidth={posterWidth}>Add to Watch list</AddButton>
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
      </Wrapper>
    );
  }
}

export default SuggestionList;
