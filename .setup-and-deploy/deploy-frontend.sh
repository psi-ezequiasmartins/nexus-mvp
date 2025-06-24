#!/bin/bash

echo "🌐 Construindo frontend Nexus..."

cd /www/wwwroot/nexus-mvp/frontend || {
  echo "❌ Pasta frontend não encontrada!"
  exit 1
}

yarn install
yarn build

echo "🚚 Publicando build em /www/wwwroot/nexus-app..."

rm -rf /www/wwwroot/nexus-app
mkdir -p /www/wwwroot/nexus-app
cp -r build/* /www/wwwroot/nexus-app/

echo "📝 Configurando NGINX..."

read -p "Digite o domínio do frontend (ex: nexus-app.markagp.com.br): " DOMAIN

cat > /etc/nginx/sites-available/$DOMAIN <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    root /www/wwwroot/nexus-app;
    index index.html;

    location / {
        try_files \$uri /index.html;
    }

    access_log /var/log/nginx/$DOMAIN.access.log;
    error_log /var/log/nginx/$DOMAIN.error.log;
}
EOF

ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN
nginx -t && systemctl reload nginx

echo "🔐 Instalando HTTPS via Certbot..."
apt install -y certbot python3-certbot-nginx
certbot --nginx -d $DOMAIN

echo "✅ Frontend publicado com sucesso em: https://$DOMAIN"
