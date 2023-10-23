import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import "./todo.css";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoInfo, setTodoInfo] = useState("");
  const [credents] = useContext(CredentialsContext);
  const [filter, setFilter] = useState("uncompleted");
  const [data, setData] = useState([]);

  const persist = (newTodos) => {
    fetch(`https://ticktick-lite-mern-api2.vercel.app/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credents.username}:${credents.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
    fetch(`https://ticktick-lite-mern-api2.vercel.app/todos`,  {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credents.username}:${credents.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoInfo) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoInfo };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoInfo("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };

  const getAllTodos=() =>{
    const newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write("<pre><code>" + JSON.stringify(todos, null, 2) + "</code></pre>");
    newWindow.document.close();
  };
  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };


  return (
    <div className="todoContainer">
      <select className="toggle-button" value={filter} onChange={(e) => changeFilter(e.target.value)}>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      {getTodos().map((todo) => (
        <div className="task" key={todo.id}>
          <input
            checked={todo.checked}
            onChange={() => toggleTodo(todo.id)}
            type="checkbox"
          />
          <label>{todo.text}</label>
        </div>
      ))}
      <br />
      <form className="submit-button"onSubmit={addTodo}>
        <input
          value={todoInfo}
          onChange={(e) => setTodoInfo(e.target.value)}
          type="text"
        >

        </input>
        <button type="submit">Add</button>
      </form>
      <div className="viewJson-button">
      <button onClick={getAllTodos} >
        View RAW JSON
        </button> 
    </div>
    </div>
  );
}