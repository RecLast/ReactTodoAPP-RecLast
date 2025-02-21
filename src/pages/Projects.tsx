import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronUpIcon, ChevronDownIcon, TrashIcon, FolderIcon, BeakerIcon, BookmarkIcon, BriefcaseIcon, CalendarIcon, ChatBubbleLeftIcon, ClipboardDocumentIcon, CodeBracketIcon, CogIcon, CommandLineIcon, DocumentIcon, GlobeAltIcon, PuzzlePieceIcon, RocketLaunchIcon, StarIcon, WrenchIcon } from '@heroicons/react/24/outline'
import { addProject, deleteProject } from '@/store/features/projects/projectsSlice'
import { RootState } from '@/store'
import { Project } from '@/store/features/projects/projectsSlice'

const Projects: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const projects = useSelector((state: RootState) => state.projects.items)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'FolderIcon'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    dispatch(addProject({
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      icon: formData.icon
    }))
    setFormData({
      name: '',
      description: '',
      icon: 'FolderIcon'
    })
    setIsFormVisible(false)
  }

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(projectId))
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('projects')}</h1>

      {/* Project Form */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="w-full flex items-center justify-between bg-primary text-white py-2 px-4 rounded-t-lg hover:bg-primary/90 transition-colors"
        >
          <span>{t('addProject')}</span>
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('projectName')}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                {t('icon')}
              </label>
              <select
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="FolderIcon">{t('folder')}</option>
                <option value="BeakerIcon">{t('beaker')}</option>
                <option value="BookmarkIcon">{t('bookmark')}</option>
                <option value="BriefcaseIcon">{t('briefcase')}</option>
                <option value="CalendarIcon">{t('calendar')}</option>
                <option value="ChatBubbleLeftIcon">{t('chat')}</option>
                <option value="ClipboardDocumentIcon">{t('clipboard')}</option>
                <option value="CodeBracketIcon">{t('code')}</option>
                <option value="CogIcon">{t('settings')}</option>
                <option value="CommandLineIcon">{t('terminal')}</option>
                <option value="DocumentIcon">{t('document')}</option>
                <option value="GlobeAltIcon">{t('globe')}</option>
                <option value="PuzzlePieceIcon">{t('puzzle')}</option>
                <option value="RocketLaunchIcon">{t('rocket')}</option>
                <option value="StarIcon">{t('star')}</option>
                <option value="WrenchIcon">{t('wrench')}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              {t('createProject')}
            </button>
          </div>
        </form>
      </div>

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.map((project: Project) => (
          <div key={project.id} className="relative group">
            <Link
              to={`/projects/${project.id}`}
              className="block bg-card-bg p-4 rounded-lg shadow-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2">
                {(() => {
                  const IconComponent = ({
                    FolderIcon, BeakerIcon, BookmarkIcon, BriefcaseIcon, CalendarIcon,
                    ChatBubbleLeftIcon, ClipboardDocumentIcon, CodeBracketIcon, CogIcon,
                    CommandLineIcon, DocumentIcon, GlobeAltIcon, PuzzlePieceIcon,
                    RocketLaunchIcon, StarIcon, WrenchIcon
                  }[project.icon || 'FolderIcon']) as React.ComponentType<{ className: string }>;
                  return <IconComponent className="w-5 h-5 text-gray-600" />
                })()} 
                <h3 className="text-lg font-semibold">{project.name}</h3>
              </div>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                {t('created')}: {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </Link>
            <button
              onClick={(e) => handleDeleteProject(project.id, e)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-error transition-colors opacity-0 group-hover:opacity-100"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-gray-500 text-center py-4">{t('noProjects')}</p>
        )}
      </div>
    </div>
  )
}

export default Projects