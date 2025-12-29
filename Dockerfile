# =========================
# Build stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# =========================
# Run stage
# =========================
FROM nginx:1.25-alpine

# nginx 기본 설정 제거
RUN rm /etc/nginx/conf.d/default.conf

# 정적 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 설정 복사
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
