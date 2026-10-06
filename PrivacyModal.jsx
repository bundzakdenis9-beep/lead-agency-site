import { useEffect, useRef } from 'react'
import { LuX } from 'react-icons/lu'
import { SITE } from './site'

const UPDATED = '6 октября 2026'

const SECTIONS = [
  {
    title: '1. Общие положения',
    text: [
      `Эта политика объясняет, какие данные собирает сайт ${SITE.name} (далее — «мы»), зачем и как мы их используем.`,
      'Отправляя заявку на сайте, вы подтверждаете, что ознакомились с политикой и согласны на обработку ваших данных на описанных ниже условиях.',
    ],
  },
  {
    title: '2. Какие данные мы получаем',
    text: [
      'Через форму заявки: имя, контакт для связи (Telegram, телефон или email), ссылку на ваш бизнес и описание проекта, если вы его указали.',
      'Мы не просим и не собираем паспортные данные, платёжную информацию и другие чувствительные сведения.',
    ],
  },
  {
    title: '3. Зачем мы используем данные',
    text: [
      'Только чтобы связаться с вами по вашей заявке, обсудить ваш проект и подготовить предложение.',
      'Мы не используем ваши данные для рассылок без вашего согласия и не продаём их третьим лицам.',
    ],
  },
  {
    title: '4. Как данные хранятся и передаются',
    text: [
      'Заявка передаётся нам через защищённое соединение и приходит в рабочий Telegram-чат. Для работы сайта используются сервисы Vercel (хостинг) и Telegram (доставка заявок).',
      'Доступ к заявкам есть только у команды, которая работает с клиентами. Данные хранятся столько, сколько нужно для работы с вашим запросом.',
    ],
  },
  {
    title: '5. Ваши права',
    text: [
      'Вы можете в любой момент попросить нас уточнить, какие ваши данные у нас есть, исправить их или удалить. Для этого напишите нам, и мы выполним запрос.',
    ],
  },
  {
    title: '6. Контакты',
    text: [`Telegram: ${SITE.telegramHandle}`, `Email: ${SITE.contactEmail}`],
  },
]

export default function PrivacyModal({ open, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.dataset.privacy = 'open'
    const last = document.activeElement
    setTimeout(() => closeRef.current?.focus(), 50)
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      document.body.style.overflow = prev
      delete document.body.dataset.privacy
      window.removeEventListener('keydown', onKey, true)
      last?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <div className="overlay-in absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        className="sheet-in relative flex max-h-[92dvh] w-full flex-col rounded-t-[28px] border border-line-strong bg-surface sm:max-w-[640px] sm:rounded-[28px]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 pt-7 pb-5 sm:px-9">
          <div>
            <span className="eyebrow">Документы</span>
            <h2 id="privacy-title" className="mt-3 text-[22px] font-semibold tracking-[-0.025em] text-fg sm:text-[24px]">
              Политика конфиденциальности
            </h2>
            <p className="mt-1.5 text-[13px] text-dim">Обновлено {UPDATED}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
            aria-label="Закрыть политику"
          >
            <LuX className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-9 sm:py-7">
          <div className="space-y-7">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h3 className="text-[15.5px] font-semibold text-fg">{s.title}</h3>
                <div className="mt-2.5 space-y-2.5">
                  {s.text.map((p) => (
                    <p key={p} className="text-[14.5px] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <button type="button" onClick={onClose} className="btn-ghost mt-9 h-11 w-full text-[14px] sm:w-auto">
            Понятно
          </button>
        </div>
      </div>
    </div>
  )
}
