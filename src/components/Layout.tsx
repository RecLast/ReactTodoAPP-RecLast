import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ChartBarIcon, CalendarDaysIcon, CalendarIcon, FolderIcon, BeakerIcon, BookmarkIcon, BriefcaseIcon, ChatBubbleLeftIcon, ClipboardDocumentIcon, CodeBracketIcon, CogIcon, CommandLineIcon, DocumentIcon, GlobeAltIcon, PuzzlePieceIcon, RocketLaunchIcon, StarIcon, WrenchIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { RootState } from '@/store'
import { Project } from '@/store/features/projects/projectsSlice'
import Settings from './Settings'

interface LayoutProps {
  children: React.ReactNode
}

interface NavigationSubItem {
  name: string
  path: string
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const projects = useSelector((state: RootState) => state.projects.items)

  const navigation = [
    { name: t('dashboard'), path: '/', icon: ChartBarIcon },
    { name: t('dailyTasks'), path: '/daily', icon: CalendarDaysIcon },
    { name: t('weeklyTasks'), path: '/weekly', icon: CalendarIcon },
    { name: t('monthlyTasks'), path: '/monthly', icon: CalendarIcon },
    {
      name: t('projects'),
      path: '/projects',
      icon: FolderIcon,
      subItems: projects?.map((project: Project) => ({
        name: project.name,
        path: `/projects/${project.id}`,
      }))
    },
  ]

  return (
    <div className="min-h-screen h-screen flex flex-col bg-background overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card-bg shadow-card p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">RecLast TodoApp</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:text-primary transition-colors"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-8 h-8" />
          ) : (
            <Bars3Icon className="w-8 h-8" />
          )}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-30
          transform lg:transform-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition duration-300 ease-in-out
          w-72 bg-card-bg shadow-card flex flex-col h-full
        `}>
          <div className="p-6 hidden lg:block">
            <h1 className="text-3xl font-bold text-primary">RecLast TodoApp</h1>
          </div>
          <nav className="mt-6 flex-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-3 my-1 mx-2 rounded-lg text-lg ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Icon className="w-6 h-6 mr-3" />
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="ml-8 space-y-2">
                      {item.subItems.map((subItem: NavigationSubItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`flex items-center gap-3 px-4 py-2 text-base ${location.pathname === subItem.path ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                        >
                          {(() => {
                            const project = projects.find(p => `/projects/${p.id}` === subItem.path);
                            const IconComponent = ({
                              FolderIcon, BeakerIcon, BookmarkIcon, BriefcaseIcon, CalendarIcon,
                              ChatBubbleLeftIcon, ClipboardDocumentIcon, CodeBracketIcon, CogIcon,
                              CommandLineIcon, DocumentIcon, GlobeAltIcon, PuzzlePieceIcon,
                              RocketLaunchIcon, StarIcon, WrenchIcon
                            }[project?.icon || 'FolderIcon']) as React.ComponentType<{ className: string }>;
                            return <IconComponent className="w-5 h-5" />;
                          })()}
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
          <div className="mt-auto border-t border-gray-200">
            <Settings />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-10 w-full max-w-[1920px] mx-auto overflow-y-auto">
          {children}
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Layout