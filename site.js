// Все тексты, контакты и настройки сайта — в одном месте, чтобы их было легко менять.

export const SITE = {
  name: 'YEM Marketing',
  shortName: 'YEM',
  tagline: 'Поиск клиентов и SMM для онлайн-бизнеса',
  telegramHandle: '@walxbwrk',
  contactTelegram: 'https://t.me/walxbwrk',
  contactEmail: 'productionyem@gmail.com',
  year: new Date().getFullYear(),
}

export const NAV_LINKS = [
  { id: 'services', label: 'Услуги' },
  { id: 'process', label: 'Как мы работаем' },
  { id: 'benefits', label: 'Что вы получаете' },
  { id: 'audience', label: 'Для кого' },
  { id: 'about', label: 'О нас' },
  { id: 'faq', label: 'FAQ' },
]

export const CTA_LABEL = 'Получить консультацию'

/**
 * Отзывы клиентов. Пока список пустой — блок отзывов на сайте скрыт.
 * Как появится первый настоящий отзыв, добавьте его сюда, и блок появится сам.
 * Пример:
 *   { name: 'Анна', role: 'Онлайн-школа английского', text: 'Текст отзыва...' },
 */
export const REVIEWS = []
