import React, { useState, useEffect } from 'react'
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'
import RepoList from './RepoList'

const Projects = () => {
  const [inputValue, setInputValue] = useState('')
  const [username, setUsername] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const fetchRepos = async () => {
      try {
        setLoading(true)
        setError(null)
        setData([])
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`
        )
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
        }
        const repos = await response.json()
        setData(repos)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setUsername(trimmed)
  }

  return (
    <div className='flex flex-col items-center p-10 w-full min-h-screen text-white bg-slate-900'>
      <div className='w-full max-w-6xl'>
        <div className='mb-10 text-center'>
          <h2 className='text-4xl font-bold text-cyan-400 mb-2'>GitHub Repositories</h2>
          <p className='text-slate-400 text-sm mb-8'>Enter a GitHub username to explore their public repositories</p>

          <form onSubmit={handleSubmit} className='flex items-center gap-3 justify-center'>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
                </svg>
              </span>
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='e.g. torvalds'
                className='pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 focus:border-cyan-500 focus:outline-none rounded-lg text-white placeholder-slate-500 text-sm w-64 transition-colors duration-200'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors duration-200'
            >
              {loading ? 'Loading...' : 'Fetch Repos'}
            </button>
          </form>

          {username && !loading && !error && (
            <p className='mt-4 text-slate-500 text-xs'>
              Showing results for{' '}
              <a
                href={`https://github.com/${username}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-cyan-500 hover:underline'
              >
                @{username}
              </a>
            </p>
          )}
        </div>

        {!username && !loading && (
          <div className='text-center text-slate-600 py-20'>
            <svg className='w-16 h-16 mx-auto mb-4 opacity-40' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
            </svg>
            <p className='text-lg'>Enter a GitHub username above to get started</p>
          </div>
        )}

        {loading && <Spinner />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && data.length > 0 && <RepoList data={data} />}
      </div>
    </div>
  )
}

export default Projects
