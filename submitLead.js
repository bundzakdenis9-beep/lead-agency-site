/**
 * Отправка заявки.
 *
 * Сейчас работает в ДЕМО-режиме: если переменная VITE_LEAD_ENDPOINT не задана,
 * заявка никуда не отправляется — только выводится в консоль, а пользователь
 * видит экран «Заявка отправлена».
 *
 * Как подключить backend:
 *  1. Telegram-бот через Vercel — уже готова функция api/lead.js.
 *     Добавьте в Vercel → Settings → Environment Variables:
 *       VITE_LEAD_ENDPOINT = /api/lead
 *       TELEGRAM_BOT_TOKEN = токен от @BotFather
 *       TELEGRAM_CHAT_ID   = id чата/канала, куда слать заявки
 *     и сделайте Redeploy.
 *  2. Любой другой backend (CRM, Google Apps Script, Make, Zapier, свой сервер) —
 *     укажите его URL в VITE_LEAD_ENDPOINT. Он получит POST с JSON:
 *       { name, contact, link, about, source, createdAt }
 *
 * Важно: токен Telegram-бота никогда не храните во frontend-коде.
 */

const ENDPOINT = import.meta.env?.VITE_LEAD_ENDPOINT || ''

export const isDemoMode = !ENDPOINT

export async function submitLead(data) {
  const payload = {
    name: data.name.trim(),
    contact: data.contact.trim(),
    link: data.link.trim(),
    about: data.about.trim(),
    source: typeof window !== 'undefined' ? window.location.href : '',
    createdAt: new Date().toISOString(),
  }

  if (isDemoMode) {
    // Имитация сетевого запроса, чтобы был виден статус загрузки.
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.info('[YEM Marketing] Демо-режим: заявка не отправлена, данные:', payload)
    return { ok: true, demo: true }
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Сервер ответил ${res.status}`)
  }
  return { ok: true }
}

/** Простая валидация формы. Возвращает объект ошибок { field: message }. */
export function validateLead(data) {
  const errors = {}
  if (data.name.trim().length < 2) errors.name = 'Как к вам обращаться?'
  if (data.contact.trim().length < 3) errors.contact = 'Оставьте Telegram, телефон или email'
  if (data.link.trim().length < 4) errors.link = 'Добавьте ссылку на сайт или соцсеть'
  return errors
}
