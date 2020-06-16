import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from '@material-ui/core/Container';
import TodoList from './TodoList';
import AddTodoInput from './AddTodoInput';
import DeleteModal from './DeleteModal';
import SearchTodoTextField from './SearchTodoTextField';
import Toast from './Toast';
import {
  swapTodoItems,
  shiftTodoItemToTop,
  shiftTodoItemToBottom,
  removeToDoItemFromList,
  containsSearchTerm,
} from '../utils/helper';
import '../styles/App.scss';

class App extends React.Component {
  state = {
    todoList: [],
    completedList: [],
    selectedItem: null,
    showModal: false,
    showToast: false,
    toastMessage: '',
  };

  componentDidMount() {
    this.initializeData();
  }

  initializeData = () => {
    const storedTodoList = window.localStorage.getItem('savedTodoList');
    const storedCompletedList = window.localStorage.getItem('savedCompletedList');

    if (storedTodoList || storedCompletedList) {
      const savedTodoList = storedTodoList ? JSON.parse(storedTodoList) : [];
      const savedCompletedList = storedCompletedList ? JSON.parse(storedCompletedList) : [];
      this.setState({ todoList: savedTodoList, completedList: savedCompletedList });
    } else {
      console.warn('No stored lists found');
    }
  };

  onSearch = (searchText) => {
    // eslint-disable-next-line array-callback-return
    const todoArray = this.state.todoList.filter((todo) => {
      if (containsSearchTerm(searchText, todo.text)) {
        return todo;
      }
    });

    // eslint-disable-next-line array-callback-return
    const completedArray = this.state.completedList.filter((todo) => {
      if (containsSearchTerm(searchText, todo.text)) {
        return todo;
      }
    });

    this.setState({ todoList: todoArray, completedList: completedArray });
  };

  onClearSearch = () => {
    this.initializeData();
  };

  onTodoSubmit = (todoText) => {
    const todoItem = {
      id: uuidv4(),
      text: todoText,
      isComplete: false,
    };

    this.setState(
      {
        todoList: [...this.state.todoList, todoItem],
        showToast: true,
        toastMessage: 'Todo Created!',
      },
      this.updateAndSaveList(this.state.todoList)
    );
  };

  onTodoUpdate = (todoItem, newTodoText) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    const newTodoList = [...this.state.todoList];
    newTodoList[index].text = newTodoText;

    this.updateAndSaveList(newTodoList);
    this.setState({ showToast: true, toastMessage: 'Todo Updated!' });
  };

  onTodoDelete = (todoItem) => {
    if (todoItem.isComplete) {
      const index = this.state.completedList.findIndex((todo) => todo.id === todoItem.id);
      const newList = removeToDoItemFromList(this.state.completedList, index);
      this.updateAndSaveList(newList, 'COMPLETED');
    } else {
      const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
      const newList = removeToDoItemFromList(this.state.todoList, index);
      this.updateAndSaveList(newList);
    }
    this.toggleModal();
    this.setState({ showToast: true, toastMessage: 'Todo Deleted!' });
  };

  onTodoComplete = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    const newTodoList = [...this.state.todoList];
    const newCompletedList = [...this.state.completedList];
    const completedItem = newTodoList.splice(index, 1)[0];
    completedItem.isComplete = true;

    newCompletedList.push(completedItem);

    this.setState(
      {
        todoList: newTodoList,
        completedList: newCompletedList,
        showToast: true,
        toastMessage: 'Todo Completed!',
      },
      () => {
        window.localStorage.setItem('savedTodoList', JSON.stringify(this.state.todoList));
        window.localStorage.setItem('savedCompletedList', JSON.stringify(this.state.completedList));
        console.debug('update saved to localstorage');
      }
    );
  };

  onMoveUp = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index > 0) {
      this.updateAndSaveList(swapTodoItems(this.state.todoList, index, index - 1));
    }
  };

  onMoveDown = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index < this.state.todoList.length - 1) {
      this.updateAndSaveList(swapTodoItems(this.state.todoList, index, index + 1));
    }
  };

  onMoveToTop = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index > 0) {
      this.updateAndSaveList(shiftTodoItemToTop(this.state.todoList, index));
    }
  };

  onMoveToBottom = (todoItem) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === todoItem.id);
    if (index < this.state.todoList.length - 1) {
      this.updateAndSaveList(shiftTodoItemToBottom(this.state.todoList, index));
    }
  };

  updateAndSaveList = (newList, listType = null) => {
    if (listType === 'COMPLETED') {
      this.setState({ completedList: newList }, () => {
        window.localStorage.setItem('savedCompletedList', JSON.stringify(this.state.completedList));
      });
    } else {
      this.setState({ todoList: newList }, () => {
        window.localStorage.setItem('savedTodoList', JSON.stringify(this.state.todoList));
      });
    }
  };

  toggleModal = (todoItem) => {
    if (todoItem) {
      this.setState({ showModal: true, selectedItem: todoItem });
    } else {
      this.setState({ showModal: false, selectedItem: null });
    }
  };

  showToast = () => {
    const { toastMessage } = this.state;

    return <Toast message={toastMessage} open={true} handleClose={this.hideToast} />;
  };

  hideToast = () => {
    this.setState({ showToast: false, toastMessage: '' });
  };

  render() {
    return (
      <Container maxWidth="md" id="container">
        <h1>next todos</h1>
        <SearchTodoTextField onSearch={this.onSearch} onClearSearch={this.onClearSearch} />
        <TodoList
          todoList={this.state.todoList}
          completedList={this.state.completedList}
          onMoveUp={this.onMoveUp}
          onMoveDown={this.onMoveDown}
          onMoveToTop={this.onMoveToTop}
          onMoveToBottom={this.onMoveToBottom}
          toggleModal={this.toggleModal}
          onTodoComplete={this.onTodoComplete}
          onTodoUpdate={this.onTodoUpdate}
        />
        <AddTodoInput onFormSubmit={this.onTodoSubmit} />
        <DeleteModal
          showModal={this.state.showModal}
          selectedItem={this.state.selectedItem}
          toggleModal={this.toggleModal}
          onTodoDelete={this.onTodoDelete}
        />
        {this.state.showToast ? this.showToast() : null}
      </Container>
    );
  }
}

export default App;
