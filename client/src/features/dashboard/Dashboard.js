import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  display,
  getTodos,
  addTheTodo,
  removeTheTodo,
  updateTheTodo,
  selectTodos,
} from "./dashboardSlice.js";
import "./dashboard.module.css";

export function Dashboard() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const [text, setText] = useState("");
  //   const [status, setStatus] = useState("active");

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  function handleRemove(id) {
    dispatch(removeTheTodo(id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addTheTodo(text));

    setText("");
  }

  function handleUpdate(id, status) {
    dispatch(updateTheTodo({ id, status }));
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="todo-input"
          placeholder="Enter your todo here"
        />
        <button className="enter-todo-btn" type="submit">
          Enter
        </button>
      </form>
      <div className="todoLabels">
        <div className="todoDescription">Description</div>
        <div className="todoStatus">Status</div>
      </div>
      {todos.map((item) => (
        <div className="todoItems" id={item.id} key={item.id}>
          <div className="description">{item.description}</div>
          <div className="todo-status"> {item.status}</div>
          <button
            className="completeBtn"
            onClick={() => handleUpdate(item.id, "completed")}
          >
            Completed
          </button>
         
          <button
            className="activeBtn"
            onClick={() => handleUpdate(item.id, "active")}
          >
            Active
          </button>
          <button className="removeBtn" onClick={() => handleRemove(item.id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}

