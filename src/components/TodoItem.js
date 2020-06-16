import React from 'react';
import { ListItem, ListItemText, Button, Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import '../styles/TodoItem.scss';

class TodoItem extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    selectedItem: '',
    completedItem: '',
    mouseOver: false,
    mode: 'view',
    newTodoText: '',
  };

  componentDidMount() {
    const { todoItem } = this.props;

    this.setState({
      newTodoText: todoItem.text,
      completedItem: todoItem.isComplete ? 'completed-item' : '',
    });
  }

  onMenuClick = (event) => {
    this.setState({ anchorEl: event.target, selectedItem: 'selected-item' });
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null, selectedItem: '' });
  };

  onMoveUpClick = () => {
    this.props.onMoveUp(this.props.todoItem);
    this.onMenuClose();
  };

  onMoveDownClick = () => {
    this.props.onMoveDown(this.props.todoItem);
    this.onMenuClose();
  };

  onMoveToTopClick = () => {
    this.props.onMoveToTop(this.props.todoItem);
    this.onMenuClose();
  };

  onMoveToBottomClick = () => {
    this.props.onMoveToBottom(this.props.todoItem);
    this.onMenuClose();
  };

  renderCompleteIcon = () => {
    const { todoItem, onTodoComplete } = this.props;

    if (!todoItem.isComplete) {
      return (
        <>
          <Button className="complete-button" onClick={() => onTodoComplete(todoItem)}>
            <DoneIcon fontSize="large" className="done-icon" />
          </Button>
          <Divider orientation="vertical" flexItem />
        </>
      );
    }
  };

  renderMoreMenu = () => {
    const { todoItem } = this.props;

    if (!todoItem.isComplete) {
      return (
        <>
          <Button onClick={this.onMenuClick}>
            <MoreVertIcon fontSize="large" color="primary" className="menu-icon" />
          </Button>
          <Menu
            keepMounted
            onClose={this.onMenuClose}
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
          >
            <MenuItem onClick={this.onMoveToTopClick}>Move To Top</MenuItem>
            <MenuItem onClick={this.onMoveUpClick}>Move Up</MenuItem>
            <MenuItem onClick={this.onMoveDownClick}>Move Down</MenuItem>
            <MenuItem onClick={this.onMoveToBottomClick}>Move To Bottom</MenuItem>
          </Menu>
        </>
      );
    }
  };

  renderInputField = () => {
    const { mode, mouseOver, newTodoText } = this.state;
    const { todoItem } = this.props;

    if (mode === 'view') {
      return (
        <>
          <ListItemText primary={todoItem.text} className="todo-text" />
          {!todoItem.isComplete && mouseOver ? (
            <IconButton className="edit-button" onClick={this.onEditIconClick}>
              <Edit />
            </IconButton>
          ) : (
            ''
          )}
        </>
      );
    } else if (mode === 'edit')
      return (
        <>
          <TextField
            fullWidth
            multiline
            value={newTodoText}
            onChange={this.onInputChange}
            className="todo-input"
          />
          {!todoItem.isComplete && mouseOver ? (
            <IconButton className="edit-button" onClick={this.onSaveIconClick}>
              <Save />
            </IconButton>
          ) : (
            ''
          )}
        </>
      );
  };

  onInputChange = (event) => {
    this.setState({ newTodoText: event.target.value });
  };

  onMouseEnter = () => {
    if (!this.state.mouseOver) {
      this.setState({ mouseOver: true });
    }
  };

  onMouseOut = () => {
    if (this.state.mouseOver) {
      this.setState({ mouseOver: false });
    }
  };

  onEditIconClick = () => {
    this.setState({ mode: 'edit' });
  };

  onSaveIconClick = () => {
    this.props.onTodoUpdate(this.props.todoItem, this.state.newTodoText);
    this.setState({ mode: 'view' });
  };

  render() {
    const { selectedItem, completedItem } = this.state;
    const { todoItem } = this.props;

    return (
      <Card
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseOut}
        className={`todo-item ${selectedItem} ${completedItem}`}
      >
        <ListItem>
          <Button data-testid="delete-icon" onClick={() => this.props.toggleDeleteModal(todoItem)}>
            <DeleteIcon fontSize="large" color="secondary" className="delete-icon" />
          </Button>
          <Divider orientation="vertical" flexItem />
          {this.renderCompleteIcon()}
          {this.renderInputField()}
          {this.renderMoreMenu()}
        </ListItem>
      </Card>
    );
  }
}

export default TodoItem;
