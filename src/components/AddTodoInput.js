import React from 'react';
import '../styles/AddTodoInput.scss';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class AddTodoInput extends React.Component {
  state = { inputText: '' };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onFormSubmit(this.state.inputText);
    this.setState({ inputText: '' });
  };

  onInputChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  render() {
    return (
      <Paper elevation={2} component="form" id="add-form" onSubmit={this.onFormSubmit}>
        <TextField
          variant="outlined"
          className="add-input"
          placeholder="What's Your Next Todo?..."
          onChange={this.onInputChange}
          value={this.state.inputText}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment className="tester" type="button" position="end">
                <Button className="add-button" variant="contained" type="submit">
                  Submit
                  <LibraryAddIcon fontSize="large" />
                </Button>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Paper>
    );
  }
}

export default AddTodoInput;
