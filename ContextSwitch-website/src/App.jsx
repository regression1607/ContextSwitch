import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Platforms from './components/Platforms'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Refund from './pages/Refund'
import Disclaimer from './pages/Disclaimer'
import Profile from './pages/Profile'

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Platforms />
      <Pricing />
    </>
  )
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
