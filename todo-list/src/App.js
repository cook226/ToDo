import React, { useState, useEffect } from 'react';
import Task from './Components/Task';
import TaskInputForm from './Components/TaskInputForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  // Load tasks from localStorage on initial load
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage on tasks array change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (description) => {
    const newTask = { id: Date.now(), description, isCompleted: false };
    setTasks([...tasks, newTask]);
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id, newDescription) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, description: newDescription } : task
    ));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
      case 'incomplete':
        return tasks.filter(task => !task.isCompleted);
      default:
        return tasks;
    }
  };

  return (
    <div className="App">
      <TaskInputForm onAddTask={addTask} />
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      {getFilteredTasks().map(task => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          isCompleted={task.isCompleted}
          onToggleCompleted={() => toggleCompletion(task.id)}
          onDelete={() => deleteTask(task.id)}
          onUpdate={updateTask}
        />
      ))}
    </div>
  );
}

export default App;
