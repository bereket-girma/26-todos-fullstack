import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    todos: [],
  },

  reducers: {
    display: (state, action) => {
      state.todos = action.payload;
    },
  },
});

const { display } = dashboardSlice.actions;

export const getTodos = () => (dispatch) => {
  axios.get("/api/todos").then((r) => dispatch(display(r.data)));
};

export const addTheTodo = (text) => (dispatch) => {
  axios
    .post("/api/todos", { description: text })
    .then((r) => dispatch(getTodos()));
};

export const removeTheTodo = (id) => (dispatch) => {
  axios.delete("/api/todos/" + id).then(() => dispatch(getTodos()));
};

export const updateTheTodo = (text) => (dispatch) => {
  axios
    .patch("/api/todos/" + text.id, { status: text.status })
    .then((r) => dispatch(getTodos()));
};

export const selectTodos = (state) => state.dashboard.todos;
export const selectNewTodo = (state) => state.dashboard.todos;

export default dashboardSlice.reducer;
