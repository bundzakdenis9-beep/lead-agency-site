import { LuGraduationCap, LuUserRound, LuBlocks, LuGlobe, LuArrowUpRight } from 'react-icons/lu'
import Reveal, { SectionHeading, trackSpotlight } from './Reveal'

const CATEGORIES = [
  { icon: LuGraduationCap, title: 'Онлайн-школы', text: 'Курсы, программы обучения, образовательные платформы' },
  { icon: LuUserRound, title: 'Эксперты', text: 'Консультанты, коучи, наставники и специалисты' },
  { icon: LuBlocks, title: 'Сервисы', text: 'SaaS, digital-продукты и онлайн-инструменты' },
  { icon: LuGlobe, title: 'Онлайн-бизнесы', text: 'Любые проекты, которые продают через интернет' },
]

export default function Audience({ onCta }) {
  return (
    <section id="audience" className="relative py-24 sm:py-32">
      <div className="section-divider pointer-events-none absolute inset-x-0 top-0" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Для кого"
          title="Работаем с теми, кто продаёт онлайн"
          text="Работаем с онлайн-школами, экспертами, сервисами и другими онлайн-бизнесами."
        />

        <div className="mt-14 grid gap-4 min-[520px]:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.title} delay={i * 90}>
                <button
                  type="button"
                  onClick={onCta}
                  onMouseMove={trackSpotlight}
                  className="card card-hover spotlight group flex h-full w-full flex-col p-6 text-left"
                  aria-label={`${c.title} — получить консультацию`}
                >
                  <div className="flex w-full items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl border border-line bg-surface-2 text-fg transition-all duration-500 group-hover:border-accent/40 group-hover:text-accent">
                      <Icon className="size-[22px]" />
                    </span>
                    <LuArrowUpRight className="size-5 text-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </div>
                  <h3 className="mt-10 text-[19px] font-semibold tracking-[-0.02em] text-fg">{c.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{c.text}</p>
                </button>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-[15px] text-muted">
            Не нашли свою нишу?{' '}
            <button
              type="button"
              onClick={onCta}
              className="font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              Расскажите о проекте
            </button>{' '}
            — подскажем, подойдёт ли вам наш подход.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
