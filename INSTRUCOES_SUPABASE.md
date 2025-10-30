# 🚀 Configuração do Supabase (MUITO MAIS FÁCIL!)

## Passo 1: Criar conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em **Start your project**
3. Faça login com GitHub ou Email
4. É grátis! ✅

## Passo 2: Criar Projeto

1. Clique em **New Project**
2. Preencha:
   - **Name**: Aniversario (ou qualquer nome)
   - **Database Password**: Crie uma senha forte (guarde ela!)
   - **Region**: South America (São Paulo) - mais rápido para Brasil
3. Clique em **Create new project**
4. Aguarde 2 minutos (ele cria o banco automaticamente)

## Passo 3: Criar a Tabela

1. No menu lateral, clique em **Table Editor**
2. Clique em **Create a new table**
3. Preencha:
   - **Name**: `confirmacoes`
   - Deixe marcado: ✅ Enable Row Level Security (RLS)

4. **Adicione as colunas** (clique em Add column):

   | Nome da Coluna  | Type        | Default Value                 | Configuração          |
   |----------------|-------------|-------------------------------|----------------------|
   | id             | int8        | -                             | ✅ Is Identity, Primary Key |
   | nome           | text        | -                             | -                    |
   | whatsapp       | text        | -                             | -                    |
   | acompanhantes  | int4        | 0                             | -                    |
   | total_pessoas  | int4        | 1                             | -                    |
   | data_hora      | timestamptz | now()                         | -                    |
   | created_at     | timestamptz | now()                         | -                    |

5. Clique em **Save**

## Passo 4: Configurar Permissões (IMPORTANTE!)

1. Ainda em **Table Editor**, clique na tabela `confirmacoes`
2. Clique em **RLS** (Row Level Security) no menu superior
3. Clique em **New Policy**
4. Escolha **Get started quickly** → **Enable insert access for all users**
5. Clique em **Use this template**
6. Nome da policy: `Allow public insert`
7. Clique em **Save policy**

**Resultado**: Agora qualquer pessoa pode adicionar confirmações na tabela! ✅

## Passo 5: Pegar as Credenciais

1. No menu lateral, clique em **Project Settings** (ícone de engrenagem ⚙️)
2. Clique em **API**
3. Você verá:

   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (uma chave bem grande)

4. **COPIE AMBOS!**

## Passo 6: Configurar no Código

1. Abra o arquivo `script.js`
2. Nas linhas 2 e 3, cole suas credenciais:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

**Exemplo real:**
```javascript
const SUPABASE_URL = 'https://abcdefgh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3...';
```

## Passo 7: Testar!

1. Salve o arquivo `script.js`
2. Abra o `index.html` no navegador
3. Faça um teste de confirmação
4. Vá no Supabase → **Table Editor** → `confirmacoes`
5. Veja se apareceu o registro! 🎉

---

## 📊 Como Ver as Confirmações

### Opção 1: Direto no Supabase (Simples)
1. Entre no [supabase.com](https://supabase.com)
2. Abra seu projeto
3. Vá em **Table Editor** → `confirmacoes`
4. Veja todos os registros em tempo real!
5. Pode exportar para CSV clicando nos 3 pontinhos

### Opção 2: Criar Página Admin (Avançado)
Posso criar uma página `admin.html` linda para você ver as confirmações!

---

## ✅ Vantagens do Supabase

- ✅ Mais fácil que Google Sheets
- ✅ Banco de dados PostgreSQL profissional
- ✅ Interface visual para ver os dados
- ✅ Grátis para sempre (até 500MB)
- ✅ Backup automático
- ✅ Exporta para CSV/Excel
- ✅ API REST automática

---

## 🎯 Checklist Final

Antes de subir no Netlify, verifique:

- ✅ Criou a tabela `confirmacoes` no Supabase
- ✅ Configurou a policy de RLS para permitir inserts públicos
- ✅ Copiou a URL e a KEY para o `script.js`
- ✅ Testou localmente e funcionou
- ✅ A imagem `public/say.jpg` existe

---

## 🚀 Pronto para o Netlify!

Agora é só subir os arquivos:
- `index.html`
- `style.css`
- `script.js`
- `public/say.jpg`

Arraste tudo para o Netlify e seja feliz! 🎉

---

## 💡 Dica Extra

Instale o app do Supabase no celular para receber notificações! (se disponível)

Ou configure email notifications no Supabase para ser avisado quando alguém confirmar!

