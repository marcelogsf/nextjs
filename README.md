# Leque de Vagas 💼

Projeto desenvolvido como parte do curso **Introdução ao Next.js** (NickDev · *Um Leque de Tecnologia*), cobrindo os fundamentos, o mapa de rotas (Aula 02), componentes de servidor e cliente (Aula 03) e **Data Fetching, ISR, SSG e Streaming com Suspense (Aula 04)**.

---

## 🌐 O Dado Vem de Fora (Aula 04)

Na Aula 04, os dados deixam de ficar "chumbados" no código fonte e passam a ser consumidos de fontes externas via requisições assíncronas (`fetch` em Server Components).

### 🏛️ Arquitetura das Quatro Frentes:

| Frente | Responsabilidade | Recursos da Aula 04 |
| :--- | :--- | :--- |
| **1 · Vaga** | Detalhes da vaga e pré-renderização | `fetch` com ISR (`revalidate: 60`), `generateStaticParams` (`id`), `generateMetadata` dinâmico |
| **2 · Empresa** | Página da empresa e catálogo institucional | `Promise.all` em paralelo, `revalidate: 3600`, `generateStaticParams` (`slug`), `generateMetadata` |
| **3 · Pessoa e Candidatura** | Resiliência e estados de erro | `error.tsx` com botão de recuperação (`reset()`), `notFound()`, esqueleto com `loading.tsx` |
| **4 · Busca e Números** | Streaming e performance percebida | `<Suspense />` duplo na listagem, `NumerosDoCatalogo` assíncrono, skeletons sem *layout shift* |

---

### 🔍 Por que os tempos de `revalidate` são diferentes?
No arquivo `lib/api.ts`, isolamos a URL da fonte e estabelecemos estratégias de revalidação baseadas na natureza do dado:
- **Vagas (`revalidate: 60`)**: Vagas são dinâmicas e entram/saem com frequência. Um cache de 1 minuto garante que novidades apareçam rápido sem sobrecarregar a fonte.
- **Empresas (`revalidate: 3600`)**: Dados institucionais (descrição, site) mudam raramente. Um cache de 1 hora economiza banda e tempo de CPU.

---

## ⚙️ Saída do `npm run build`

```text
Route (app)                  Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /empresas                        1h      1y
├   /empresas/[slug]
│ ├ ● /empresas/aurora-tech          1m      1y
│ ├ ● /empresas/nuvem-rosa           1m      1y
│ ├ ● /empresas/nexocore             1m      1y
│ └ ● [+2 more paths]
├ ○ /privacidade
├ ○ /produtos/novo
├ ○ /sobre
├ ○ /termos
├ ○ /vagas                           1m      1y
└   /vagas/[id]
  ├ ● /vagas/1                       1m      1y
  ├ ● /vagas/2                       1m      1y
  ├ ● /vagas/3                       1m      1y
  └ ● [+9 more paths]

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
```

> **Legenda Técnica:**
> - **`○` (Static):** HTML pré-renderizado estaticamente uma única vez no build.
> - **`●` (SSG):** HTML pré-gerado no build com base na lista retornada por `generateStaticParams` (acesso instantâneo).
> - **`1m` / `1h` (ISR):** *Incremental Static Regeneration* — a página é revalidada em segundo plano quando o cache expira (*stale-while-revalidate*).

---

## 🗺️ Mapa de Rotas

| Caminho do Arquivo | Rota / URL Gerada | Descrição |
| :--- | :--- | :--- |
| `app/page.tsx` | `/` | Página inicial do Leque de Vagas |
| `app/not-found.tsx` | *Qualquer rota inexistente* | Tela 404 global |
| `app/vagas/page.tsx` | `/vagas` | Listagem de vagas com streaming por `<Suspense>` |
| `app/vagas/[id]/page.tsx` | `/vagas/[id]` (ex: `/vagas/1`) | Detalhes pré-gerados com `generateStaticParams` |
| `app/vagas/[id]/loading.tsx`| `/vagas/[id]` (durante a espera) | Esqueleto com animação de pulso |
| `app/vagas/[id]/error.tsx` | `/vagas/[id]` (em falha de rede) | Tratamento amigável com botão para tentar novamente |
| `app/empresas/page.tsx` | `/empresas` | Catálogo das empresas parceiras |
| `app/empresas/[slug]/page.tsx`| `/empresas/[slug]` | Página institucional com abas e pré-geração SSG |
| `app/(institucional)/termos/page.tsx` | `/termos` | Termos de uso (Route Group sem prefixo) |
| `app/(institucional)/privacidade/page.tsx` | `/privacidade` | Política de privacidade (Route Group sem prefixo) |

---

## 🚀 Como Rodar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/marcelogsf/nextjs.git
   cd nextjs
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deploy

Publicado na [Vercel](https://vercel.com). Commits na branch `main` disparam o deploy e a revalidação estática automaticamente.

---

**Autor:** Marcelo Filho  
*Aula 04 · Introdução ao Next.js · NickDev (Um Leque de Tecnologia)*
