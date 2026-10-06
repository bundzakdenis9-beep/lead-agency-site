import { LuSearch, LuTarget, LuMessageCircle, LuHandshake } from 'react-icons/lu'
import Reveal, { SectionHeading, trackSpotlight } from './Reveal'
import { useReveal } from './useReveal'

const STEPS = [
  {
    n: '01',
    icon: LuSearch,
    emoji: '🔎',
    title: 'Анализируем ваш бизнес',
    text: 'Разбираемся в продукте, аудитории и том, кто для вас идеальный клиент.',
  },
  {
    n: '02',
    icon: LuTarget,
    emoji: '🎯',
    title: 'Находим потенциальных клиентов',
    text: 'Собираем базу тех, кому ваш продукт действительно может быть полезен.',
  },
  {
    n: '03',
    icon: LuMessageCircle,
    emoji: '💬',
    title: 'Связываемся с ними',
    text: 'Аккуратно выходим на контакт и выявляем реальный интерес.',
  },
  {
    n: '04',
    icon: LuHandshake,
    emoji: '🤝',
    title: 'Передаём заинтересованных клиентов вам',
    text: 'Вы получаете контакты людей, готовых к разговору, — и закрываете сделку.',
  },
]

function Track({ vertical = false, className = '' }) {
  const ref = useReveal({ threshold: 0.3 })
  return (
    <div ref={ref} className={`process-track ${vertical ? 'vertical' : ''} ${className}`} aria-hidden="true">
      <div className="process-fill" />
      <div className="process-pulse" />
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Как мы работаем"
          title="Четыре шага от анализа до готового клиента"
          text="Берём на себя всю рутину поиска. Вы подключаетесь только тогда, когда клиент уже заинтересован."
        />

        <div className="relative mt-16">
          {/* горизонтальная линия (десктоп) */}
          <Track className="top-[27px] right-[12.5%] left-[12.5%] hidden h-px lg:block" />
          {/* вертикальная линия (мобильные/планшет) */}
          <Track vertical className="top-7 bottom-7 left-[27px] w-px lg:hidden" />

          <ol className="relative grid gap-5 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal as="li" key={step.n} delay={i * 120} className="relative flex gap-5 lg:block">
                  {/* узел на линии */}
                  <div className="relative z-10 shrink-0 lg:mx-auto lg:w-fit">
                    <div className="grid size-14 place-items-center rounded-full border border-line-strong bg-ink">
                      <span className="grid size-10 place-items-center rounded-full bg-surface-2 font-mono text-[12px] text-accent">
                        {step.n}
                      </span>
                    </div>
                  </div>

                  <article
                    onMouseMove={trackSpotlight}
                    className="card card-hover spotlight group flex-1 p-6 lg:mt-7 lg:min-h-[248px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-[20px] transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                        {step.emoji}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[18px] leading-snug font-semibold tracking-[-0.015em] text-fg">{step.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{step.text}</p>
                  </article>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
