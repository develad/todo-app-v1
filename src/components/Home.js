import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoCard from './TodoCard';

function Home() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [priority, setPriority] = useState(0);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem('storageTodos'));
    if (storageTodos != null) setTodos(storageTodos);
  }, []);

  useEffect(() => {
    if (todos.length === 0) localStorage.removeItem('storageTodos');
    if (todos.length >= 1)
      localStorage.setItem('storageTodos', JSON.stringify([...todos]));
  }, [todos]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!todo || /^\s*$/.test(todo)) return;
    const todoItem = {
      todo,
      priority,
      id: uuidv4(),
      isChecked: false,
      created_at: Date.now(),
    };
    setTodos(sortHandler(todos, todoItem));
    setTodo('');
    setMenuIsOpen(false);
  };

  const deletetodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodoHandler = (id, editTodo) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    todos[idx].todo = editTodo;
    const newTodos = todos.filter((todo) => todo.id !== id);
    newTodos.splice(idx, 0, todos[idx]);
    setTodos(newTodos);
  };

  const isCheckedHandler = (id, isChecked) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    todos[idx].isChecked = isChecked;
    const newTodos = todos.filter((todo) => todo.id !== id);
    newTodos.splice(idx, 0, todos[idx]);
    setTodos(newTodos);
  };

  const sortHandler = (a, b) => {
    return [...a, b].sort((a, b) => {
      if (a.priority > b.priority) return -1;
      if (a.priority < b.priority) return 1;
      if (a.created_at > b.created_at) return -1;
      if (a.created_at < b.created_at) return 1;
      return 0;
    });
  };

  return (
    <>
      <button className='add-btn' onClick={() => setMenuIsOpen(!menuIsOpen)}>
        {menuIsOpen ? (
          <i
            className='fas fa-window-close'
            style={{ color: 'red', fontSize: '1.5rem' }}
          ></i>
        ) : (
          <i
            className='fas fa-plus-square'
            style={{ color: 'lime', fontSize: '1.5rem' }}
          ></i>
        )}
      </button>
      <div>
        <form
          onSubmit={submitHandler}
          className={menuIsOpen ? 'form-cont' : 'form-cont-dont-show'}
        >
          <label htmlFor='to-do'>Add Your To-do Here:</label>
          <input
            type='text'
            id='to-do'
            name='to-do'
            value={todo}
            required
            onChange={(e) => setTodo(e.target.value)}
          />
          <label htmlFor='priority'>Choose todo priority:</label>
          <select
            name='priority'
            id='priority'
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={0}>🟢&nbsp;&nbsp;Low</option>
            <option value={1}>🟡&nbsp;&nbsp;Medium</option>
            <option value={2}>🔴&nbsp;&nbsp;High</option>
          </select>
          <button type='submit'>Submit</button>
        </form>
        <div>
          <div
            className={menuIsOpen ? 'todo-container edit-dont-show' : 'todos'}
          >
            {todos.map((todo) => {
              return (
                <TodoCard
                  todo={todo}
                  key={todo.id}
                  deletetodo={deletetodo}
                  editTodoHandler={editTodoHandler}
                  isCheckedHandler={isCheckedHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
