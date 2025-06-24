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
