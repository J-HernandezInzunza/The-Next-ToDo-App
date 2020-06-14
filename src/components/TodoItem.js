import React from 'react';
import { ListItem, ListItemText, Button, Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../styles/TodoItem.scss';

class TodoItem extends React.Component {
  state = { anchorEl: null, open: false, selectedItem: '' };

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

  onDeleteClick = () => {
    this.props.toggleDeleteModal(this.props.todoItem);
  };

  render() {
    return (
      <Card id="todo-item" className={this.state.selectedItem}>
        <ListItem>
          <Button className="delete-button" onClick={this.onDeleteClick}>
            <DeleteIcon fontSize="large" color="secondary" />
          </Button>
          <ListItemText primary={this.props.todoItem.text} className="todo-text" />
          <Button className="menu-button" onClick={this.onMenuClick}>
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
        </ListItem>
      </Card>
    );
  }
}

export default TodoItem;
