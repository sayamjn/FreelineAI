import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setTasks(data.slice(0, 10));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
      userId: 1
    };

    setTasks([newTaskObj, ...tasks]);
    setNewTask('');
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="text-center">Loading tasks...</div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-4 p-4 border rounded bg-white"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskComplete(task.id)}
                className="w-5 h-5"
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoApp;