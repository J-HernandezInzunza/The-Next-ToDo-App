import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todoList }) => {
  const renderedTodoItems = todoList.map((todoItem) => <TodoItem text={todoItem} />);

  return <div>{renderedTodoItems}</div>;
};

export default TodoList;
