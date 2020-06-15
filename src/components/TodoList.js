import React from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import TodoItem from './TodoItem';
import '../styles/TodoList.scss';

const TodoList = (props) => {
  const {
    todoList,
    completedList,
    onMoveUp,
    onMoveDown,
    onMoveToTop,
    onMoveToBottom,
    toggleModal,
    onTodoComplete,
    onTodoUpdate,
  } = props;

  const renderedTodoItems = todoList.map((todoItem) => (
    <TodoItem
      key={todoItem.id}
      todoItem={todoItem}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onMoveToTop={onMoveToTop}
      onMoveToBottom={onMoveToBottom}
      toggleDeleteModal={toggleModal}
      onTodoComplete={onTodoComplete}
      onTodoUpdate={onTodoUpdate}
    />
  ));

  const renderedCompletedItems = completedList.map((completedItem) => (
    <TodoItem
      key={completedItem.id}
      todoItem={completedItem}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onMoveToTop={onMoveToTop}
      onMoveToBottom={onMoveToBottom}
      toggleDeleteModal={toggleModal}
      onTodoComplete={onTodoComplete}
    />
  ));

  return (
    <Paper variant="outlined">
      <List id="todo-list">
        {renderedTodoItems}
        {renderedCompletedItems}
      </List>
    </Paper>
  );
};

export default TodoList;
