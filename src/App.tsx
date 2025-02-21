import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Layout from '@/components/Layout'
import DailyTasks from '@/pages/DailyTasks'
import WeeklyTasks from '@/pages/WeeklyTasks'
import MonthlyTasks from '@/pages/MonthlyTasks'
import ProjectTasks from '@/pages/ProjectTasks'
import Projects from '@/pages/Projects'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/daily" element={<DailyTasks />} />
        <Route path="/weekly" element={<WeeklyTasks />} />
        <Route path="/monthly" element={<MonthlyTasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectTasks />} />
      </Routes>
    </Layout>
  )
}

export default App