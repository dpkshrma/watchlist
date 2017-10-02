import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import fetch from 'isomorphic-fetch';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import { LeftChevron, RightChevron } from './chevrons';
import { TMDB_API_KEY, TMDB_POSTER_URL, TMDB_BACKDROP_URL, TMDB_DISCOVER_URL, SORT_MAP } from '../config';

const StyledViewPager = styled(ViewPager)`
  height: 100vh;
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  max-height: 600px;
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
      <StyledViewPager tag="main">
        <Frame className="frame">
          <Track
            ref={c => this.track = c}
            viewsToShow={3}
            infinite
            className="track"
            onViewChange={this.onViewChange}
          >
            {
              this.state.movies.map(movie => (
                <View className="view" key={movie.id}>
                  {
                    movie.posterPath &&
                    <Img src={`${TMDB_POSTER_URL}${movie.posterPath}?api_key=${TMDB_API_KEY}`}/>
                  }
                  {
                    !movie.posterPath &&
                    movie.backdropPath &&
                    <Img src={`${TMDB_BACKDROP_URL}${movie.backdropPath}?api_key=${TMDB_API_KEY}`}/>
                  }
                </View>
              ))
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
      </StyledViewPager>
    );
  }
}

export default SuggestionList;
