import Logo from './Logo'
import { SITE, NAV_LINKS, CTA_LABEL } from './site'

export default function Footer({ onCta }) {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{SITE.tagline}</p>
          </div>

          <nav aria-label="Навигация в подвале">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[14px]">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-3">
            <button type="button" onClick={onCta} className="btn-ghost h-11 text-[14px]">
              {CTA_LABEL}
            </button>
            {SITE.contactTelegram && (
              <a href={SITE.contactTelegram} target="_blank" rel="noreferrer" className="text-[14px] text-muted hover:text-fg">
                Telegram
              </a>
            )}
            {SITE.contactEmail && (
              <a href={`mailto:${SITE.contactEmail}`} className="text-[14px] text-muted hover:text-fg">
                {SITE.contactEmail}
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-[13px] text-dim sm:flex-row">
          <span>
            © {SITE.year} {SITE.name}. Все права защищены.
          </span>
          <a href="#top" className="transition-colors hover:text-muted">
            Наверх ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
