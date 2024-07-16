import React, { useState } from 'react';
import './TaskContainer.css';

function TaskContainer() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleEditTask = (id, newText) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleSetEditingTask = id => {
    setEditingTask(id);
  };

  const handleSaveEditTask = (id, newText) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div className='container'>
      <div className="task-container">
        <h2>Task List</h2>
        <div className="task-input">
          <input
            
            aria-label='Type here'
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={task.text}
                  onChange={e => handleEditTask(task.id, e.target.value)}
                  onBlur={() => handleSaveEditTask(task.id, task.text)}
                />
              ) : (
                <span onClick={() => handleToggleComplete(task.id)}>
                  {task.text}
                </span>
              )}
              <div className="task-buttons">
                {task.completed ? (
                  <button onClick={() => handleToggleComplete(task.id)}>
                    Mark as Incomplete
                  </button>
                ) : (
                  <button onClick={() => handleToggleComplete(task.id)}>
                    Mark as Complete
                  </button>
                )}
                <button onClick={() => handleSetEditingTask(task.id)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskContainer;
