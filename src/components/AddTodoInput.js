import React from 'react';
import '../styles/AddTodoInput.scss';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class AddTodoInput extends React.Component {
  state = { inputText: '', error: false };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { inputText } = this.state;

    if (this.validateInput(inputText)) {
      this.props.onFormSubmit(inputText);
      this.setState({ inputText: '' });
    }
  };

  validateInput = (input) => {
    if (input.trim().length === 0) {
      this.setState({ error: true, inputText: '' });
      setTimeout(() => {
        this.setState({ error: false });
      }, 2000);
      return false;
    }
    return true;
  };

  onInputChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  render() {
    const { error } = this.state;
    return (
      <Paper elevation={2} component="form" id="add-form" onSubmit={this.onFormSubmit}>
        <TextField
          variant="outlined"
          className="add-input"
          placeholder="What's Your Next Todo?..."
          onChange={this.onInputChange}
          value={this.state.inputText}
          required
          error={error}
          helperText={error ? 'Todo Text Cannot Be Whitespace or Empty' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment type="button" position="end">
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
