// Given a list and two indexes, this will swap the position
// of these two items and return a new list
export const swapTodoItems = (list, indexA, indexB) => {
  const newTodoList = [...list];
  const todo = newTodoList[indexA];

  newTodoList[indexA] = newTodoList[indexB];
  newTodoList[indexB] = todo;
  return newTodoList;
};

// Given a list and one index, this will move the position
// of the index item to the top and return a new list
export const shiftTodoItemToTop = (list, index) => {
  const newTodoList = [...list];
  newTodoList.unshift(newTodoList.splice(index, 1)[0]);

  return newTodoList;
};

// Given a list and one index, this will move the position
// of the index item to the bottom and return a new list
export const shiftTodoItemToBottom = (list, index) => {
  const newTodoList = [...list];
  newTodoList.push(newTodoList.splice(index, 1)[0]);

  return newTodoList;
};

// Given a list and one index, this will remove the item at
// the position of the index and return the modified list
export const removeToDoItemFromList = (list, index) => {
  const newTodoList = [...list];
  newTodoList.splice(index, 1);

  return newTodoList;
};

// Given two strings, this will search the todo text to
// see if it contains the search string, returns true or false
export const containsSearchTerm = (searchText, todoText) => {
  return todoText.toLowerCase().search(searchText.toLowerCase()) >= 0;
};
