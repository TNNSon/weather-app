FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
CMD ["node"]

FROM nginx:1.9.15-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
