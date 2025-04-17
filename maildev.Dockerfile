# Базовый образ
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install --force

# Копирование исходного кода
COPY . .

# Сборка проекта (если нужно)
RUN npm run build

# Используем порт Heroku
ENV PORT=3000
EXPOSE $PORT

# Запуск приложения
CMD ["npm", "run", "start:prod"]