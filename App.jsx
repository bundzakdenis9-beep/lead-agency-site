import { useCallback, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Process from './components/Process'
import Benefits from './components/Benefits'
import Audience from './components/Audience'
import About from './components/About'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'

export default function App() {
  const [formOpen, setFormOpen] = useState(false)
  const openForm = useCallback(() => setFormOpen(true), [])
  const closeForm = useCallback(() => setFormOpen(false), [])

  return (
    <div className="site-shell">
      <div className="site-bg" aria-hidden="true" />
      <Navbar onCta={openForm} />
      <main>
        <Hero onCta={openForm} />
        <Process />
        <Benefits />
        <Audience onCta={openForm} />
        <About />
        <CallToAction onCta={openForm} />
      </main>
      <Footer onCta={openForm} />
      <LeadModal open={formOpen} onClose={closeForm} />
    </div>
  )
}
