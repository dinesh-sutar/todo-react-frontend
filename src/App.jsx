import { useEffect } from "react";
import { useState } from "react";
import './App.css'
import AddTodo from "./component/AddTodo";
import Todos from "./component/Todo";
import TodoMenu from "./component/TodoMenu";
import { addTodo, getTodos } from "./service/TodoService";

function App() {
  const [disabled, setDisabled] = useState(false);
  const [isSend, setSend] = useState("send....")
  const [allTodo, setTodos] = useState([]);
  const [copyTodos, setCopyTodos] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('ALL');


  async function fetchTodos() {
    try {
      const response = await getTodos();
      const todos = await response.json();
      console.log(todos);
      setTodos(todos);
      setCopyTodos(todos);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  async function submitForm(event) {
    setDisabled(state => true);
    event.preventDefault();
    const form = event.target;
    const inputs = form.elements;  // Fix typo here
    // console.log(inputs);
    const obj = {};
    Array.from(inputs).forEach(input => {
      if (input.type !== "submit") {
        obj[input.name] = input.value;
      }
    });

    // const json = JSON.stringify(obj);
    try {
      const response = await addTodo(obj);

      if (response.status === 201) {
        const data = await response.json();
        setTodos([data, ...allTodo])
        form.reset();
      }

      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
    finally {
      setDisabled(false);
    }


  }


  function filterTodos(state) {
    if (state == "ALL") {
      setCopyTodos(allTodo);
    }
    else if (state == "PENDING") {
      setCopyTodos(allTodo.filter(todo => !todo.completed));
    }
    else {
      setCopyTodos(allTodo.filter(todo => todo.completed));
    }
  }

  // const designBody = "min-h-screen bg-gradient-to-r from-cyan-500 to-blue-600"
  return <main>
    <div className="bg-white p-4 rounded-md shadow-lg w-96">
      <h2 className="text-center text-xl">Todo App</h2>
      <AddTodo onSubmit={submitForm} disabled={disabled} />


      <TodoMenu filterTodos={filterTodos} selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu} fetchTodos={fetchTodos} />


      <hr />

      <Todos todos={copyTodos} fetchTodos={fetchTodos} />

    </div>

  </main>
}

export default App
