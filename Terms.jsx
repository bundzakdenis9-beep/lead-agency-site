import { LuWallet, LuTimer, LuShieldCheck } from 'react-icons/lu'
import Reveal, { SectionHeading, trackSpotlight } from './Reveal'

const TERMS = [
  {
    icon: LuWallet,
    label: 'Стоимость',
    value: 'Индивидуально',
    text: 'Считаем под ваши задачи и объём работы. Всё обсуждаем на консультации, до старта.',
  },
  {
    icon: LuTimer,
    label: 'Первые заявки',
    value: '24–72 часа',
    text: 'Столько обычно проходит от запуска работы до первых заинтересованных клиентов.',
  },
  {
    icon: LuShieldCheck,
    label: 'Гарантии',
    value: 'Есть',
    text: 'Работаем с гарантией. Её условия фиксируем вместе с вами до начала работы.',
  },
]

export default function Terms() {
  return (
    <section id="terms" className="relative py-24 sm:py-32">
      <div className="section-divider pointer-events-none absolute inset-x-0 top-0" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Условия"
          title="Понятно ещё до первого звонка"
          text="Без скрытых условий: сроки, оплата и гарантии обсуждаются заранее."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {TERMS.map((t, i) => {
            const Icon = t.icon
            return (
              <Reveal key={t.label} delay={i * 110}>
                <article onMouseMove={trackSpotlight} className="card card-hover spotlight group h-full p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-line text-accent transition-colors duration-300 group-hover:border-accent/40">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="font-mono text-[12px] tracking-wider text-muted uppercase">{t.label}</span>
                  </div>
                  <p className="mt-8 text-[30px] leading-none font-semibold tracking-[-0.03em] text-fg sm:text-[34px]">
                    {t.value}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
