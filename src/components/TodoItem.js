import React from 'react';
import { ListItem, ListItemText, Button, Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../styles/TodoItem.scss';

class TodoItem extends React.Component {
  state = { anchorEl: null, open: false, selectedItem: '', completedItem: '' };

  componentDidMount() {
    this.setState({ completedItem: this.props.todoItem.isComplete ? 'completed-item' : '' });
  }

  onMenuClick = (event) => {
    this.setState({ anchorEl: event.target, selectedItem: 'selected-item' });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null, selectedItem: '' });
  };

  onMoveUpClick = () => {
    this.props.onMoveUp(this.props.todoItem);
    this.handleMenuClose();
  };

  onMoveDownClick = () => {
    this.props.onMoveDown(this.props.todoItem);
    this.handleMenuClose();
  };

  onMoveToTopClick = () => {
    this.props.onMoveToTop(this.props.todoItem);
    this.handleMenuClose();
  };

  onMoveToBottomClick = () => {
    this.props.onMoveToBottom(this.props.todoItem);
    this.handleMenuClose();
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
            <MoreVertIcon fontSize="large" color="primary" />
          </Button>
          <Menu
            keepMounted
            onClose={this.handleMenuClose}
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

  render() {
    const { selectedItem, completedItem } = this.state;
    const { todoItem } = this.props;

    return (
      <Card id="todo-item" className={`${selectedItem} ${completedItem}`}>
        <ListItem>
          <Button onClick={() => this.props.toggleDeleteModal(todoItem)}>
            <DeleteIcon fontSize="large" color="secondary" />
          </Button>
          <Divider orientation="vertical" flexItem />
          {this.renderCompleteIcon()}
          <ListItemText primary={todoItem.text} className="todo-text" />
          {this.renderMoreMenu()}
        </ListItem>
      </Card>
    );
  }
}

export default TodoItem;
