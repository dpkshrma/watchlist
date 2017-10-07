import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import queryString from 'query-string';
import PlayIcon from './PlayIcon';
import { TMDB_API_KEY, TMDB_GENRE_URL } from '../../config';

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  color: #bbb;
`;
const Form = styled.form`
  margin-top: -160px;
  text-align: center;
  line-height: 2;
`;
const MultiSelect = styled(Select)`
  line-height: 1;
  &.Select {
    outline: none;
    display: inline-flex;
    font-size: 40px;
    font-weight: 100;
    font-family: roboto;
    border: none;
    min-width: 200px;
  }
  & .Select-control {
    border: none;
    border-bottom: 1px solid #55c4cd;
    border-radius: 0;
    overflow: visible;
    background: transparent;
  }
  & .Select-clear-zone {
    display: none;
  }
  & .Select-arrow-zone {
    display: none;
  }
  &.is-focused:not(.is-open) > .Select-control {
    border: none;
    border-bottom: 1px solid #55c4cd;
    box-shadow: none;
  }
  & .Select-value {
    padding-right: 10px !important;
    position: relative !important;
    overflow: visible !important;
  }
  & .Select-value-label {
    color: #bbb !important;
  }
  & .Select-input {
    display: none !important;
  }
`;
const Label = styled.div`
  font-weight: 100;
  font-size: 32px;
  font-family: roboto;
  color: #999;
`;
const Text = styled.span`
  font-weight: 100;
  font-size: 48px;
  font-family: roboto;
`;
const Icon = styled.i`
  cursor: pointer;
`;

const MOVIE_TYPES = [
  { value: 'latest', label: 'latest' },
  { value: 'topRated', label: 'top-rated' },
  { value: 'mostWatched', label: 'most watched' },
  { value: 'rare', label: 'rare' },
];

const DEFAULT_GENRES = [
  { value: 27, label: 'horror' },
  { value: 35, label: 'comedy' },
  { value: 10749, label: 'romantic' },
  { value: 28, label: 'action' },
];

const WATCHED_OPTIONS = [
  { value: false, label: 'Ignore' },
  { value: true, label: 'Include' },
];

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: DEFAULT_GENRES[0],
      genres: DEFAULT_GENRES,
      movieType: MOVIE_TYPES[2],
      movieTypes: MOVIE_TYPES,
      includeWatched: WATCHED_OPTIONS[0],
      watchedOptions: WATCHED_OPTIONS,
    };
  }
  componentWillMount() {
    this.getGenres()
      .then(genres => {
        let genre = null;
        if (genres.length > 0) {
          genre = genres[0];
          this.setState({ genres, genre });
        }
      });
  }
  updateGenre = genre => {
    this.setState({ genre });
  }
  updateMovieType = movieType => {
    this.setState({ movieType });
  }
  updateWatchedOption = includeWatched => {
    this.setState({ includeWatched });
  }
  getGenres = () => {
    return fetch(`${TMDB_GENRE_URL}?api_key=${TMDB_API_KEY}`)
      .then(response => response.json())
      .then(({ genres=[] }) => {
        return genres.map(({ id, name }) => ({ value: id, label: name }));
      });
  }
  startsWithVowel = (text='') => {
    if (text.length === 0) {
      return false;
    }
    const [firstChar] = text;
    return ['a', 'e', 'i', 'o', 'u'].indexOf(firstChar.toLowerCase()) !== -1;
  }
  render() {
    const {
      genre={},
      genres=[],
      movieType={},
      movieTypes=[],
      includeWatched={},
      watchedOptions=[]
    } = this.state;

    const listQueryString = queryString.stringify({
      genreId: genre && genre.value,
      sort_by: movieType.value,
      include_watched: includeWatched.value,
    });

    return (
      <FormWrapper>
        <Form>
          <Label>What'd like to watch?</Label>
          <Text>I'd like to watch </Text>
          {this.startsWithVowel(genre.label) ? <Text> an </Text> : <Text> a </Text>}
          <MultiSelect
            name="genre"
            value={genre}
            options={genres}
            onChange={this.updateGenre}
            searchable={false}
          />
          <Text> movie.</Text><br />
          <Text>Suggest me some </Text>
          <MultiSelect
            name="movieType"
            value={movieType}
            options={movieTypes}
            onChange={this.updateMovieType}
            searchable={false}
          />
          <Text> ones!</Text><br />
          {/* <MultiSelect
            name="movieType"
            value={includeWatched}
            options={watchedOptions}
            onChange={this.updateWatchedOption}
            searchable={false}
          />
          <Text>the ones I've watched.</Text>
          <br /> */}
          <Link to={`list?${listQueryString}`}>
            <Icon>
              <PlayIcon width="64px" />
            </Icon>
          </Link>
        </Form>
      </FormWrapper>
    );
  }
}

export default UserForm;
