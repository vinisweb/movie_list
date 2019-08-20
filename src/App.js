import React, { Component } from 'react';
import movie from './assets/data.js';
// import Group from "./components/Group/group.js";
import Movie from './components/Movie/movie.js';
import Dropdown from 'react-dropdown';
import { Link } from 'react-router-dom';
import 'react-dropdown/style.css';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      value: '',
      checked: false,
      uniqueRated: null,
      uniqueGenre: null,
      isSelectedGenre: null,
      isSelectedRated: null,
      uniqueType: null,
      defaultType: null
    };
  }

  componentDidMount() {
    this.setState({ movies: movie });
    this.prepareData();
  }

  componentDidUpdate() {
    this.prepareData();
  }

  handleRatedChange(index) {
    const movies = this.state.movies;
    let rated = movies.map(rate => rate.rated);
    let uniqueRated = [...new Set(rated)];
    let isSelectedRated = this.state.isSelectedRated;
    for (let i = 0; i < uniqueRated.length; i++) {
      isSelectedRated[i] = false;
    }
    isSelectedRated[index] = true;
    this.setState({
      isSelectedRated: isSelectedRated
    });
  }

  handleGenreChange(index) {
    let isSelectedGenre = this.state.isSelectedGenre;
    isSelectedGenre[index] = !isSelectedGenre[index];
    this.setState({
      isSelectedGenre: isSelectedGenre
    });
  }

  prepareData() {
    const movies = this.state.movies;

    let type = movies.map(typ => typ.type);
    let rated = movies.map(rate => rate.rated);
    let genre = movies.map(gen => gen.genre);
    let genreArray = genre.flat(1);

    let uniqueRated = [...new Set(rated)];
    let uniqueGenre = [...new Set(genreArray)];
    let uniqueType = [...new Set(type)];
    let defaultType = uniqueType[0];

    if (
      JSON.stringify(uniqueRated) !== JSON.stringify(this.state.uniqueRated) ||
      JSON.stringify(uniqueGenre) !== JSON.stringify(this.state.uniqueGenre) ||
      JSON.stringify(uniqueType) !== JSON.stringify(this.state.uniqueType) ||
      JSON.stringify(defaultType) !== JSON.stringify(this.state.defaultType)
    ) {
      let isSelectedGenre = uniqueGenre.map(it => false);
      let isSelectedRated = uniqueRated.map(it => false);

      this.setState({
        uniqueRated: uniqueRated,
        uniqueGenre: uniqueGenre,
        isSelectedGenre: isSelectedGenre,
        isSelectedRated: isSelectedRated,
        uniqueType: uniqueType,
        defaultType: defaultType
      });
    }
  }

  render() {
    const movies = this.state.movies;
    const uniqueRated = this.state.uniqueRated;
    const uniqueGenre = this.state.uniqueGenre;
    const uniqueType = this.state.uniqueType;
    const defaultType = this.state.defaultType;
    const isSelectedGenre = this.state.isSelectedGenre;
    const isSelectedRated = this.state.isSelectedRated;

    let prod = '';
    let rate2 = '';
    let gen2 = '';
    //let xx = '';

    if (uniqueRated && uniqueRated.length > 0) {
      rate2 = uniqueRated.map((r, i) => {
        return (
          <span key={r}>
            <div className='form-check-rated'>
              <label>
                <input
                  type='radio'
                  name='react-tips'
                  value='{r}'
                  checked={this.state.isSelectedRated[i]}
                  onChange={() => this.handleRatedChange(i)}
                  className='form-check-input'
                />
                {r}
              </label>
            </div>
          </span>
        );
      });
    }

    console.log(isSelectedRated);

    if (uniqueGenre && uniqueGenre.length > 0) {
      gen2 = uniqueGenre.map((g, i) => {
        return (
          <span key={g}>
            <div className='form-check-genre'>
              <label>
                <input
                  type='checkbox'
                  name='react-tips'
                  value='{g}'
                  checked={this.state.isSelectedGenre[i]}
                  onChange={() => this.handleGenreChange(i)}
                  className='form-check-input'
                />
                {g}
              </label>
            </div>
          </span>
        );
      });
    }

    if (movies && movies.length > 0) {
      let selectedGenres = uniqueGenre.filter((it, i) => isSelectedGenre[i]);
      let ratedMovies = uniqueRated.filter((it, i) => isSelectedRated[i]);

      console.log(ratedMovies);
      console.log(movies);

      const filteredMovies = movies.filter(it => it.rated === ratedMovies);

      console.log(filteredMovies);

      const finalMovies = movies.filter(it => {
        for (let i = 0; i < selectedGenres.length; i++) {
          let genreFound = it.genre.find(g => g === selectedGenres[i]);
          if (genreFound) return true;
        }
        return false;
      });

      console.log(finalMovies);

      if (finalMovies.length > 0) {
        prod = finalMovies.map(film => {
          return (
            <Movie
              key={film.title}
              title={film.title}
              year={film.year}
              plot={film.plot}
            />
          );
        });
      } else {
        prod = movies.map(film => {
          return (
            <Movie
              key={film.title}
              title={film.title}
              year={film.year}
              plot={film.plot}
            />
          );
        });
      }
    }

    return (
      <>
        <div className='dashboard'>
          <div className='options col-sm-6'>
            <form>
              <div>
                <h3>Type:</h3>
                <Dropdown
                  options={uniqueType}
                  value={defaultType}
                  placeholder='Select'
                />
              </div>
              <div>
                <h3>Rated:</h3>
                {rate2}
              </div>
              <div>
                <h3>Genre:</h3>
                {gen2}
              </div>
            </form>
          </div>

          <div className='view col-sm-6'>
            <div className='groups'>
              <Link to={{ pathname: '/group' }}>Pogledaj</Link>
            </div>
            <div className='movies'>
              <h3>Movies:</h3>
              {prod}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default App;
