export interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'completed'
  dueDate?: string
  timeframe: 'daily' | 'weekly' | 'monthly' | 'project'
  projectId?: string
}