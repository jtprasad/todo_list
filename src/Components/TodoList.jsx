import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);                           // state to store all todo sections each with a heading and associated lists
  const [headingInput, setHeadingInput] = useState('');             // state to manage current heading input
  const [listInputs, setListInputs] = useState({});                 // state to manage each input field for nested list items by heading index
  const handleAddTodo = () => {                                     // function to add new todo heading if input is not empty
    if (headingInput.trim() !== '') {                               // checks if headingInput is empty after trimming whitespace and ensures user entered content
      setTodos([...todos, {heading: headingInput, lists: [] }]);    // updates state variable todos if condition is met                                                                    
                                                                    // spread existing array into new array using spread syntax(...todos)
                                                                    // appends new object containing heading prop set to headingInput and lists prop initialized as empty array
      setHeadingInput('');                                          // clears headingInput state variable and resets text input firld for user to add new content
    }
  };
  const handleDeleteTodo = (index) => {                             // function to delete todo section based on index
    const newTodos = [...todos];                                    // create shallow copy of current todos array
    newTodos.splice(index, 1);                                      // remove todo at specified index
    setTodos(newTodos);                                             // update state with new array without deleted todo
  };
  const handleAddList = (index) => {                                // function to handle adding new list item to specific todo heading
    if (listInputs[index] && listInputs[index].trim() !== '') {     // check if input for given index is not empty or whitespace
      const newTodos = [...todos];                                  // create copy of current todos array
      newTodos[index].lists.push(listInputs[index]);                // add new list item to corresponding heading's list
      setTodos(newTodos);                                           // update todos state with new list item
      setListInputs({ ...listInputs, [index]: '' });                // clear input field for that index
    }
  };
  const handleListInputChange = (index, value) => {                 // function to update list input value for specific heading
    setListInputs({ ...listInputs, [index]: value });               // update listInputs state for corresponding index
  };
  return (
    <>
{/* Input field to enter a new heading */}
      <div className="todo-container">
        <h1 className="title">My To-Do List</h1>
        <div className="input-container"> 
          <input
            type="text"
            className="heading-input"                               // CSS class for styling
            placeholder="Enter heading"                             // text shown when input is empty
            value={headingInput}                                    // binds value of input field to headingInput state variable
            onChange={(e) => {setHeadingInput(e.target.value);}}    // add onChange event handler to update headingInput state
                                                                    // arrow function takes event (e) as argument representing event triggering handler
                                                                    // setHeadingInput function updates state variable headingInput with value entered in input field
                                                                    // e.target.value retrieves current value of input element that triggered the event
                                                                    // setHeadingInput is called with this value to update the state
          />
{/* button to add the entered heading to the todo list */}
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
{/* main section displaying all todos */}
      <div className="todo_main">
        {todos.map((todo, index) => (                               // maps over array containing todo items.
          <div key={index} className="todo-card">
            <div className="heading_todo">
{/* display heading text of current todo item */}
              <h3>{todo.heading}</h3>
{/* button to delete current heading by passing its index */}
              <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
            </div>
            <ul>
{/* iterate over each list item inside current todo */}
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex} className='todo_inside_list'>
                  <p>{list}</p>
                </li>
              ))}
            </ul>
{/* input field for adding new item under specific heading */}
            <div className='add_list'>
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ''}                     // use value from listInputs array based on current heading index
                onChange={(e) => handleListInputChange(index, e.target.value)}/> 
{/* onChange event handler triggers handleInputChange function with current index and new value obtained from e.target.value. updates listInputs state object. ensures each todo item's list is tracked */}
{/* button to add list item to corresponding heading */}
              <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
