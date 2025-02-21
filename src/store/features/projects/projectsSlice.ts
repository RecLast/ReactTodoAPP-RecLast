import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  icon?: string
}

interface ProjectsState {
  items: Project[]
}

const initialState: ProjectsState = {
  items: []
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectsState>) => {
      state.items = action.payload.items;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.push(action.payload)
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.items.findIndex(project => project.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(project => project.id !== action.payload)
    }
  }
})

export const { addProject, updateProject, deleteProject } = projectsSlice.actions
export default projectsSlice.reducer