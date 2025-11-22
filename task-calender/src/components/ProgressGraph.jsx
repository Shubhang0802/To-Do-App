import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { getMonthKey, getDaysInMonth, getDayKey } from '../utils/dateUtils';

export default function ProgressGraph({ currentDate }) {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [hoveredPoint, setHoveredPoint] = useState(null);

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

    // Calculate daily completion percentages from real-time task data
    const dailyScores = useMemo(() => {
        if (tasks.length === 0) return [];

        const scores = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const dayKey = getDayKey(day);
            let completedCount = 0;

            // Count how many tasks have this day checked
            for (const task of tasks) {
                if (task.checks?.[dayKey] === true) {
                    completedCount++;
                }
            }

            const percentage = (completedCount / tasks.length) * 100;
            scores.push({ day, percentage });
        }

        return scores;
    }, [tasks, daysInMonth]);

    // SVG dimensions
    const width = 800;
    const height = 200;
    const padding = 40;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Calculate points for the line
    const points = useMemo(() => {
        if (dailyScores.length === 0) return [];

        return dailyScores.map((score, index) => {
            const x = padding + (index / (daysInMonth - 1)) * graphWidth;
            const y = padding + graphHeight - (score.percentage / 100) * graphHeight;
            return { x, y, day: score.day, percentage: score.percentage };
        });
    }, [dailyScores, daysInMonth, graphWidth, graphHeight]);

    // Generate SVG path
    const linePath = useMemo(() => {
        if (points.length === 0) return '';

        let path = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x} ${points[i].y}`;
        }
        return path;
    }, [points]);

    return (
        <div className="progress-graph">
            <h3>Daily Progress</h3>

            {dailyScores.length === 0 ? (
                <p className="empty-graph-message">Add tasks and check them off to see your progress!</p>
            ) : (
                <div className="graph-container">
                    <svg width={width} height={height} className="graph-svg">
                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="100%" stopColor="#764ba2" />
                            </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        {[0, 25, 50, 75, 100].map((percent) => {
                            const y = padding + graphHeight - (percent / 100) * graphHeight;
                            return (
                                <g key={percent}>
                                    <line
                                        x1={padding}
                                        y1={y}
                                        x2={width - padding}
                                        y2={y}
                                        stroke="#e5e7eb"
                                        strokeWidth="1"
                                    />
                                    <text
                                        x={padding - 10}
                                        y={y + 5}
                                        textAnchor="end"
                                        fontSize="12"
                                        fill="#6b7280"
                                    >
                                        {percent}%
                                    </text>
                                </g>
                            );
                        })}

                        {/* Line path */}
                        <path
                            d={linePath}
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Data points */}
                        {points.map((point, index) => (
                            <circle
                                key={index}
                                cx={point.x}
                                cy={point.y}
                                r="5"
                                fill="url(#lineGradient)"
                                stroke="#ffffff"
                                strokeWidth="2"
                                onMouseEnter={() => setHoveredPoint(point)}
                                onMouseLeave={() => setHoveredPoint(null)}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}

                        {/* Tooltip */}
                        {hoveredPoint && (
                            <g>
                                <rect
                                    x={hoveredPoint.x - 40}
                                    y={hoveredPoint.y - 40}
                                    width="80"
                                    height="30"
                                    fill="#1f2937"
                                    rx="5"
                                    opacity="0.9"
                                />
                                <text
                                    x={hoveredPoint.x}
                                    y={hoveredPoint.y - 20}
                                    textAnchor="middle"
                                    fill="#ffffff"
                                    fontSize="12"
                                    fontWeight="bold"
                                >
                                    Day {hoveredPoint.day}: {hoveredPoint.percentage.toFixed(1)}%
                                </text>
                            </g>
                        )}
                    </svg>
                </div>
            )}
        </div>
    );
}
