import React, { useState, useEffect } from 'react';
import Popup from 'react-popup';

function TodoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    const addTask = () => {
        if (taskInput.trim() === '') {
            alert("Enter A Task");
        } else {
            setTasks([...tasks, { text: taskInput, completed: false }]);
            setTaskInput('');
        }
    };

    const toggleCompleteTask = (key) => {
        const newTasks = tasks.map((task, i) => {
            if (i === key) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        alert("Task deleted");
    };

    return (
        <div className="container">
           <center>
           <h1>To-Do List</h1>
            </center> 
            <div className="input-container">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Enter a new task"
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            {tasks.length > 0 && (
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index} className={`task ${task.completed ? 'completed' : ''}`}>
                                <td>{task.text}</td>
                                <td>
                                    <button onClick={() => toggleCompleteTask(index)} className="complete-btn">✓</button>
                                    <button onClick={() => deleteTask(index)} className="delete-btn">✗</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TodoList;
