import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { getMonthKey } from '../utils/dateUtils';

export default function Sidebar({ currentDate }) {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const monthKey = getMonthKey(currentDate);

    // Real-time listener for tasks
    useEffect(() => {
        if (!currentUser) return;

        const tasksRef = collection(db, 'users', currentUser.uid, 'months', monthKey, 'tasks');
        const q = query(tasksRef, orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const taskList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(taskList);
        });

        return unsubscribe;
    }, [currentUser, monthKey]);

    // Add new task
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            const tasksRef = collection(db, 'users', currentUser.uid, 'months', monthKey, 'tasks');
            await addDoc(tasksRef, {
                title: newTaskTitle.trim(),
                createdAt: new Date(),
                checks: {} // Initialize empty checks map
            });
            setNewTaskTitle('');
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again.');
        }
    };

    // Delete task
    const handleDeleteTask = async (taskId) => {
        try {
            const taskRef = doc(db, 'users', currentUser.uid, 'months', monthKey, 'tasks', taskId);
            await deleteDoc(taskRef);
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task. Please try again.');
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Tasks</h2>
                <div className="header-buttons">
                    <button onClick={() => navigate('/daily-tasks')} className="daily-tasks-btn">
                        📅 Daily Tasks
                    </button>
                    <button onClick={logout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            <form onSubmit={handleAddTask} className="add-task-form">
                <input
                    type="text"
                    placeholder="New task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="task-input"
                />
                <button type="submit" className="add-task-btn" title="Add Task">
                    +
                </button>
            </form>

            <div className="tasks-list">
                {tasks.length === 0 ? (
                    <p className="empty-message">No tasks yet. Add one above!</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="task-item">
                            <span className="task-title">{task.title}</span>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="delete-task-btn"
                                title="Delete task"
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
