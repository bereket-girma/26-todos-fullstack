import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  display,
  getTodos,
  addTodo,
  removeTodo,
  addTheTodo,
  removeTheTodo,
  selectTodos,
  selectNewTodo,
} from "./dashboardSlice.js";
import "./dashboard.module.css";

export function Dashboard() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const newTodo = useSelector(selectNewTodo);
  const [text, setText] = useState("");

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
        <div className="dashboardContainer2">
          <div className="description">{item.description}</div>
          <div className="status">
            <div className="todo-status">{item.status}</div>
          </div>
          <button className="removeBtn" onClick={() => handleRemove(item.id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}
