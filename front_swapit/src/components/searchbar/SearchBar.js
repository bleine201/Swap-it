import React from 'react';
import './SearchBar.css';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
  }
  onInputChange(term) {
    const name = this.props.searchBoxName || undefined
    this.setState({ term });
    if (this.props.onSearchTermChange) {
      this.props.onSearchTermChange({ name, term })
    }
  }
  searchResult() {
    const result = this.state.term
    //console.log(result);
  }

  render() {
    const name = this.props.searchBoxName || undefined
    return (
      <div className="search-box">
        <TextField
          variant="outlined"
          name={name}
          className="search-input"
          id="search"
          type="text"
          placeholder="Search..."
          value={this.state.term}
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

export default SearchBar;