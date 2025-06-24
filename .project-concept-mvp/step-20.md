Perfeito! Abaixo está o script `deploy-frontend.sh` para:

* Construir o frontend React com `yarn build`
* Publicar em `/www/wwwroot/nexus-app`
* Configurar **NGINX** com domínio e **HTTPS via Certbot**

---

### ✅ `deploy-frontend.sh`

```bash
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
```

---

### 🧩 Requisitos:

* NGINX instalado
* Domínio já apontando para o servidor
* Porta 80 e 443 liberadas no firewall (`ufw allow 'Nginx Full'`)

---

### ✅ Executar com:

```bash
sudo bash deploy-frontend.sh
```

---

📦 Pronto para rodar em produção com React + SSL.
Deseja agora um `checkup.sh` final para validar se backend e frontend estão online 
e responderam corretamente (curl 200)?

Perfeito! Abaixo está o script `checkup.sh`, que:

* Testa se o **frontend React (HTTPS)** está online
* Testa se o **backend API (HTTPS)** responde com código HTTP 200
* Exibe status legível no terminal com ícones ✔️ / ❌

---

### ✅ `checkup.sh`

```bash
#!/bin/bash

# Domínios alvo
FRONTEND_URL="https://nexus-app.markagp.com.br"
BACKEND_URL="https://nexus-api.markagp.com.br"

echo "🔍 Verificando status do sistema Nexus..."

check_url() {
  local name=$1
  local url=$2

  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url")

  if [ "$code" == "200" ]; then
    echo "✅ $name OK [$code]"
  else
    echo "❌ $name FALHOU [$code]"
  fi
}

check_url "Frontend (React)" "$FRONTEND_URL"
check_url "Backend (API)" "$BACKEND_URL"

echo "✔️ Verificação concluída."
```

---

### ✅ Como usar:

```bash
sudo bash checkup.sh
```

📌 **Dica**: edite `FRONTEND_URL` e `BACKEND_URL` conforme necessário.

---

💡 Pronto para monitorar se o Nexus está publicado corretamente.

## 10:26 terça-feira, 24 de junho de 2025
