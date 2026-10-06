import { useEffect, useRef, useState } from 'react'
import { LuX, LuSend, LuLoaderCircle, LuCircleCheck } from 'react-icons/lu'
import { submitLead, validateLead } from './submitLead'
import { SITE } from './site'

const EMPTY = { name: '', contact: '', link: '', about: '' }

const FIELDS = [
  { name: 'name', label: 'Имя', placeholder: 'Как к вам обращаться', autoComplete: 'name' },
  { name: 'contact', label: 'Telegram / контакт', placeholder: '@username, телефон или email', autoComplete: 'off' },
  { name: 'link', label: 'Ссылка на бизнес', placeholder: 'Сайт, Instagram, Telegram-канал…', autoComplete: 'url' },
]

export default function LeadModal({ open, onClose, onPrivacy }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)
  const lastFocused = useRef(null)

  // Открытие: блокируем скролл, ставим фокус, слушаем Escape/Tab
  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60)

    const onKey = (e) => {
      if (document.body.dataset.privacy === 'open') return // поверх открыта политика
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll('button, input, textarea, a[href]')
        const list = Array.from(nodes).filter((n) => !n.disabled)
        if (!list.length) return
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(t)
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      lastFocused.current?.focus?.()
    }
  }, [open, onClose])

  // После закрытия сбрасываем успешную форму
  useEffect(() => {
    if (!open && status === 'success') {
      setValues(EMPTY)
      setStatus('idle')
    }
  }, [open, status])

  if (!open) return null

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validateLead(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const firstInvalid = dialogRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)
      firstInvalid?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitLead(values)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <div className="overlay-in absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        className="sheet-in relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[28px] border border-line-strong bg-surface shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8)] sm:max-w-[520px] sm:rounded-[28px]"
      >
        <div className="glow-orb -top-24 left-1/2 h-40 w-80 -translate-x-1/2 bg-accent/[0.1]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
          aria-label="Закрыть форму"
        >
          <LuX className="size-5" />
        </button>

        <div className="relative px-6 pt-8 pb-7 sm:px-9 sm:pt-10 sm:pb-9">
          <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-white/15 sm:hidden" aria-hidden="true" />

          {status === 'success' ? (
            <div className="py-8 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/25">
                <LuCircleCheck className="size-8" />
              </span>
              <h2 id="lead-title" className="mt-6 text-[24px] font-semibold tracking-[-0.025em] text-fg">
                Заявка отправлена
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                Спасибо, {values.name.trim() || 'мы получили вашу заявку'}! Свяжемся с вами и обсудим ваш бизнес.
              </p>
              <p className="mx-auto mt-3 max-w-sm text-[14px] text-dim">
                Если удобнее, напишите нам сами в Telegram:{' '}
                <a href={SITE.contactTelegram} target="_blank" rel="noreferrer" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                  {SITE.telegramHandle}
                </a>
              </p>
              <button type="button" onClick={onClose} className="btn-ghost mt-8 h-12">
                Вернуться на сайт
              </button>
            </div>
          ) : (
            <>
              <span className="eyebrow">Консультация</span>
              <h2 id="lead-title" className="mt-4 pr-8 text-[26px] leading-tight font-semibold tracking-[-0.025em] text-fg">
                Расскажите о вашем бизнесе
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                Оставьте контакты — свяжемся и обсудим, как найти для вас новых клиентов.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
                {FIELDS.map((f, i) => (
                  <div key={f.name}>
                    <label htmlFor={`lead-${f.name}`} className="mb-2 block text-[13.5px] font-medium text-fg/90">
                      {f.label} <span className="text-accent">*</span>
                    </label>
                    <input
                      ref={i === 0 ? firstFieldRef : undefined}
                      id={`lead-${f.name}`}
                      name={f.name}
                      type="text"
                      value={values[f.name]}
                      onChange={update}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      aria-invalid={errors[f.name] ? 'true' : 'false'}
                      aria-describedby={errors[f.name] ? `lead-${f.name}-error` : undefined}
                      className="field"
                    />
                    {errors[f.name] && (
                      <p id={`lead-${f.name}-error`} className="mt-1.5 text-[13px] text-red-400">
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <label htmlFor="lead-about" className="mb-2 block text-[13.5px] font-medium text-fg/90">
                    Коротко о вашем бизнесе
                  </label>
                  <textarea
                    id="lead-about"
                    name="about"
                    rows={3}
                    value={values.about}
                    onChange={update}
                    placeholder="Чем занимаетесь, кто ваши клиенты, что хотите получить"
                    className="field min-h-[96px] resize-y"
                  />
                </div>

                {status === 'error' && (
                  <p className="rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-[14px] text-red-300" role="alert">
                    Не удалось отправить заявку. Попробуйте ещё раз чуть позже.
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'} className="btn-primary mt-2 h-14 w-full text-[16px] disabled:cursor-wait disabled:opacity-80">
                  {status === 'sending' ? (
                    <>
                      <LuLoaderCircle className="size-5 animate-spin" />
                      Отправляем…
                    </>
                  ) : (
                    <>
                      Отправить заявку
                      <LuSend className="size-[18px]" />
                    </>
                  )}
                </button>

                <p className="text-center text-[12.5px] leading-relaxed text-dim">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <button
                    type="button"
                    onClick={onPrivacy}
                    className="text-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-fg"
                  >
                    политикой конфиденциальности
                  </button>
                  .
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
