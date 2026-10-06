import { LuSend, LuMail } from 'react-icons/lu'
import Logo from './Logo'
import { SITE, NAV_LINKS, CTA_LABEL } from './site'

export default function Footer({ onCta, onPrivacy }) {
  return (
    <footer className="border-t border-line py-14">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{SITE.tagline}</p>
            <button type="button" onClick={onCta} className="btn-ghost mt-6 h-11 text-[14px]">
              {CTA_LABEL}
            </button>
          </div>

          <nav aria-label="Навигация в подвале">
            <p className="font-mono text-[11px] tracking-wider text-dim uppercase">Разделы</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[14px]">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] tracking-wider text-dim uppercase">Контакты</p>
            <ul className="mt-4 space-y-3 text-[14.5px]">
              <li>
                <a
                  href={SITE.contactTelegram}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 text-fg transition-colors hover:text-accent"
                >
                  <LuSend className="size-4 text-muted transition-colors group-hover:text-accent" />
                  {SITE.telegramHandle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="group inline-flex items-center gap-2.5 break-all text-fg transition-colors hover:text-accent"
                >
                  <LuMail className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                  {SITE.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-[13px] text-dim sm:flex-row sm:items-center">
          <span>
            © {SITE.year} {SITE.name}. Все права защищены.
          </span>
          <div className="flex gap-6">
            <button type="button" onClick={onPrivacy} className="transition-colors hover:text-muted">
              Политика конфиденциальности
            </button>
            <a href="#top" className="transition-colors hover:text-muted">
              Наверх ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
