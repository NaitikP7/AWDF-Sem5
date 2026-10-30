import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import Auth from './Auth';
import { API_BASE_URL } from '../config';

const Projects = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        throw new Error('Session expired, please login again.');
      }
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();
      setTasks(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiNotice, setAiNotice] = useState(null);

  const handleGenerateAiDescription = async () => {
    if (!title.trim()) {
      setError("Please enter a task title first so AI can generate a relevant description.");
      return;
    }

    try {
      setAiLoading(true);
      setError(null);
      setAiNotice(null);

      // Attempt configured backend port 5000 first, fallback to 3000 if running via proxy
      let res;
      try {
        res = await fetch('http://localhost:5000/api/ai/generate-description', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: title.trim() }),
        });
      } catch (networkErr) {
        // Fallback port attempt
        res = await fetch('http://localhost:3000/api/ai/generate-description', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: title.trim() }),
        });
      }

      const data = await res.json();

      if (data.description) {
        setDescription(data.description);
        if (data.fallback) {
          setAiNotice({
            type: 'fallback',
            message: data.reason || 'Generated using local smart fallback (API quota or invalid key). You can edit this suggestion.',
          });
        } else {
          setAiNotice({
            type: 'success',
            message: `AI description generated successfully via ${data.provider || 'AI'}! You can review or edit it below.`,
          });
        }
      } else {
        throw new Error(data.error?.message || 'Failed to generate description');
      }
    } catch (err) {
      console.error('[AI Error]', err);
      // Graceful frontend error handling - does not break the form
      setAiNotice({
        type: 'fallback',
        message: 'Could not contact AI service. You can type the description manually.',
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
      });
      
      const data = await response.json();
      if (!response.ok) {
         throw new Error(data.error?.message || 'Failed to create task');
      }
      
      setTasks([data.data, ...tasks]);
      setTitle('');
      setDescription('');
      setAiNotice(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !currentStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update task');
      const data = await response.json();
      
      setTasks(tasks.map(t => t._id === taskId ? data.data : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete task');
      
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setTasks([]);
  };

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className='flex flex-col items-center p-10 w-full min-h-screen text-white bg-slate-900'>
      <div className='w-full max-w-4xl'>
        <div className='flex justify-between items-center mb-10'>
          <div>
            <h2 className='text-4xl font-bold text-cyan-400 mb-2'>Task Management</h2>
            <p className='text-slate-400 text-sm'>Manage your daily tasks and priorities</p>
          </div>
          <button 
            onClick={handleLogout}
            className='bg-slate-700 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm transition-colors'
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleCreateTask} className='bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8'>
          <h3 className='text-lg font-semibold mb-4 text-cyan-400'>Create New Task</h3>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Task Title (e.g. Design Landing Page)'
                className='flex-grow px-4 py-2 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-lg text-white'
                required
              />
              <button
                type='button'
                onClick={handleGenerateAiDescription}
                disabled={aiLoading || !title.trim()}
                className='flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap'
                title='Auto-generate a description using AI based on task title'
              >
                {aiLoading ? (
                  <>
                    <span className='animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full'></span>
                    Generating...
                  </>
                ) : (
                  <>
                    <span>✨</span> Generate Description
                  </>
                )}
              </button>
            </div>

            {aiNotice && (
              <div
                className={`p-3 rounded-lg text-xs flex items-center justify-between border ${
                  aiNotice.type === 'success'
                    ? 'bg-purple-950/60 border-purple-500/50 text-purple-200'
                    : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                }`}
              >
                <span>{aiNotice.message}</span>
                <button
                  type='button'
                  onClick={() => setAiNotice(null)}
                  className='text-slate-400 hover:text-white font-bold ml-2'
                >
                  ✕
                </button>
              </div>
            )}

            <div className='relative'>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Task Description (AI generated or manual suggestion - fully editable)'
                className='w-full px-4 py-2 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-lg text-white resize-none h-24'
              />
              {description && (
                <span className='absolute bottom-2 right-3 text-xs text-slate-500 pointer-events-none'>
                  Editable suggestion
                </span>
              )}
            </div>

            <button
              type='submit'
              disabled={loading}
              className='bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors'
            >
              Add Task
            </button>
          </div>
        </form>

        {loading && tasks.length === 0 && <Spinner />}
        {error && <ErrorMessage message={error} />}

        <div className='flex flex-col gap-4'>
          {tasks.map(task => (
            <div key={task._id} className={`p-6 rounded-xl border transition-colors ${task.completed ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-800 border-slate-600'}`}>
              <div className='flex justify-between items-start gap-4'>
                <div className='flex-grow'>
                  <h4 className={`text-xl font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className={`mt-2 text-sm ${task.completed ? 'text-slate-500' : 'text-slate-300'}`}>
                      {task.description}
                    </p>
                  )}
                  
                  {/* HATEOAS Links preview */}
                  {task._links && (
                    <div className='mt-4 flex gap-2 text-xs text-slate-500'>
                      <span className='bg-slate-900 px-2 py-1 rounded'>Self: {task._links.self}</span>
                    </div>
                  )}
                </div>
                
                <div className='flex gap-2 flex-shrink-0'>
                  <button
                    onClick={() => handleToggleComplete(task._id, task.completed)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      task.completed 
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                        : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/50'
                    }`}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className='px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 rounded-lg text-sm font-medium transition-colors'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!loading && tasks.length === 0 && !error && (
            <div className='text-center py-10 text-slate-500'>
              No tasks found. Create one above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
