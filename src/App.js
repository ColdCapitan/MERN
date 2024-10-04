import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './styles/App.css'; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTask, setEditingTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const toggleCompleted = (id) => {
    setTodos(todos.map(todo => 
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (todo) => {
    setEditingTodoId(todo._id);
    setEditingTask(todo.task);
  };

  const saveEditedTodo = async (id) => {
    try {
      const updatedTodo = await axios.put(`http://localhost:5000/todos/${id}`, {
        task: editingTask
      });

      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo.data : todo
      ));
      setEditingTodoId(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container">
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem 
            key={todo._id} 
            todo={todo}
            onToggle={toggleCompleted}
            onEdit={startEditing}
            onDelete={deleteTodo}
            isEditing={editingTodoId === todo._id}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            saveEditedTodo={saveEditedTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
