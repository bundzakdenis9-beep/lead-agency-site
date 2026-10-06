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
import Services from './Services'
import Terms from './Terms'
import Reviews from './Reviews'
import Faq from './Faq'
import PrivacyModal from './PrivacyModal'

export default function App() {
  const [formOpen, setFormOpen] = useState(false)
  const openForm = useCallback(() => setFormOpen(true), [])
  const closeForm = useCallback(() => setFormOpen(false), [])
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const openPrivacy = useCallback(() => setPrivacyOpen(true), [])
  const closePrivacy = useCallback(() => setPrivacyOpen(false), [])

  return (
    <div className="site-shell">
      <div className="site-bg" aria-hidden="true" />
      <Navbar onCta={openForm} />
      <main>
        <Hero onCta={openForm} />
        <Services onCta={openForm} />
        <Process />
        <Benefits />
        <Audience onCta={openForm} />
        <Terms />
        <About />
        <Reviews />
        <Faq />
        <CallToAction onCta={openForm} />
      </main>
      <Footer onCta={openForm} onPrivacy={openPrivacy} />
      <LeadModal open={formOpen} onClose={closeForm} onPrivacy={openPrivacy} />
      <PrivacyModal open={privacyOpen} onClose={closePrivacy} />
    </div>
  )
}
