import React, { useState } from 'react'
import {GrFormClose, GrFormEdit, GrFormCheckmark } from "react-icons/gr"
import { useTodoLayerValue } from '../context/TodoContext'
import clsx from 'clsx'

const Todo = ({ todo }) => {
  const [{ }, dispatch] = useTodoLayerValue();
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(todo.content);


  const removeTodo = todoId => {
    dispatch({
      type:"REMOVE_TODO",
      payload: todoId,
    });
  };

  const updateTodo = ({todoId, newValue}) => {
    dispatch({
      type:"UPDATE_TODO",
      payload: {
        todoId,
        newValue,
      },
    });
  };

  const compeleteTodo = todoId => {
    dispatch({
      type:"COMPLETE_TODO",
      payload: todoId,
    });
  };

  const todoStyle = clsx({
    ["todo-row"]: true,
    ["completed"]: todo.isCompleted,
  });


  return (
    <div className={todoStyle}>
      <div onClick={() => editable ? '' : compeleteTodo(todo.id)}>
        {
          editable ? 
          (<input 
            type="text"
            value={content} 
            onChange={event => setContent(event.target.value)} 
            className="todo-input-edit"
            />
            ) : (
              todo.content
            )}
      </div>

      <div className="todo-icons">
        {
          editable ?  ( <GrFormCheckmark className='todo-icon' onClick={() => {
            updateTodo({
              todoId: todo.id,
              newValue: content
            });
            setContent("");
            setEditable(false);
          }} /> 
          ) : (
            <GrFormEdit className="todo-icon" onClick={() => setEditable(true)}/>
          )
        }
        <GrFormClose className="todo-icon" onClick={() => removeTodo(todo.id)}/>
      </div>
    </div>
  )
}

export default Todo