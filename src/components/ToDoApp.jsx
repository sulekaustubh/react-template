// src/components/ToDoApp.js
import React, { useState, useEffect } from 'react';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    // Load tasks from local storage when the component mounts
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, task]);
    setTask('');
  };

  const editTask = (index, newTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTask;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Todo App</h2>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{' '}
            <button onClick={() => editTask(index, prompt('Edit task:', task))}>
              Edit
            </button>{' '}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;
