# Usa una imagen de Node.js para compilar
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Usa un servidor web para servir Angular
FROM nginx:alpine
COPY --from=build /app/dist/front-personas /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
