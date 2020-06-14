import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '@material-ui/core';
import TodoList from './TodoList';
import AddTodoInput from './AddTodoInput';
import { swapTodoItems, shiftTodoItemToTop, shiftTodoItemToBottom } from '../utils/helper';
import '../styles/App.scss';

class App extends React.Component {
  state = { todoList: [] };

  onTodoSubmit = (todoText) => {
    const todoItem = {
      id: uuidv4(),
      text: todoText,
    };

    this.setState({ todoList: [...this.state.todoList, todoItem] });
  };

  onMoveUp = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index > 0) {
      const newTodoList = swapTodoItems(this.state.todoList, index, index - 1);
      this.setState({ todoList: newTodoList });
    }
  };

  onMoveDown = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index < this.state.todoList.length - 1) {
      const newTodoList = swapTodoItems(this.state.todoList, index, index + 1);
      this.setState({ todoList: newTodoList });
    }
  };

  onMoveToTop = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index > 0) {
      const newTodoList = shiftTodoItemToTop(this.state.todoList, index);
      this.setState({ todoList: newTodoList });
    }
  };

  onMoveToBottom = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    console.log(index);
    if (index < this.state.todoList.length - 1) {
      const newTodoList = shiftTodoItemToBottom(this.state.todoList, index);
      this.setState({ todoList: newTodoList });
    }
  };

  render() {
    return (
      <Container maxWidth="md" id="container">
        <h1>NEXT TODOS</h1>
        <AddTodoInput onFormSubmit={this.onTodoSubmit} />
        <TodoList
          todoList={this.state.todoList}
          onMoveUp={this.onMoveUp}
          onMoveDown={this.onMoveDown}
          onMoveToTop={this.onMoveToTop}
          onMoveToBottom={this.onMoveToBottom}
        />
      </Container>
    );
  }
}

export default App;
