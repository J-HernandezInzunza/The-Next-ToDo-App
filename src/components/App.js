import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container } from '@material-ui/core';
import TodoList from './TodoList';
import AddTodoInput from './AddTodoInput';
import { swapTodoItems, shiftTodoItemToTop, shiftTodoItemToBottom } from '../utils/helper';
import '../styles/App.scss';

class App extends React.Component {
  state = { todoList: [] };

  componentDidMount() {
    const storedTodoList = window.localStorage.getItem('savedTodoList');
    if (storedTodoList) {
      const savedTodoList = JSON.parse(storedTodoList);
      this.setState({ todoList: savedTodoList });
    } else {
      console.warn('No stored list found');
    }
  }

  onTodoSubmit = (todoText) => {
    const todoItem = {
      id: uuidv4(),
      text: todoText,
    };

    this.setState(
      { todoList: [...this.state.todoList, todoItem] },
      this.updateAndSaveTodoList(this.state.todoList)
    );
  };

  onMoveUp = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index > 0) {
      const newTodoList = swapTodoItems(this.state.todoList, index, index - 1);
      this.updateAndSaveTodoList(newTodoList);
    }
  };

  onMoveDown = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index < this.state.todoList.length - 1) {
      const newTodoList = swapTodoItems(this.state.todoList, index, index + 1);
      this.updateAndSaveTodoList(newTodoList);
    }
  };

  onMoveToTop = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index > 0) {
      const newTodoList = shiftTodoItemToTop(this.state.todoList, index);
      this.updateAndSaveTodoList(newTodoList);
    }
  };

  onMoveToBottom = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index < this.state.todoList.length - 1) {
      const newTodoList = shiftTodoItemToBottom(this.state.todoList, index);
      this.updateAndSaveTodoList(newTodoList);
    }
  };

  updateAndSaveTodoList = (newTodoList) => {
    console.log('saving to LS');
    this.setState({ todoList: newTodoList }, () => {
      window.localStorage.setItem('savedTodoList', JSON.stringify(this.state.todoList));
    });
  };

  render() {
    return (
      <Container maxWidth="md" id="container">
        <h1>NEXT TODOS</h1>
        <TodoList
          todoList={this.state.todoList}
          onMoveUp={this.onMoveUp}
          onMoveDown={this.onMoveDown}
          onMoveToTop={this.onMoveToTop}
          onMoveToBottom={this.onMoveToBottom}
        />
        <AddTodoInput onFormSubmit={this.onTodoSubmit} />
      </Container>
    );
  }
}

export default App;
