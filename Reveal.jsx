import { useReveal } from '../hooks/useReveal'

/** Обёртка для плавного появления блока при скролле. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Обработчик для эффекта свечения за курсором на карточках (.spotlight). */
export function trackSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

/** Заголовок секции: eyebrow + h2 + описание. */
export function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  const center = align === 'center'
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-5 text-[30px] leading-[1.12] font-semibold tracking-[-0.025em] text-fg sm:text-[40px]">
          {title}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={160}>
          <p className="mt-5 text-[16px] leading-relaxed text-muted sm:text-[17px]">{text}</p>
        </Reveal>
      )}
    </div>
  )
}
