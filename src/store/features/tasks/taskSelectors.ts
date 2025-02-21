import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

// Base selector for tasks
const selectTasks = (state: RootState) => state.tasks.items;

// Memoized selector for daily tasks
export const selectDailyTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter(task => task.timeframe === 'daily')
);

// Memoized selector for weekly tasks
export const selectWeeklyTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter(task => task.timeframe === 'weekly')
);

// Memoized selector for monthly tasks
export const selectMonthlyTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter(task => task.timeframe === 'monthly')
);

// Memoized selector for project tasks
export const selectProjectTasks = createSelector(
  [selectTasks, (_state: RootState, projectId: string) => projectId],
  (tasks, projectId) => tasks.filter(task => task.projectId === projectId)
);

// Memoized selector for pending tasks
export const selectPendingTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter(task => task.status === 'pending')
);

// Memoized selector for completed tasks
export const selectCompletedTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter(task => task.status === 'completed')
);