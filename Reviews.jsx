import { LuQuote } from 'react-icons/lu'
import Reveal, { SectionHeading, trackSpotlight } from './Reveal'
import { REVIEWS } from './site'

/** Блок отзывов. Не показывается, пока в site.js нет ни одного отзыва. */
export default function Reviews() {
  if (!REVIEWS.length) return null

  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Отзывы" title="Что говорят клиенты" />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={i * 100}>
              <figure onMouseMove={trackSpotlight} className="card card-hover spotlight flex h-full flex-col p-6 sm:p-7">
                <LuQuote className="size-6 text-accent" />
                <blockquote className="mt-5 flex-1 text-[15.5px] leading-relaxed text-fg/90">{r.text}</blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <p className="text-[15px] font-semibold text-fg">{r.name}</p>
                  {r.role && <p className="mt-0.5 text-[13.5px] text-muted">{r.role}</p>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
