import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { getMonthKey, getDaysInMonth, getDayKey, formatMonthYear, getNextMonth, getPreviousMonth } from '../utils/dateUtils';

export default function CalendarGrid({ currentDate, onDateChange }) {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);

    const monthKey = getMonthKey(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);

    // Real-time listener for tasks (includes checks map)
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

    // Toggle checkbox
    const handleCheckboxChange = async (taskId, day) => {
        const dayKey = getDayKey(day);
        const task = tasks.find(t => t.id === taskId);

        // Current checkbox state from task.checks map
        const currentState = task?.checks?.[dayKey] === true;
        const newCheckedState = !currentState;

        try {
            const taskRef = doc(db, 'users', currentUser.uid, 'months', monthKey, 'tasks', taskId);

            // Update using dot notation: "checks.01", "checks.02", etc.
            await updateDoc(taskRef, {
                [`checks.${dayKey}`]: newCheckedState
            });
        } catch (error) {
            console.error('Error updating checkbox:', error);
            alert('Failed to update checkbox. Please try again.');
        }
    };

    return (
        <div className="calendar-section">
            <div className="calendar-header">
                <button onClick={() => onDateChange(getPreviousMonth(currentDate))} className="nav-btn">
                    ← Previous Month
                </button>
                <h2>{formatMonthYear(currentDate)}</h2>
                <button onClick={() => onDateChange(getNextMonth(currentDate))} className="nav-btn">
                    Next Month →
                </button>
            </div>

            <div className="calendar-grid-wrapper">
                <div className="calendar-grid">
                    {/* Header row with dates */}
                    <div className="grid-header">
                        <div className="task-name-header sticky-column">Task</div>
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                            <div key={day} className="day-header">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Task rows */}
                    {tasks.length === 0 ? (
                        <div className="empty-grid-message">
                            No tasks for this month. Add tasks from the sidebar!
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div key={task.id} className="task-row">
                                <div className="task-name-cell sticky-column">{task.title}</div>
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                                    const dayKey = getDayKey(day);
                                    // Read checkbox state from task.checks map
                                    const isChecked = task.checks?.[dayKey] === true;

                                    return (
                                        <div key={day} className="day-cell">
                                            <label className="checkbox-wrapper">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => handleCheckboxChange(task.id, day)}
                                                    className="checkbox-input"
                                                />
                                                <span className="checkbox-custom"></span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
