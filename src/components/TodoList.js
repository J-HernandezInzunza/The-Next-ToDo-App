import React from 'react';
import { List } from '@material-ui/core';
import TodoItem from './TodoItem';

const TodoList = ({ todoList }) => {
  const renderedTodoItems = todoList.map((todoItem) => <TodoItem text={todoItem} />);

  return <List id="todo-list">{renderedTodoItems}</List>;
};

export default TodoList;
