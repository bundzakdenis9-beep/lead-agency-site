import { useCallback, useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Process from './Process'
import Benefits from './Benefits'
import Audience from './Audience'
import About from './About'
import CallToAction from './CallToAction'
import Footer from './Footer'
import LeadModal from './LeadModal'

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
