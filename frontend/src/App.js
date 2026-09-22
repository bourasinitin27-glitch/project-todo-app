import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  // Load todos when page opens
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!title.trim()) {
      return;
    }

    try {
      await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });

      setTitle("");
      fetchTodos();
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  // Complete / uncomplete todo
  const toggleTodo = async (todo) => {
    try {
      await fetch(`${API_URL}/todos/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      fetchTodos();
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      fetchTodos();
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>Todo App</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ margin: "15px 0" }}>
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
                marginRight: "15px",
              }}
            >
              {todo.title}
            </span>

            <button onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

