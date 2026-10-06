import { LuShieldCheck, LuEye, LuTarget } from 'react-icons/lu'
import Reveal from './Reveal'
import { SITE } from '../config/site'

const PRINCIPLES = [
  { icon: LuTarget, title: 'Фокус на качестве', text: 'Передаём только тех, кто действительно заинтересован.' },
  { icon: LuEye, title: 'Прозрачность', text: 'Вы понимаете, что мы делаем и на каком этапе работа.' },
  { icon: LuShieldCheck, title: 'Бережно к бренду', text: 'Общаемся с клиентами от вашего имени аккуратно и по делу.' },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="card relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="glow-orb -top-32 -right-24 h-72 w-72 bg-accent/[0.08]" />
          <div
            className="pointer-events-none absolute right-6 -bottom-6 font-semibold tracking-[-0.06em] text-white/[0.025] select-none sm:-bottom-10"
            style={{ fontSize: 'clamp(96px, 20vw, 240px)', lineHeight: 1 }}
            aria-hidden="true"
          >
            {SITE.shortName}
          </div>

          <div className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <span className="eyebrow">О нас</span>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-8 text-[26px] leading-[1.25] font-medium tracking-[-0.025em] text-muted sm:text-[34px]">
                  Мы помогаем онлайн-бизнесам <span className="text-fg">находить потенциальных клиентов</span> и создавать{' '}
                  <span className="text-fg">стабильный поток новых заявок</span>.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-10 flex items-center gap-3 text-[14px] text-muted">
                  <span className="h-px w-10 bg-accent" />
                  Команда {SITE.name}
                </div>
              </Reveal>
            </div>

            <ul className="grid content-center gap-3">
              {PRINCIPLES.map((p, i) => {
                const Icon = p.icon
                return (
                  <Reveal
                    as="li"
                    key={p.title}
                    delay={150 + i * 100}
                    className="group flex gap-5 rounded-2xl border border-line bg-ink/40 p-5 transition-colors duration-300 hover:border-line-strong sm:p-6"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-accent transition-colors duration-300 group-hover:border-accent/40">
                      <Icon className="size-[18px]" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-fg">{p.title}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{p.text}</p>
                    </div>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
