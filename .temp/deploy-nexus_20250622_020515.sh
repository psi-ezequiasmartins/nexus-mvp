#!/bin/bash

# ===============================
# DEPLOY AUTOMATIZADO - NEXUS
# ===============================
# Autor: ChatGPT (via Ezequias)
# Data: $(date)

# Configurações
MYSQL_USER="nexus"
MYSQL_PASS="~@#$121247EzNXS"
MYSQL_DB="nexus"
DOMAIN_API="nexus-api.markagp.com.br"
DOMAIN_APP="nexus-app.markagp.com.br"
INSTALL_DIR="/www/wwwroot/nexus-mvp"
PACKAGE_NAME="nexus-mvp.tar.gz"

# 1. Verificar conexão SSH (implícito - se rodando, já está ok)
echo "[1/10] ✅ Conectado via SSH como $(whoami)"

# 2. Verificações do ambiente
echo "[2/10] 🔍 Verificando ambiente..."
command -v node && node -v
command -v npm && npm -v
command -v pm2 && pm2 -v
command -v nginx && nginx -v
command -v mysql && mysql --version

# 3. Criar estrutura de pastas
echo "[3/10] 📁 Criando estrutura de diretórios..."
mkdir -p $INSTALL_DIR

# 4. Upload e extração do pacote
echo "[4/10] 📦 Extraindo o pacote $PACKAGE_NAME..."
tar -xzf $PACKAGE_NAME -C $INSTALL_DIR

# 5. Criar banco e usuário MySQL
echo "[5/10] 🛢️ Criando banco de dados e usuário..."
mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS $MYSQL_DB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASS';
GRANT ALL PRIVILEGES ON $MYSQL_DB.* TO '$MYSQL_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

# 6. Importar dump SQL
echo "[6/10] 🧩 Importando banco nexus_db.sql..."
mysql -u $MYSQL_USER -p$MYSQL_PASS $MYSQL_DB < $INSTALL_DIR/nexus_db.sql

# 7. Configurar variáveis de ambiente
echo "[7/10] ⚙️ Configurando variáveis de ambiente..."
cp $INSTALL_DIR/.env.example $INSTALL_DIR/.env
sed -i "s|DOMAIN_API_PLACEHOLDER|$DOMAIN_API|g" $INSTALL_DIR/.env
sed -i "s|DOMAIN_APP_PLACEHOLDER|$DOMAIN_APP|g" $INSTALL_DIR/.env

# 8. Instalação de dependências + PM2
echo "[8/10] 🔧 Instalando dependências..."
cd $INSTALL_DIR/api && npm install
cd ../app && npm install && npm run build

echo "[8.1] 🚀 Iniciando apps com PM2..."
pm2 start $INSTALL_DIR/api/index.js --name api
pm2 serve $INSTALL_DIR/app/build 3000 --name app

# 9. Configurar Nginx
echo "[9/10] 🌐 Configurando Nginx..."
NGINX_BLOCK="/etc/nginx/sites-available/nexus"
cat <<EON > $NGINX_BLOCK
server {
    listen 80;
    server_name $DOMAIN_APP;

    location / {
        root $INSTALL_DIR/app/build;
        index index.html;
        try_files \$uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EON

ln -sf $NGINX_BLOCK /etc/nginx/sites-enabled/nexus
nginx -t && systemctl reload nginx

# 10. Instalar SSL com certbot
echo "[10/10] 🔐 Solicitando certificados SSL via Let's Encrypt..."
certbot --nginx -d $DOMAIN_APP -d $DOMAIN_API --non-interactive --agree-tos -m admin@$DOMAIN_APP

# ✔️ Finalizado
echo "✅ Deploy do Nexus concluído com sucesso!"
