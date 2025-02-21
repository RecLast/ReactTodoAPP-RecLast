import { store } from '@/store';

export const cacheManager = {
  // Initialize cache from localStorage or return default state
  initializeCache: () => {
    try {
      const tasksCache = localStorage.getItem('tasks');
      const projectsCache = localStorage.getItem('projects');

      return {
        tasks: tasksCache ? JSON.parse(tasksCache) : null,
        projects: projectsCache ? JSON.parse(projectsCache) : null
      };
    } catch (err) {
      console.error('Error initializing cache:', err);
      return { tasks: null, projects: null };
    }
  },

  // Save changes to cache only when state updates
  saveToCache: (state: any) => {
    try {
      const currentTasks = localStorage.getItem('tasks');
      const currentProjects = localStorage.getItem('projects');

      // Only update if state has changed
      if (JSON.stringify(state.tasks) !== currentTasks) {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
      if (JSON.stringify(state.projects) !== currentProjects) {
        localStorage.setItem('projects', JSON.stringify(state.projects));
      }
    } catch (err) {
      console.error('Error saving to cache:', err);
    }
  },

  // Clear all cache data from localStorage
  clearCache: () => {
    try {
      localStorage.removeItem('tasks');
      localStorage.removeItem('projects');
      // Reload the page to reset the Redux store
      window.location.reload();
    } catch (err) {
      console.error('Error clearing cache:', err);
      throw new Error('Failed to clear cache');
    }
  },

  // Download current cache as JSON file
  downloadCache: () => {
    try {
      const state = store.getState();
      const cacheData = {
        tasks: state.tasks,
        projects: state.projects,
        version: '1.0',
        exportedAt: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(cacheData, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `todo-cache-${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading cache:', err);
      throw new Error('Failed to download cache');
    }
  },

  // Upload and restore cache from JSON file
  uploadCache: async (file: File) => {
    try {
      const text = await file.text();
      const cacheData = JSON.parse(text);

      // Validate cache data structure
      if (!cacheData.tasks || !cacheData.projects) {
        throw new Error('Invalid cache file format');
      }

      // Store the new data
      localStorage.setItem('tasks', JSON.stringify(cacheData.tasks));
      localStorage.setItem('projects', JSON.stringify(cacheData.projects));

      // Reload the page to apply the new cache
      window.location.reload();
    } catch (err) {
      console.error('Error uploading cache:', err);
      throw new Error('Failed to upload cache');
    }
  }
};