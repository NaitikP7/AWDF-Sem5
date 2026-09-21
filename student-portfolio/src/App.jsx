import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

const Home = lazy(() => import('./components/Home'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="text-white text-xl font-semibold animate-pulse">Loading...</div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen bg-slate-900'>
        <NavBar />
        <main className='flex-grow pt-16'>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App