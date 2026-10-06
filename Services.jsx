import { LuTarget, LuMegaphone, LuCheck, LuArrowRight } from 'react-icons/lu'
import Reveal, { SectionHeading, trackSpotlight } from './Reveal'

const SERVICES = [
  {
    icon: LuTarget,
    tag: 'Основная услуга',
    title: 'Лидогенерация',
    text: 'Находим потенциальных клиентов, выходим с ними на контакт и передаём вам тех, кто заинтересован.',
    points: ['Анализ ниши и аудитории', 'Поиск потенциальных клиентов', 'Первый контакт и общение', 'Передача тёплых заявок'],
  },
  {
    icon: LuMegaphone,
    tag: 'Под ключ',
    title: 'SMM проекта',
    text: 'Можем полностью взять на себя соцсети вашего проекта, чтобы вы занимались продуктом.',
    points: ['Стратегия и контент-план', 'Создание контента', 'Ведение аккаунтов', 'Продвижение и аналитика'],
  },
]

export default function Services({ onCta }) {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Услуги"
          title="Клиенты и соцсети в одних руках"
          text="Можно заказать одно направление или оба сразу. Формат подбираем под ваш проект."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 120}>
                <article
                  onMouseMove={trackSpotlight}
                  className="card card-hover spotlight group flex h-full flex-col p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-shadow duration-500 group-hover:shadow-[0_0_24px_-4px_rgb(198_243_107/0.45)]">
                      <Icon className="size-[22px]" />
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wider text-muted uppercase">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="mt-8 text-[24px] font-semibold tracking-[-0.025em] text-fg sm:text-[28px]">{s.title}</h3>
                  <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-muted">{s.text}</p>
                  <ul className="mt-7 grid gap-3 border-t border-line pt-7 min-[480px]:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-fg/90">
                        <LuCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={onCta}
                    className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-[14.5px] font-medium text-fg transition-colors hover:text-accent"
                  >
                    Обсудить {s.title === 'SMM проекта' ? 'SMM' : 'лидогенерацию'}
                    <LuArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
