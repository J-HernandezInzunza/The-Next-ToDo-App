import React from 'react';
import TodoList from './TodoList';
import AddTodoInput from './AddTodoInput';
import { Container } from '@material-ui/core';
import '../styles/App.scss';

class App extends React.Component {
  state = { todoList: [] };

  onTodoSubmit = (todoItem) => {
    this.setState((state) => {
      const newTodoList = [...state.todoList, todoItem];

      return { todoList: newTodoList };
    });
  };

  render() {
    return (
      <Container maxWidth="md" id="container">
        <AddTodoInput onFormSubmit={this.onTodoSubmit} />
        <TodoList todoList={this.state.todoList} />
      </Container>
    );
  }
}

export default App;
