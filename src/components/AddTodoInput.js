import React from 'react';
import '../styles/AddTodoInput.scss';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

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
        <InputBase
          className="input-base"
          placeholder="What is your Next Todo?..."
          onChange={this.onInputChange}
          value={this.state.inputText}
          required
        ></InputBase>
        <Button className="add-button" variant="contained" type="submit">
          Submit
          <LibraryAddIcon fontSize="large" />
        </Button>
      </Paper>
    );
  }
}

export default AddTodoInput;
