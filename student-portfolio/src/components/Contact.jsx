import React, { useState } from 'react'
import { Send, MessageCircle } from 'lucide-react'

const Contact = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [showTip, setShowTip] = useState(false)

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks, ${name}! Your message is ready to send.`)
    setName('');
    setMessage('')
  }

  return (
    <section className='contact-page'>
      <div className='contact-intro'><span className='section-number'>03 / CONTACT</span><h2>Have a good idea?<br/><span>Let’s make it real.</span></h2><p>Have a question, opportunity, or just want to say hello? Send a note through the form.</p></div>
      <div className='contact-card'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          
          <div className='flex flex-col'>
            <label htmlFor="name" className='mb-2 text-sm font-medium text-gray-300'>Your Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className='form-input'
              placeholder='Enter your name'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='message' className='mb-2 text-sm font-medium text-gray-300'>Message</label>
            <textarea id='message' value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} rows={4} className='form-input resize-y' placeholder='Tell me a little about it...' required />
            <div className='mt-2 flex justify-between text-xs text-slate-500'><button type='button' onClick={() => setShowTip(!showTip)} className='text-cyan-300 hover:text-cyan-200'> {showTip ? 'Hide' : 'Need a prompt?'} </button><span>{message.length}/500</span></div>
            {showTip && <p className='text-xs text-slate-400'>A few details about your idea, timeline, or question are a great place to start.</p>}
          </div>

          <button 
            type="submit"
            className='button-primary mt-1 w-full justify-center'
          >
            Send message <Send size={16}/>
          </button>
        </form>

        <div className='message-preview'>
          <h3><MessageCircle size={16}/> Live preview</h3>
          <p><strong>{name || 'Your name'}</strong></p><p>{message || 'Your message will appear here as you write.'}</p>
        </div>
      </div>
    </section>
  )
}

export default Contact
