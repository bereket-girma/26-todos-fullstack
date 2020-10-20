const express = require("express");
const app = express();

const knex = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "todo_app",
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get('/', (req, res) =>{
//     res.json({hello: true})
// } )

const todos = [];

app.get("/api/todos", async (req, res) => {
  const todos = await knex.raw("SELECT * FROM todos");
  const todo_row = todos.rows;
  res.json(todo_row);
});

app.post("/api/todos", (req, res) => {
  console.log(req.body);
  const { description } = req.body;
  const status = "active";

  knex
    .raw(`INSERT INTO todos (description, status, user_id) VALUES (?, ?, ?)`, [
      description,
      status,
      1,
    ])
    .then((result) => {
      res.json(result.rows);
    });
});

app.delete("/api/todos/:id", (req, res) => {
  knex.raw(`DELETE FROM todos WHERE id = ?`, [req.params.id]).then((result) => {
    res.json(result.rows);
  });
});

app.patch("/api/todos/:id", (req, res) => {
  // let status ="active"
  const id = req.params.id;
  const { status } = req.body;
  knex
    .raw(`UPDATE todos SET status = ? WHERE id = ?`, [status, id])
    .then((result) => {
      res.json(result.rows);
    });
});


app.listen(3001, (req, res) => {
  console.log("listening on port 3001");
});
