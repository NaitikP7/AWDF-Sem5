import React from 'react'

const RepoList = ({ data }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl'>
      {data.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target='_blank'
          rel='noopener noreferrer'
          className='block bg-slate-800 border border-slate-700 hover:border-cyan-500/60 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 group'
        >
          <div className='flex items-start justify-between mb-3'>
            <div className='flex items-center gap-2'>
              <svg className='w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
              </svg>
              <span className='text-cyan-400 font-semibold text-sm group-hover:text-cyan-300 transition-colors truncate max-w-[160px]'>
                {repo.name}
              </span>
            </div>
            {repo.private ? (
              <span className='text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full shrink-0'>Private</span>
            ) : (
              <span className='text-xs bg-cyan-900/40 text-cyan-400 px-2 py-0.5 rounded-full shrink-0'>Public</span>
            )}
          </div>

          <p className='text-slate-400 text-sm mb-4 line-clamp-2 min-h-[40px]'>
            {repo.description || 'No description provided.'}
          </p>

          <div className='flex items-center justify-between text-xs text-slate-500'>
            <div className='flex items-center gap-3'>
              {repo.language && (
                <span className='flex items-center gap-1'>
                  <span className='w-2 h-2 rounded-full bg-cyan-400'></span>
                  {repo.language}
                </span>
              )}
              <span className='flex items-center gap-1'>
                <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                </svg>
                {repo.stargazers_count}
              </span>
            </div>
            <span className='text-cyan-500/70 group-hover:text-cyan-400 transition-colors'>View →</span>
          </div>
        </a>
      ))}
    </div>
  )
}

export default RepoList
