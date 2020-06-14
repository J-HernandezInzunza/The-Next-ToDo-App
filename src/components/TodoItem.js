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

  onMenuItemClick = () => {
    this.setState({ anchorEl: null, selectedItem: '' });
  };

  onDeleteClick = () => {
    console.log('trash can icon clicked');
  };

  render() {
    return (
      <Card id="todo-item" className={this.state.selectedItem}>
        <ListItem>
          <Button className="delete-button" onClick={this.onDeleteClick}>
            <DeleteIcon fontSize="large" color="secondary" />
          </Button>
          <ListItemText primary={this.props.text} className="todo-text" />
          <Button className="menu-button" onClick={this.onMenuClick}>
            <MoreVertIcon fontSize="large" color="primary" />
          </Button>
          <Menu open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl}>
            <MenuItem onClick={this.onMenuItemClick}>Move To Top</MenuItem>
            <MenuItem onClick={this.onMenuItemClick}>Move Up</MenuItem>
            <MenuItem onClick={this.onMenuItemClick}>Move Down</MenuItem>
            <MenuItem onClick={this.onMenuItemClick}>Move To Bottom</MenuItem>
          </Menu>
        </ListItem>
      </Card>
    );
  }
}

export default TodoItem;
