const escape = (s = '') => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ ok: false, error: 'Telegram is not configured' })
  }

  const { name, contact, link, about } = req.body || {}
  if (!name || !contact) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' })
  }

  const text = [
    '<b>🚀 Новая заявка с сайта</b>',
    '',
    `<b>Имя:</b> ${escape(name)}`,
    `<b>Контакт:</b> ${escape(contact)}`,
    `<b>Бизнес:</b> ${escape(link || '—')}`,
    `<b>О бизнесе:</b> ${escape(about || '—')}`,
  ].join('\n')

  try {
    const tg = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    })
    if (!tg.ok) throw new Error(`Telegram ${tg.status}`)
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(502).json({ ok: false, error: 'Failed to deliver' })
  }
}
