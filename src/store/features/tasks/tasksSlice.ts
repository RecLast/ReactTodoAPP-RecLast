import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TaskPriority = 'low' | 'medium' | 'high'
type TaskStatus = 'pending' | 'completed'
type TaskTimeframe = 'daily' | 'weekly' | 'monthly' | 'project'

interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  timeframe: TaskTimeframe
  projectId?: string
  createdAt: string
  completedAt?: string
  dueDate?: string
}

interface TasksState {
  items: Task[]
  loading: boolean
  error: string | null
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TasksState>) => {
      state.items = action.payload.items;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      state.items.push(newTask)
    },
    updateTask: (state, action: PayloadAction<Partial<Task> & { id: string }>) => {
      const index = state.items.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(task => task.id !== action.payload)
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.items.find(task => task.id === action.payload)
      if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed'
        task.completedAt = task.status === 'completed' ? new Date().toISOString() : undefined
      }
    },
  },
})

export const { addTask, updateTask, deleteTask, toggleTaskStatus } = tasksSlice.actions
export default tasksSlice.reducer