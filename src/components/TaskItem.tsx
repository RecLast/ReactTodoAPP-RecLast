import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { TrashIcon } from '@heroicons/react/24/outline'
import { CheckCircle, Circle } from '@phosphor-icons/react'
import { toggleTaskStatus, deleteTask } from '@/store/features/tasks/tasksSlice'
import { Task } from '@/types'

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id))
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  return (
    <div className="bg-card-bg p-6 rounded-lg shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleStatus}
            className="text-gray-500 hover:text-primary transition-colors"
          >
            {task.status === 'completed' ? (
              <CheckCircle size={28} weight="fill" className="text-primary" />
            ) : (
              <Circle size={28} className="text-gray-400" />
            )}
          </button>
          <div>
            <h3 className={`text-xl font-semibold transition-all duration-200 ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            <p className={`text-lg text-gray-600 mt-2 transition-all duration-200 ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
              {task.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1.5 rounded text-base ${task.priority === 'high' ? 'bg-error/10 text-error' : task.priority === 'medium' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
            {t(task.priority)}
          </span>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-error transition-colors"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      {task.dueDate && (
        <div className="text-base text-gray-500 mt-3">
          {t('due')}: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}

export default TaskItem