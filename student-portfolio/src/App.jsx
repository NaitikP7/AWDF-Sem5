import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

const Home = lazy(() => import('./components/Home'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))

const LoadingFallback = () => (
  <div className="route-loading" role="status">
    <div className="loading-mark"/><p>Loading your next view</p>
  </div>
);

const NotFound = () => <section className='not-found'><span className='section-number'>404 / PAGE NOT FOUND</span><h1>Looks like this<br/><span>page wandered off.</span></h1><p>The link may be outdated, or the address may have a typo.</p><Link className='button-primary' to='/'>Back to home</Link></section>

const App = () => {
  return (
    <Router>
      <div className='app-shell'>
        <NavBar />
        <main className='flex-grow pt-16'>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
