import React from 'react';
import '../styles/AddTodoInput.scss';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class AddTodoInput extends React.Component {
  state = { inputText: '', error: false, errorText: '' };

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
      this.setState({
        error: true,
        errorText: 'Todo Text Cannot Be Whitespace or Empty',
        inputText: '',
      });
      setTimeout(() => {
        this.setState({ error: false });
      }, 2000);
      return false;
    }
    return true;
  };

  onInputChange = (event) => {
    this.setState({ inputText: event.target.value });

    if (event.target.value.length > 100) {
      this.setState({ error: true, errorText: 'Todo Text Must Be Less Than 100 Characters' });
    } else {
      this.setState({ error: false, errorText: '' });
    }
  };

  render() {
    const { error, errorText, inputText } = this.state;
    return (
      <Paper elevation={2} component="form" id="add-form" onSubmit={this.onFormSubmit}>
        <TextField
          variant="outlined"
          className="add-input"
          placeholder="What's Your Next Todo?..."
          onChange={this.onInputChange}
          value={inputText}
          required
          error={error}
          helperText={error ? `${errorText}` : null}
          label={inputText ? `${inputText.length}/100` : null}
          InputProps={{
            endAdornment: (
              <InputAdornment type="button" position="end">
                <Button disabled={error} className="add-button" variant="contained" type="submit">
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
