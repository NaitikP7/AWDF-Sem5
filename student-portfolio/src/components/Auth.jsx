import React, { useState } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || data.message || 'Authentication failed');
      }

      // If registration is successful, usually you don't get a token back in our API, 
      // but let's assume we can just switch to login.
      if (!isLogin) {
        setIsLogin(true);
        setError("Registration successful! Please login.");
        setEmail('');
        setPassword('');
      } else {
        localStorage.setItem('token', data.token);
        onAuthSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-10 w-full min-h-screen text-white bg-slate-900'>
      <div className='w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700'>
        <h2 className='text-3xl font-bold text-cyan-400 mb-6 text-center'>
          {isLogin ? 'Login' : 'Register'}
        </h2>
        
        {error && <ErrorMessage message={error} />}
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
          <div>
            <label className='block text-slate-400 text-sm mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 bg-slate-900 border border-slate-700 focus:border-cyan-500 focus:outline-none rounded-lg text-white'
              required
            />
          </div>
          <div>
            <label className='block text-slate-400 text-sm mb-2'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 bg-slate-900 border border-slate-700 focus:border-cyan-500 focus:outline-none rounded-lg text-white'
              required
              minLength={6}
            />
          </div>
          
          <button
            type='submit'
            disabled={loading}
            className='w-full mt-4 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors'
          >
            {loading ? <Spinner /> : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <p className='mt-6 text-center text-slate-400 text-sm'>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className='text-cyan-500 hover:underline'
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
