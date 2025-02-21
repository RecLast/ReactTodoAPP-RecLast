import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RootState } from '@/store'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import i18n from '@/i18n'

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const tasks = useSelector((state: RootState) => state.tasks.items) || [];
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const upcomingTasks = tasks.filter(task => task.status === 'pending');

  const hoursLogged = tasks.reduce((total, task) => {
    if (task.status === 'completed') {
      const completedDate = new Date(task.completedAt!)
      const createdDate = new Date(task.createdAt)
      const hours = Math.round((completedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60))
      return total + hours
    }
    return total
  }, 0)

  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1)
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    const dayTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt)
      return taskDate.toDateString() === date.toDateString()
    })
    return {
      name: date.toLocaleDateString(i18n.language, { weekday: 'short' }),
      hours: dayTasks.length * 2
    }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-success/10 p-6 rounded-lg shadow-card">
          <div className="text-4xl font-bold text-success">{completedTasks.length}</div>
          <div className="text-sm text-gray-600">{t('taskCompleted')}</div>
        </div>
        
        <div className="bg-primary/10 p-6 rounded-lg shadow-card">
          <div className="text-4xl font-bold text-primary">{upcomingTasks.length}</div>
          <div className="text-sm text-gray-600">{t('upcomingTask')}</div>
        </div>
        
        <div className="bg-warning/10 p-6 rounded-lg shadow-card">
          <div className="text-4xl font-bold text-warning">{hoursLogged}</div>
          <div className="text-sm text-gray-600">{t('hoursLogged')}</div>
        </div>
        
        <div className="bg-secondary/10 p-6 rounded-lg shadow-card">
          <div className="text-4xl font-bold text-secondary">{tasks.length}</div>
          <div className="text-sm text-gray-600">{t('filesUploaded')}</div>
        </div>
      </div>

      <div className="bg-card-bg p-6 rounded-lg shadow-card">
        <h2 className="text-lg font-semibold mb-4">{t('hoursLogged')}</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: t('hoursLogged'), angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="hours" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard