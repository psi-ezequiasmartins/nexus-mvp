#!/bin/bash

echo "🔍 Verificando processos zumbis no sistema..."

# Lista todos os processos com status Z (zumbi)
zombies=$(ps -eo ppid,pid,stat,cmd | awk '$3 ~ /Z/')

if [ -z "$zombies" ]; then
  echo "✅ Nenhum processo zumbi encontrado. Tudo limpo!"
else
  echo "⚠️ Processos zumbis detectados:"
  echo "$zombies"
  echo ""
  echo "🔎 Sugestão: verifique os processos pais (PPID) e avalie se precisam ser reiniciados."
fi

