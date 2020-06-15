import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import '../styles/SearchTodoTextField.scss';

class SearchTodoTextField extends React.Component {
  state = { searchTerm: '' };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;

    if (searchTerm.trim() !== '') {
      this.props.onSearch(searchTerm);
    }
  };

  onInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  onClearClick = () => {
    this.setState({ searchTerm: '' });
    this.props.onClearSearch();
  };

  render() {
    return (
      <form id="search-todo" onSubmit={this.onFormSubmit}>
        <TextField
          fullWidth
          label="Search Todos"
          variant="outlined"
          value={this.state.searchTerm}
          onChange={this.onInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment type="button" position="end">
                <IconButton onClick={this.onClearClick}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    );
  }
}

export default SearchTodoTextField;
