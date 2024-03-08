import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
    }
    setTodos((currentTodo) => [[todo, false], ...currentTodo]);
    setTodo("");
  };
  const onDeleteList = (index) => {
    const updateTodos = todos.filter((_, i) => i !== index);
    setTodos(updateTodos);
  };
  const onCheck = (index) => {
    const todoList = [...todos];
    todoList[index][1] = !todoList[index][1];
    setTodos(todoList);
  };
  return (
    <div>
      <h1>ToDo List</h1>
      <form>
        <input
          onChange={onChange}
          type="text"
          placeholder="Write to do..."
          value={todo}
        ></input>
        <button onClick={onSubmit}>Btn</button>
      </form>
      <hr></hr>
      <ul>
        {todos.map((item, index) => (
          <li
            key={index}
            style={
              item[1]
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            {item}
            <input type="checkbox" onClick={() => onCheck(index)}></input>
            <button onClick={() => onDeleteList(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
