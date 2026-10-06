import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import Reveal, { SectionHeading } from './Reveal'
import { SITE } from './site'

const FAQ = [
  {
    q: 'Сколько стоят ваши услуги?',
    a: 'Стоимость считаем индивидуально: она зависит от ниши, задач и объёма работы. Точную цену назовём после консультации, когда разберёмся в вашем проекте.',
  },
  {
    q: 'Когда я получу первые заявки?',
    a: 'Обычно первые заинтересованные клиенты появляются через 24–72 часа после запуска работы.',
  },
  {
    q: 'Есть ли гарантии?',
    a: 'Да. Работаем с гарантией, а её условия фиксируем вместе с вами до начала работы, чтобы всё было прозрачно.',
  },
  {
    q: 'С какими проектами вы работаете?',
    a: 'С онлайн-школами, экспертами, сервисами и другими онлайн-бизнесами. Если сомневаетесь, подходит ли ваша ниша, просто оставьте заявку, и мы честно скажем.',
  },
  {
    q: 'Можно передать вам ещё и соцсети?',
    a: 'Да. Можем полностью взять на себя SMM проекта: стратегию, контент, ведение аккаунтов и продвижение. Можно отдельно или вместе с лидогенерацией.',
  },
  {
    q: 'Что нужно от меня для старта?',
    a: 'Рассказать о продукте и о том, кто ваш клиент, и согласовать условия. Всё остальное, от поиска до первого контакта с клиентами, берём на себя.',
  },
  {
    q: 'Как начать?',
    a: `Оставьте заявку на сайте или напишите в Telegram ${SITE.telegramHandle}. Свяжемся с вами и обсудим ваш бизнес.`,
  },
]

function Item({ item, open, onToggle, index }) {
  const id = `faq-${index}`
  return (
    <div className={`border-b border-line transition-colors ${open ? 'border-line-strong' : ''}`}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className={`text-[17px] font-medium tracking-[-0.015em] transition-colors sm:text-[18px] ${open ? 'text-fg' : 'text-fg/85 group-hover:text-fg'}`}>
            {item.q}
          </span>
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
              open ? 'rotate-45 border-accent/50 bg-accent/10 text-accent' : 'border-line-strong text-muted group-hover:text-fg'
            }`}
          >
            <LuPlus className="size-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className="grid transition-[grid-template-rows] duration-500"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', transitionTimingFunction: 'var(--ease-out-soft)' }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pr-12 pb-6 text-[15.5px] leading-relaxed text-muted">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Частые вопросы"
            text="Не нашли ответ? Напишите нам, ответим на любой вопрос."
          />
          <Reveal delay={200}>
            <a
              href={SITE.contactTelegram}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-8 h-11 text-[14px]"
            >
              Спросить в Telegram
            </a>
          </Reveal>
        </div>

        <Reveal delay={120} className="border-t border-line">
          {FAQ.map((item, i) => (
            <Item key={item.q} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
