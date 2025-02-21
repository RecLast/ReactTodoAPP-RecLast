import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '@/store/features/tasks/tasksSlice'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface TaskFormProps {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'project'
}

const TaskForm: React.FC<TaskFormProps> = ({ timeframe }) => {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const { t } = useTranslation()

  const [isFormVisible, setIsFormVisible] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addTask({
      ...formData,
      status: 'pending',
      timeframe,
      projectId: timeframe === 'project' ? projectId : undefined
    }))
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full flex items-center justify-between bg-primary text-white py-2 px-4 rounded-t-lg hover:bg-primary/90 transition-colors"
      >
        <span>{t('addTask')}</span>
        {isFormVisible ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </button>
      <form
        onSubmit={handleSubmit}
        className={`bg-card-bg p-4 rounded-b-lg shadow-card transition-all duration-300 ease-in-out overflow-hidden ${isFormVisible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              {t('title')}
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              {t('description')}
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                {t('priority')}
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="low">{t('low')}</option>
                <option value="medium">{t('medium')}</option>
                <option value="high">{t('high')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                {t('dueDate')}
              </label>
              <input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            {t('addTask')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm