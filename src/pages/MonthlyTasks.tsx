import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Circle, CheckCircle } from '@phosphor-icons/react'
import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'
import { selectMonthlyTasks } from '@/store/features/tasks/taskSelectors'

const MonthlyTasks: React.FC = () => {
  const { t } = useTranslation()
  const tasks = useSelector(selectMonthlyTasks)

  const pendingTasks = tasks
    .filter(task => task.status === 'pending')
    .sort((a, b) => new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime())

  const completedTasks = tasks
    .filter(task => task.status === 'completed')
    .sort((a, b) => new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime())

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('monthlyTasks')}</h1>
      
      <TaskForm timeframe="monthly" />
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Circle size={24} className="text-warning" />
            <h2 className="text-xl font-bold">{t('pendingTasks')}</h2>
          </div>
          <div className="grid gap-4">
            {pendingTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
            {pendingTasks.length === 0 && (
              <p className="text-gray-500">{t('noPendingTasks')}</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={24} weight="fill" className="text-success" />
            <h2 className="text-xl font-bold">{t('completedTasks')}</h2>
          </div>
          <div className="grid gap-4">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
            {completedTasks.length === 0 && (
              <p className="text-gray-500">{t('noCompletedTasks')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyTasks