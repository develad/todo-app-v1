import React, { useState } from 'react';
import * as fa from 'react-icons/fa';

function TodoCard({ todo, deletetodo, editTodoHandler, isCheckedHandler }) {
  const [show, setShow] = useState(false);
  const [isChecked, setisChecked] = useState(todo.isChecked);
  const [editTodo, seteditTodo] = useState('');

  const level = [
    { priority: 'low', icon: '🟢' },
    { priority: 'medium', icon: '🟡' },
    { priority: 'high', icon: '🔴' },
  ];

  return (
    <div
      className={
        isChecked
          ? 'card card-checked ' + level[todo.priority].priority
          : 'card ' + level[todo.priority].priority
      }
    >
      <h1 className={isChecked ? 'line to-do' : 'to-do'}>{todo.todo}</h1>
      <h2>
        Created at:{' '}
        {new Date(todo.created_at).toLocaleString().split(',').join(' ⚡ ')}
      </h2>
      <h3 className='icon'>{level[todo.priority].icon}</h3>
      <div className={show ? 'edit-show' : 'edit-dont-show'}>
        <input
          type='text'
          name='edit-todo'
          required
          onChange={(e) => seteditTodo(e.target.value)}
          value={editTodo ? editTodo : todo.todo}
        />
        <div
          className='edit-icon'
          onClick={() => {
            if (!editTodo || /^\s*$/.test(editTodo)) return;
            editTodoHandler(todo.id, editTodo);
            seteditTodo('');
            setShow(false);
            setisChecked(false);
            isCheckedHandler(todo.id, isChecked);
          }}
        >
          <fa.FaCheckSquare />
        </div>
      </div>
      <div className='buttons'>
        <div onClick={() => setShow(!show)}>
          <fa.FaEdit />
        </div>
        <div onClick={() => deletetodo(todo.id)}>
          <fa.FaTrashAlt />
        </div>

        <input
          type='checkbox'
          checked={isChecked}
          value={isChecked}
          onChange={(e) => {
            setisChecked(e.target.checked);
            isCheckedHandler(todo.id, e.target.checked);
          }}
        />
      </div>
    </div>
  );
}

export default TodoCard;
