import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
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
    border-bottom: 1px solid #ddd;
    overflow: visible;
  }
  & .Select-clear-zone {
    display: none;
  }
  & .Select-arrow-zone {
    display: none;
  }
  &.is-focused:not(.is-open) > .Select-control {
    border: none;
    border-bottom: 1px solid #ddd;
    box-shadow: none;
  }
  & .Select-value {
    padding-right: 10px !important;
    position: relative !important;
    overflow: visible !important;
  }
  & .Select-input {
    display: none !important;
  }
`;
const Label = styled.div`
  font-weight: 100;
  font-size: 32px;
  font-family: roboto;
  color: #aaa;
`;
const Text = styled.span`
  font-weight: 100;
  font-size: 48px;
  font-family: roboto;
`;

const MOVIE_TYPES = [
  { value: 'latest', label: 'latest' },
  { value: 'topRated', label: 'top-rated' },
  { value: 'mostWatched', label: 'most watched' },
  { value: 'rare', label: 'rare' },
];

const GENRES = [
  { value: 'horror', label: 'horror' },
  { value: 'comedy', label: 'comedy' },
  { value: 'romantic', label: 'romantic' },
  { value: 'action', label: 'action' },
];

const WATCHED_OPTIONS = [
  { value: 'ignore', label: 'Ignore' },
  { value: 'include', label: 'Include' },
];

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: GENRES[0],
      genres: GENRES,
      movieType: MOVIE_TYPES[0],
      movieTypes: MOVIE_TYPES,
      watchedOption: WATCHED_OPTIONS[0],
      watchedOptions: WATCHED_OPTIONS,
    };
  }
  updateGenre = genre => {
    this.setState({ genre });
  }
  updateMovieType = movieType => {
    this.setState({ movieType });
  }
  updateWatchedOption = watchedOption => {
    this.setState({ watchedOption });
  }
  render() {
    return (
      <FormWrapper>
        <Form>
          <Label>What'd like to watch?</Label>
          <Text>I'd like to watch </Text>
          {this.state.genre.value && this.state.genre.value.startsWith('a') ? <Text> an </Text> : <Text> a </Text>}
          <MultiSelect
            name="genre"
            value={this.state.genre}
            options={this.state.genres}
            onChange={this.updateGenre}
            searchable={false}
          />
          <Text> movie.</Text><br />
          <Text>Suggest me some </Text>
          <MultiSelect
            name="movieType"
            value={this.state.movieType}
            options={this.state.movieTypes}
            onChange={this.updateMovieType}
            searchable={false}
          />
          <Text> ones!</Text><br />
          <MultiSelect
            name="movieType"
            value={this.state.watchedOption}
            options={this.state.watchedOptions}
            onChange={this.updateWatchedOption}
            searchable={false}
          />
          <Text>the ones I've watched.</Text>
        </Form>
      </FormWrapper>
    );
  }
}

export default UserForm;
