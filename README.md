# YEM Marketing — лендинг агентства лидогенерации

React 19 + Vite + Tailwind CSS v4 + иконки Lucide (через `react-icons/lu`). Без платных библиотек, API и изображений.

## Запуск

```bash
npm install
npm run dev      # локально: http://localhost:5173
npm run build    # сборка в папку dist
```

## Деплой на Vercel

1. Загрузите папку проекта в GitHub.
2. На vercel.com → **Add New → Project** → выберите репозиторий.
3. Vercel сам определит Vite (Build: `npm run build`, Output: `dist`). Нажмите **Deploy**.

## Что где менять

| Что | Файл |
|---|---|
| Название агентства, контакты в футере, пункты меню | `site.js` |
| Цвета и шрифты | `index.css` (блок `@theme`) |
| Тексты секций | `*.jsx` |
| Логотип | `Logo.jsx`, `favicon.svg` |
| Отправка формы | `submitLead.js` |

## Форма заявки

Сейчас форма работает в **демо-режиме**: проверяет поля, показывает загрузку и экран «Заявка отправлена», но данные никуда не уходят (видны в консоли браузера).

### Подключить Telegram-бота (готово, нужно только включить)

1. Создайте бота у [@BotFather](https://t.me/BotFather), получите токен.
2. Добавьте бота в нужный чат и узнайте `chat_id` (например, через @userinfobot или `getUpdates`).
3. В Vercel → **Settings → Environment Variables** добавьте:
   - `VITE_LEAD_ENDPOINT` = `/api/lead`
   - `TELEGRAM_BOT_TOKEN` = токен бота
   - `TELEGRAM_CHAT_ID` = id чата
4. Сделайте **Redeploy**. Заявки будут приходить в Telegram через серверную функцию `api/lead.js` (на GitHub: Add file → Create new file, имя `api/lead.js`, вставить содержимое файла `lead.js`) — токен не попадает в браузер.

### Любой другой backend

Укажите его адрес в `VITE_LEAD_ENDPOINT`. Форма отправит `POST` с JSON:

```json
{ "name": "", "contact": "", "link": "", "about": "", "source": "", "createdAt": "" }
```

## Структура

Все файлы лежат в одной папке, без подпапок — так проект проще загружать на GitHub через браузер.
