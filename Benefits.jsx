import { LuUsers, LuTrendingUp, LuClock, LuWorkflow } from 'react-icons/lu'
import Reveal, { SectionHeading, trackSpotlight } from './Reveal'

const BARS = [28, 36, 34, 48, 52, 64, 72, 86]

function GrowthVisual() {
  return (
    <div className="flex h-24 items-end gap-1.5 sm:gap-2" aria-hidden="true">
      {BARS.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t-[5px] transition-all duration-700 group-hover:opacity-100 ${
            i === BARS.length - 1 ? 'bg-accent' : 'bg-white/[0.08] group-hover:bg-white/[0.12]'
          }`}
          style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  )
}

function FlowVisual() {
  const items = ['Анализ', 'Поиск', 'Контакт', 'Передача']
  return (
    <div className="flex flex-wrap items-center gap-2" aria-hidden="true">
      {items.map((t, i) => (
        <div key={t} className="flex items-center gap-2">
          <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-muted transition-colors duration-300 group-hover:border-line-strong group-hover:text-fg">
            {t}
          </span>
          {i < items.length - 1 && <span className="h-px w-4 bg-line-strong" />}
        </div>
      ))}
      <span className="ml-1 font-mono text-[11px] text-accent">↻ каждый месяц</span>
    </div>
  )
}

const ITEMS = [
  {
    icon: LuUsers,
    title: 'Новых потенциальных клиентов',
    text: 'Людей, которым интересен ваш продукт, — а не случайные контакты из холодных баз.',
    span: 'lg:col-span-4',
    visual: <GrowthVisual />,
  },
  {
    icon: LuTrendingUp,
    title: 'Больше заявок 📈',
    text: 'Стабильный приток обращений, который не зависит от сарафанного радио.',
    span: 'lg:col-span-2',
  },
  {
    icon: LuClock,
    title: 'Экономию времени',
    text: 'Не тратите часы на поиск и переписки — занимаетесь продуктом и продажами.',
    span: 'lg:col-span-2',
  },
  {
    icon: LuWorkflow,
    title: 'Системный поиск клиентов',
    text: 'Выстроенный процесс, который работает регулярно, а не разовыми всплесками.',
    span: 'lg:col-span-4',
    visual: <FlowVisual />,
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-24 sm:py-32">
      <div className="section-divider pointer-events-none absolute inset-x-0 top-0" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Что вы получаете"
            title="Результат, который видно в заявках"
            text="Мы отвечаем за поток клиентов, вы — за то, что умеете лучше всего."
          />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={i * 100} className={item.span}>
                <article
                  onMouseMove={trackSpotlight}
                  className="card card-hover spotlight group flex h-full flex-col justify-between gap-10 overflow-hidden p-6 sm:p-7"
                >
                  <div>
                    <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-shadow duration-500 group-hover:shadow-[0_0_24px_-4px_rgb(198_243_107/0.45)]">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-6 text-[20px] leading-snug font-semibold tracking-[-0.02em] text-fg">{item.title}</h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{item.text}</p>
                  </div>
                  {item.visual && <div className="hidden sm:block">{item.visual}</div>}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
