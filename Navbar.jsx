import { useEffect, useState } from 'react'
import { LuMenu, LuX, LuArrowRight } from 'react-icons/lu'
import Logo from './Logo'
import { NAV_LINKS, CTA_LABEL } from '../config/site'

export default function Navbar({ onCta }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Фон навбара после начала скролла
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Подсветка активного пункта меню
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Мобильное меню: блокировка скролла и закрытие по Escape / при расширении экрана
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 900 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? 'border-b border-line bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex h-[68px] items-center justify-between gap-6" aria-label="Основная навигация">
        <Logo />

        <ul className="hidden items-center gap-1 min-[900px]:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative rounded-full px-3.5 py-2 text-[14px] transition-colors duration-300 ${
                  active === link.id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ${
                    active === link.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onCta} className="btn-primary hidden h-10 px-4 text-[14px] sm:inline-flex">
            {CTA_LABEL}
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-white/5 min-[900px]:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <LuX className="size-[18px]" /> : <LuMenu className="size-[18px]" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="menu-in h-[calc(100dvh-68px)] overflow-y-auto border-t border-line bg-ink min-[900px]:hidden">
          <div className="container-x flex h-full flex-col pt-6 pb-8">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <li key={link.id} className="reveal is-visible" style={{ '--delay': `${60 + i * 50}ms` }}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-5 text-[22px] font-medium tracking-[-0.02em] text-fg"
                  >
                    {link.label}
                    <LuArrowRight className="size-5 text-dim" />
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onCta()
              }}
              className="btn-primary mt-auto h-14 w-full"
            >
              {CTA_LABEL}
              <LuArrowRight className="size-[18px]" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
