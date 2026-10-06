import { useEffect, useState } from 'react'
import { LuArrowRight, LuArrowDown, LuCheck } from 'react-icons/lu'
import Reveal from './Reveal'
import { CTA_LABEL } from './site'

// Иллюстративная лента — показывает, как выглядит поток заявок. Не реальные данные.
const FEED = [
  { initials: 'ОШ', title: 'Онлайн-школа дизайна', note: 'Хочет обсудить запуск потока', stage: 'Готов к звонку' },
  { initials: 'ЭК', title: 'Эксперт по маркетингу', note: 'Интересуется консультацией', stage: 'Заинтересован' },
  { initials: 'SA', title: 'SaaS-сервис для команд', note: 'Запросил презентацию', stage: 'Готов к звонку' },
  { initials: 'ИШ', title: 'Школа английского', note: 'Ответил на предложение', stage: 'Заинтересован' },
  { initials: 'КП', title: 'Курс по продуктивности', note: 'Попросил связаться в среду', stage: 'Готов к звонку' },
]

const STAGES = ['Анализ', 'Поиск', 'Контакт', 'Передача']

function LeadFeed() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setTick((t) => t + 1), 2800)
    return () => clearInterval(id)
  }, [])

  const visible = [0, 1, 2].map((offset) => {
    const index = (tick + FEED.length - offset) % FEED.length
    return { ...FEED[index], key: tick - offset }
  })

  return (
    <div className="relative overflow-hidden rounded-[20px] bg-surface/95 p-4 backdrop-blur-xl sm:p-5" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <span className="live-dot size-2 rounded-full bg-accent" />
          <span className="text-[13px] font-medium text-fg">Поток клиентов</span>
        </div>
        <span className="font-mono text-[11px] tracking-wider text-dim uppercase">в работе</span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {STAGES.map((s, i) => (
          <div key={s} className="min-w-0">
            <div className={`h-1 rounded-full ${i <= tick % 4 ? 'bg-accent/80' : 'bg-white/8'} transition-colors duration-700`} />
            <span className="mt-2 block truncate text-[11px] text-muted">{s}</span>
          </div>
        ))}
      </div>

      <ul className="mt-5 space-y-2.5">
        {visible.map((lead, i) => (
          <li
            key={lead.key}
            className={`flex items-center gap-3 rounded-[14px] border border-line bg-white/[0.025] p-3 ${i === 0 ? 'feed-in' : ''}`}
            style={{ opacity: 1 - i * 0.22 }}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-surface-2 font-mono text-[11px] text-muted">
              {lead.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-medium text-fg">{lead.title}</p>
              <p className="truncate text-[12px] text-muted">{lead.note}</p>
            </div>
            <span
              className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium min-[420px]:inline-block ${
                lead.stage === 'Готов к звонку' ? 'bg-accent/12 text-accent' : 'bg-white/6 text-muted'
              }`}
            >
              {lead.stage}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between rounded-[14px] border border-dashed border-line-strong px-3.5 py-3">
        <span className="text-[12.5px] text-muted">Передаём вам только заинтересованных</span>
        <LuCheck className="size-4 text-accent" />
      </div>
    </div>
  )
}

const MARQUEE = ['Онлайн-школы', 'Эксперты', 'Сервисы', 'Онлайн-бизнесы', 'Анализ', 'Поиск клиентов', 'Контакт', 'Тёплые заявки']

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee relative mt-20 border-y border-line py-5 sm:mt-28" aria-hidden="true">
      <div className="marquee-track flex w-max items-center">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 pr-10 text-[15px] whitespace-nowrap text-dim sm:text-[17px]">
            {t}
            <span className="text-accent/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero({ onCta }) {
  return (
    <section id="top" className="relative overflow-hidden pt-[124px] pb-16 sm:pt-[150px] sm:pb-20">
      {/* фон: луч света сверху, мягкое сияние, точечная сетка */}
      <div className="hero-beam pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="aurora aurora-a" aria-hidden="true" />
      <div className="aurora aurora-b" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1.5 pr-3.5 pl-2 text-[13px] text-muted">
              <span className="rounded-full bg-accent/12 px-2 py-0.5 font-mono text-[11px] text-accent">B2B</span>
              Лидогенерация для онлайн-бизнеса
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 max-w-[15ch] text-[38px] leading-[1.06] font-semibold tracking-[-0.035em] text-fg sm:text-[52px] lg:text-[60px]">
              Находим <span className="text-gradient">новых клиентов</span> для вашего онлайн-бизнеса{' '}
              <span className="inline-block align-[0.05em] text-[0.8em]">🚀</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted sm:text-[18px]">
              Помогаем онлайн-бизнесам получать больше потенциальных клиентов без лишних затрат времени на их поиск.
            </p>
          </Reveal>

          <Reveal delay={270} className="mt-9 flex flex-col gap-3 min-[460px]:flex-row">
            <button type="button" onClick={onCta} className="btn-primary h-[52px] px-6">
              {CTA_LABEL}
              <LuArrowRight className="size-[18px]" />
            </button>
            <a href="#process" className="btn-ghost h-[52px]">
              Как мы работаем
              <LuArrowDown className="size-4 text-muted" />
            </a>
          </Reveal>

          <Reveal delay={360}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[13.5px] text-muted">
              {['Консультация без обязательств', 'Разбор вашей ниши', 'Прозрачный процесс'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <LuCheck className="size-4 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
          <div className="glow-orb inset-x-10 top-10 bottom-10 bg-accent/[0.08]" />
          <div className="border-spin relative rounded-[21px] p-px">
            <LeadFeed />
          </div>
        </Reveal>
      </div>

      <Marquee />
    </section>
  )
}
