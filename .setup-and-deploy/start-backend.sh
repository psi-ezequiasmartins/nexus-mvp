#!/bin/bash

echo "🔧 Atualizando sistema..."
apt update && apt upgrade -y && apt autoremove -y

echo "🚀 Instalando dependências essenciais..."
apt install -y curl git ufw nginx

echo "🧠 Instalando Node.js 22.x e npm 11..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g npm@11

echo "📦 Instalando Yarn e PM2..."
npm install -g yarn pm2

echo "🔥 Configurando Firewall (UFW)..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "🌐 Clonando projeto Nexus..."
cd /www/wwwroot || mkdir -p /www/wwwroot && cd /www/wwwroot
git clone https://github.com/psi-ezequiasmartins/nexus-mvp.git
cd nexus-mvp/backend

echo "📁 Instalando dependências do backend..."
cp .env.example .env
yarn install

echo "🚀 Iniciando servidor com PM2..."
pm2 start server.js --name nexus-api
pm2 save
pm2 startup systemd
