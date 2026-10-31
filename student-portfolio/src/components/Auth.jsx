import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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

      if (!isLogin) {
        setIsLogin(true);
        setNotice("Your account is ready. Sign in to continue.");
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
    <div className='auth-page'>
      <div className='auth-layout'>
        <section className='auth-story'>
          <div className='auth-brand'><span><Sparkles size={17}/></span> TASKSPACE</div>
          <div className='auth-story-copy'>
            <span className='section-number'>A CLEARER WAY TO GET THINGS DONE</span>
            <h1>Make space for<br/><span>what matters.</span></h1>
            <p>Sign in to organize your tasks, track progress, and keep your next steps close.</p>
          </div>
          <div className='auth-story-footer'><span className='auth-story-mark'>01</span><span>YOUR PERSONAL WORKSPACE</span><i/></div>
          <div className='auth-decoration' aria-hidden='true'><span/><span/><span/></div>
        </section>

        <section className='auth-card' aria-labelledby='auth-title'>
          <div className='auth-tabs' role='tablist' aria-label='Account access'>
            <button type='button' role='tab' aria-selected={isLogin} className={isLogin ? 'active' : ''} onClick={() => { setIsLogin(true); setError(null); setNotice(null); }}>Sign in</button>
            <button type='button' role='tab' aria-selected={!isLogin} className={!isLogin ? 'active' : ''} onClick={() => { setIsLogin(false); setError(null); setNotice(null); }}>Create account</button>
          </div>

          <div className='auth-heading'>
            <span className='auth-heading-icon'><LockKeyhole size={18}/></span>
            <h2 id='auth-title'>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            <p>{isLogin ? 'Enter your details to access your workspace.' : 'A few details and your workspace is ready.'}</p>
          </div>

          {error && <div className='auth-feedback error' role='alert'>{error}</div>}
          {notice && <div className='auth-feedback success' role='status'>{notice}</div>}

          <form onSubmit={handleSubmit} className='auth-form'>
            <div className='auth-field'>
              <label htmlFor='auth-email'>Email address</label>
              <div className='auth-input-wrap'><Mail size={17}/><input id='auth-email' type='email' autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='you@example.com' required /></div>
            </div>
            <div className='auth-field'>
              <div className='auth-label-row'><label htmlFor='auth-password'>Password</label>{!isLogin && <span>At least 6 characters</span>}</div>
              <div className='auth-input-wrap'><LockKeyhole size={17}/><input id='auth-password' type={showPassword ? 'text' : 'password'} autoComplete={isLogin ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' required minLength={6} /><button type='button' className='password-toggle' aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</button></div>
            </div>
            <button type='submit' disabled={loading} className='auth-submit'>
              {loading ? <><span className='auth-spinner'/> {isLogin ? 'Signing in…' : 'Creating account…'}</> : <>{isLogin ? 'Sign in to workspace' : 'Create account'} <ArrowRight size={17}/></>}
            </button>
          </form>

          <div className='auth-secure-note'><ShieldCheck size={16}/><span>Passwords are protected with a one-way hash.</span></div>
          <p className='auth-switch'>{isLogin ? "New to Taskspace?" : 'Already have an account?'} <button type='button' onClick={() => { setIsLogin(!isLogin); setError(null); setNotice(null); }}>{isLogin ? 'Create an account' : 'Sign in'}</button></p>
        </section>
      </div>
    </div>
  );
};

export default Auth;
