import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '@/store'
import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'

const ProjectTasks: React.FC = () => {
  const { projectId } = useParams()
  const tasks = useSelector((state: RootState) => 
    state.tasks.items
      .filter(task => task.timeframe === 'project' && task.projectId === projectId)
      .sort((a, b) => new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Project Tasks</h1>
      
      <TaskForm timeframe="project" />
      
      <div className="grid gap-4">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default ProjectTasks