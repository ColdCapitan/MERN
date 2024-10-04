// TodoItem.js
import React from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete, isEditing, editingTask, setEditingTask, saveEditedTodo }) => {
    return (
        <li className="todo-item">
            <button
                className={`circle ${todo.completed ? 'completed' : ''}`}
                onClick={() => onToggle(todo._id)}
            >
                {todo.completed && <span className="checkmark">✔️</span>}
            </button>
            {isEditing ? (
                <input
                    type="text"
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                />
            ) : (
                <span className="todo-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.task}
                </span>
            )}
            <button class="edit-dutton" onClick={isEditing ? () => saveEditedTodo(todo._id) : () => onEdit(todo)}>
                {isEditing ? 'Зберегти' : <span role="img" aria-label="edit">✏️</span>}
            </button>
            <button onClick={() => onDelete(todo._id)} style={{ marginLeft: '10px' }}>
                <span role="img" aria-label="delete">❌</span>
            </button>

        </li>
    );
};

export default TodoItem;
