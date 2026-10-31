import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import Auth from './Auth';
import { API_BASE_URL } from '../config';
import { Check, Circle, ListTodo, LogOut, Plus, Sparkles, Trash2 } from 'lucide-react';

const Projects = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [filter, setFilter] = useState('all');
  const [pendingTaskId, setPendingTaskId] = useState(null);

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

      const res = await fetch(`${API_BASE_URL}/api/ai/generate-description`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
      });

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
      setPendingTaskId(taskId);
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
    } finally {
      setPendingTaskId(null);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      setPendingTaskId(taskId);
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
    } finally {
      setPendingTaskId(null);
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

  const completedCount = tasks.filter((task) => task.completed).length;
  const visibleTasks = tasks.filter((task) => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed));

  return (
    <div className='task-page'>
      <div className='task-board'>
        <div className='task-header'>
          <div>
            <span className='section-number'>YOUR WORKSPACE</span>
            <h2>Task manager<span>.</span></h2>
            <p>Keep your next steps clear and moving.</p>
          </div>
          <button
            onClick={handleLogout}
            className='logout-button'
          >
            <LogOut size={15}/> Sign out
          </button>
        </div>

        <div className='task-stats'>
          <div><span>Total tasks</span><strong>{tasks.length}</strong><ListTodo size={18}/></div>
          <div><span>Completed</span><strong>{completedCount}</strong><Check size={18}/></div>
          <div><span>In progress</span><strong>{tasks.length - completedCount}</strong><Circle size={17}/></div>
        </div>

        <form onSubmit={handleCreateTask} className='task-form'>
          <h3><span className='form-title-icon'><Plus size={17}/></span> Create a task</h3>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Task Title (e.g. Design Landing Page)'
                className='form-input mt-0'
                required
              />
              <button
                type='button'
                onClick={handleGenerateAiDescription}
                disabled={aiLoading || !title.trim()}
                className='ai-button'
                title='Auto-generate a description using AI based on task title'
              >
                {aiLoading ? (
                  <>
                    <span className='animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full'></span>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={15}/> Generate with AI
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
              className='button-primary justify-center'
            >
              <Plus size={16}/> Add task
            </button>
          </div>
        </form>

        {loading && tasks.length === 0 && <Spinner />}
        {error && <ErrorMessage message={error} />}

        <div className='task-list-heading'><div><h3>Your tasks</h3><p>Organize one step at a time.</p></div><div className='task-filters' role='group' aria-label='Filter tasks'>{['all','active','completed'].map((option) => <button key={option} type='button' className={filter === option ? 'selected' : ''} onClick={() => setFilter(option)}>{option[0].toUpperCase()+option.slice(1)}</button>)}</div></div>
        <div className='task-list'>
          {visibleTasks.map(task => (
            <div key={task._id} className={`task-card ${task.completed ? 'is-complete' : ''}`}>
              <div className='flex justify-between items-start gap-4'>
                <div className='flex-grow'>
                  <h4 className={task.completed ? 'line-through' : ''}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p>
                      {task.description}
                    </p>
                  )}
                  
                  {/* HATEOAS Links preview */}
                  {task._links && (
                    <div className='task-resource-link'>
                      <span>API resource</span><code>{task._links.self}</code>
                    </div>
                  )}
                </div>
                
                <div className='flex gap-2 flex-shrink-0'>
                  <button
                    disabled={pendingTaskId === task._id}
                    onClick={() => handleToggleComplete(task._id, task.completed)}
                    className={`task-action disabled:opacity-50 ${
                      task.completed 
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                        : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/50'
                    }`}
                  >
                    {pendingTaskId === task._id ? 'Saving…' : task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    disabled={pendingTaskId === task._id}
                    onClick={() => handleDelete(task._id)}
                    className='task-action delete-action'
                  >
                    <Trash2 size={14}/> {pendingTaskId === task._id ? 'Removing…' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!loading && visibleTasks.length === 0 && !error && (
            <div className='task-empty'>
              <span className='empty-icon'><ListTodo size={22}/></span>
              <strong>{tasks.length === 0 ? 'Your task list is clear.' : 'No tasks in this view.'}</strong>
              <p>{tasks.length === 0 ? 'Add a task above to get started.' : 'Try another filter to see more tasks.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
