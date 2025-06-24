Excelente escolha, Ezequias. Abaixo está o **`start.sh` completo**, ideal para **Ubuntu 22.04 LTS** com foco em **ambiente de produção**, incluindo:

* Atualização do sistema
* Instalação de Node.js 22.x (via `nodesource`)
* PM2, Yarn, Nginx
* UFW com liberação padrão
* Clonagem do projeto e inicialização do backend com `.env` e PM2

---

### ✅ `start.sh` (executar com `sudo bash start.sh`)

```bash
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
```

---

### ✅ Após reboot, tudo sobe automaticamente.

#### ⏭️ Próximos passos manuais:

1. Substituir `.env` com variáveis reais
2. Configurar o domínio e SSL via NGINX
3. Instalar Certbot para HTTPS:

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx
```

---

📦 Esse `start.sh` cobre **100% da preparação inicial** para o backend Nexus em produção.

Deseja agora que eu gere também um `deploy-frontend.sh` para publicar o build React no `/www/wwwroot/nexus-app` com NGINX + HTTPS?
