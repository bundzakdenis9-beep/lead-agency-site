import { SITE } from './site'

export default function Logo({ className = '' }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={`${SITE.name} — на главную`}>
      <span className="relative grid size-8 place-items-center rounded-[9px] border border-line-strong bg-surface-2 transition-colors duration-300 group-hover:border-accent/50">
        <svg viewBox="0 0 32 32" className="size-5" aria-hidden="true">
          <path
            d="M9.5 9 16 16.5 22.5 9M16 16.5V23.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="23.5" cy="23" r="2.4" className="fill-accent" />
        </svg>
      </span>
      <span className="text-[17px] tracking-[-0.02em] whitespace-nowrap">
        <span className="font-bold text-fg">{SITE.shortName}</span>{' '}
        <span className="font-medium text-muted transition-colors duration-300 group-hover:text-fg">
          {SITE.name.replace(SITE.shortName, '').trim()}
        </span>
      </span>
    </a>
  )
}
