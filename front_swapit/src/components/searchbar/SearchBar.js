import React from 'react';
import './SearchBar.css';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';



class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      terms: []
    };
  }
  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/search/{name}`)
      .then(res => {
       // console.log(res);
        this.setState({
          isLoaded: true,
          terms: res.terms
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      })
  }
  onInputChange(terms) {
    const name = this.props.searchBoxName || undefined
    this.setState({ terms });
    if (this.props.onSearchTermChange) {
      this.props.onSearchTermChange({ name, terms })
    }
  }
  searchResult() {
    const result = this.state.terms
    console.log(result);
  }

  render() {
    const { error, isLoaded, terms, name } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="search-box">
          <TextField
            terms={terms}
            variant="outlined"
            name={name}
            className="search-input"
            id="search"
            type="text"
            placeholder="Search..."
            value={this.state.terms}
            onChange={event => this.onInputChange(event.target.value)}
            onKeyPress={this.props.onKeyPress || null}

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Button
                    onClick={() => this.searchResult()}
                    startIcon={<SearchIcon />}>
                  </Button>
                </InputAdornment>
              )
            }}
          />
        </div>
      );
    }
  }
}

export default SearchBar;