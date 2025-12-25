import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import {
    getMonthKey,
    formatMonthYear,
    getDaysInMonth,
    getNextMonth,
    getPreviousMonth
} from '../utils/dateUtils';

export default function DailyTasks() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [dailyTasks, setDailyTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const monthKey = getMonthKey(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);

    // Generate array of days for the selected month
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Get day key with zero padding (01, 02, ..., 31)
    const getDayKey = (day) => String(day).padStart(2, '0');
    const selectedDayKey = getDayKey(selectedDay);

    // Real-time listener for tasks of the selected day
    useEffect(() => {
        if (!currentUser) return;

        const dailyTasksRef = collection(
            db,
            'users',
            currentUser.uid,
            'months',
            monthKey,
            'dailyTasks',
            selectedDayKey,
            'tasks'
        );

        const unsubscribe = onSnapshot(dailyTasksRef, (snapshot) => {
            const tasks = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setDailyTasks(tasks);
        });

        return () => unsubscribe();
    }, [currentUser, monthKey, selectedDayKey]);

    // Add task to the selected day
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            const dailyTasksRef = collection(
                db,
                'users',
                currentUser.uid,
                'months',
                monthKey,
                'dailyTasks',
                selectedDayKey,
                'tasks'
            );

            await addDoc(dailyTasksRef, {
                title: newTaskTitle.trim(),
                completed: false,
                createdAt: serverTimestamp()
            });

            setNewTaskTitle('');
        } catch (error) {
            console.error('Error adding daily task:', error);
            alert('Failed to add task. Please try again.');
        }
    };

    // Toggle task completion
    const handleToggleComplete = async (taskId, currentStatus) => {
        try {
            const taskRef = doc(
                db,
                'users',
                currentUser.uid,
                'months',
                monthKey,
                'dailyTasks',
                selectedDayKey,
                'tasks',
                taskId
            );
            await updateDoc(taskRef, {
                completed: !currentStatus
            });
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task. Please try again.');
        }
    };

    // Delete task
    const handleDeleteTask = async (taskId) => {
        try {
            const taskRef = doc(
                db,
                'users',
                currentUser.uid,
                'months',
                monthKey,
                'dailyTasks',
                selectedDayKey,
                'tasks',
                taskId
            );
            await deleteDoc(taskRef);
        } catch (error) {
            console.error('Error deleting daily task:', error);
            alert('Failed to delete task. Please try again.');
        }
    };

    // Navigate to previous month
    const goToPreviousMonth = () => {
        setCurrentDate(getPreviousMonth(currentDate));
        setSelectedDay(1); // Reset to day 1 when changing month
    };

    // Navigate to next month
    const goToNextMonth = () => {
        setCurrentDate(getNextMonth(currentDate));
        setSelectedDay(1); // Reset to day 1 when changing month
    };

    return (
        <div className="daily-tasks-container">
            {/* Left Sidebar */}
            <div className="daily-tasks-sidebar">
                <button onClick={() => navigate('/')} className="back-btn-new">
                    ← Back to Calendar
                </button>

                <div className="daily-sidebar-header">
                    <h2>Daily Tasks</h2>
                </div>

                {/* Month Selector */}
                <div className="month-selector-vertical">
                    <div className="month-display">
                        <button onClick={goToPreviousMonth} className="month-nav-btn-small">
                            ←
                        </button>
                        <h3>{formatMonthYear(currentDate)}</h3>
                        <button onClick={goToNextMonth} className="month-nav-btn-small">
                            →
                        </button>
                    </div>
                </div>

                {/* Day Selector */}
                <div className="day-selector">
                    <h4>SELECT DATE</h4>
                    <div className="day-buttons-grid">
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`day-btn ${selectedDay === day ? 'active' : ''}`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add Task Form */}
                <div className="add-task-section">
                    <h4>ADD TASK FOR TODAY</h4>
                    <form onSubmit={handleAddTask} className="task-form-vertical">
                        <input
                            type="text"
                            placeholder="Enter task..."
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="task-input-vertical"
                        />
                        <button type="submit" className="add-btn-vertical">
                            + Add Task
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="daily-tasks-content">
                <div className="tasks-header">
                    <h2>Tasks for today</h2>
                    <p className="task-date">{formatMonthYear(currentDate)}</p>
                </div>

                <div className="tasks-display">
                    {dailyTasks.length === 0 ? (
                        <div className="empty-tasks-message">
                            <p>No tasks for this day yet.</p>
                            <p className="hint">Add a task using the sidebar →</p>
                        </div>
                    ) : (
                        <div className="tasks-list-vertical">
                            {dailyTasks.map((task) => (
                                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={task.completed || false}
                                            onChange={() => handleToggleComplete(task.id, task.completed)}
                                            className="task-checkbox"
                                        />
                                        <span className="checkmark"></span>
                                    </label>

                                    <span className={`task-title-new ${task.completed ? 'completed-text' : ''}`}>
                                        {task.title}
                                    </span>

                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="delete-btn-new"
                                        title="Delete task"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
