import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './features/tasks/tasksSlice'
import projectsReducer from './features/projects/projectsSlice'

// Load initial state from localStorage if available
const loadState = () => {
  try {
    const tasksData = localStorage.getItem('tasks')
    const projectsData = localStorage.getItem('projects')
    return {
      tasks: tasksData ? JSON.parse(tasksData) : { items: [], loading: false, error: null },
      projects: projectsData ? JSON.parse(projectsData) : { items: [] },
    }
  } catch (err) {
    console.error('Error loading state:', err)
    return {
      tasks: { items: [], loading: false, error: null },
      projects: { items: [] }
    }
  }
}

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
  },
  preloadedState: loadState()
})

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  const state = store.getState()
  try {
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
    localStorage.setItem('projects', JSON.stringify(state.projects))
  } catch (err) {
    console.error('Error saving state:', err)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch