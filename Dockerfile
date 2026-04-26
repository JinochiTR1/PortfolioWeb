# Fáze 1: Build (Kompilace React/Vite aplikace)
FROM node:20-alpine AS builder

WORKDIR /app

# Nejprve kopírujeme pouze package.json (a package-lock.json). 
# Tím efektivně využíváme Docker cache - moduly se nebudou stahovat znovu, pokud se nezmění seznam závislostí.
COPY package*.json ./

# Čistá instalace závislostí z lock filu
RUN npm ci

# Zkopírování zbytku zdrojových kódů
COPY . .

# Spuštění produkčního buildu (Vite vygeneruje optimalizované soubory do složky /app/dist)
RUN npm run build


# Fáze 2: Produkce (Lehký Nginx server)
FROM nginx:alpine

# Zkopírujeme čistý, zkompilovaný výsledek z první fáze do veřejné složky Nginxu
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponujeme port 80 (na tento port se bude CaddyProxy dotazovat)
EXPOSE 80

# Spuštění Nginxu na popředí
CMD ["nginx", "-g", "daemon off;"]