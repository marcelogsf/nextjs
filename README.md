# Leque de Vagas 💼

Projeto desenvolvido como parte do curso **Introdução ao Next.js** (NickDev · *Um Leque de Tecnologia*), cobrindo os fundamentos, o mapa de rotas (Aula 02) e a divisão em **Quatro Frentes de Estado com Server e Client Components (Aula 03)**.

---

## 👥 O Estado do Projeto (Aula 03)

O projeto foi organizado em **quatro frentes de trabalho**, onde cada frente aborda uma forma de estado (`useState`) e interatividade específica:

| Frente | Responsabilidade | Forma de Estado | Componente(s) de Cliente |
| :--- | :--- | :--- | :--- |
| **1 · Vaga** | Contrato de dados e página de detalhe | Booleano (`true`/`false`) | `DescricaoDaVaga`, `BotaoCopiarLink` |
| **2 · Empresa** | Cadastro institucional e listagem por empresa | Texto que escolhe (`"sobre"` / `"vagas"`) | `AbasDaEmpresa` |
| **3 · Pessoa e Candidatura** | Formulário e registro de candidatura | Campo controlado + Lista imutável | `FormularioDeCandidatura` |
| **4 · Busca e Números** | Filtros, busca em tempo real e métricas | Estado levantado + Estado derivado | `MuralDeVagas` |

---

### 🔍 Por que cada componente leva `"use client"`?

A diretiva `"use client"` foi aplicada **estritamente nas folhas da árvore de componentes**, mantendo todas as páginas e layouts como Server Components puros:

- **`DescricaoDaVaga`**: Possui evento de clique (`onClick`) e precisa lembrar se o texto expandido está aberto ou fechado (`useState(false)`).
- **`BotaoCopiarLink`**: Possui evento de clique (`onClick`), memória de confirmação (`copiado`) e utiliza a API do navegador `navigator.clipboard`, que não existe no ambiente do servidor.
- **`AbasDaEmpresa`**: Possui evento de clique (`onClick`) e precisa lembrar qual aba foi selecionada pelo usuário (`useState("sobre")`).
- **`FormularioDeCandidatura`**: Gerencia campos controlados (`nome`, `email`, `rascunho`), lista imutável de habilidades (`habilidades`) e alternância de tela no envio (`enviada`).
- **`MuralDeVagas`**: Centraliza o estado da busca (`busca`) e da área selecionada (`area`), passando-os para o componente filho.
- **Nota sobre `Filtros` e `CardDeVaga`**: Nenhum dos dois leva `"use client"` diretamente. `Filtros` é importado por um Client Component (`MuralDeVagas`) e `CardDeVaga` apenas renderiza props estáticas.

> **Validação de Servidor:**
> Nenhum arquivo `page.tsx` ou `layout.tsx` possui `"use client"`. O log `[servidor] montando a listagem` é emitido diretamente no terminal do Node.js durante a execução/build.

---

### 💡 O que decidimos NÃO guardar em estado (Estados Derivados)

Seguindo a boa prática de **"se dá para calcular do que você já tem, não guarde em estado"**, evitamos redundâncias e bugs de sincronização:

1. **Lista filtrada (`visiveis`)**: Calculada em tempo de execução combinando a lista de `vagas`, o termo de `busca` e a `area` selecionada. Se fosse um estado separado, qualquer alteração exigiria múltiplos `set` manuais propensos a inconsistência.
2. **Contadores numéricos**:
   - `visiveis.length` e `aceitamIniciante` saem diretamente do array filtrado.
   - `vagas.length` na aba da empresa sai diretamente da prop recebida.
3. **Validação do Formulário**:
   - `emailParece` (`email.includes("@") && email.includes(".")`) e `podeEnviar` são expressões booleanas recalculadas a cada renderização.
4. **Visibilidade do texto truncado**:
   - `cabeInteira` e `visivel` no `DescricaoDaVaga` são calculados diretamente a partir do tamanho do texto e do booleano `aberta`.

---

## 🗺️ Mapa de Rotas

| Caminho do Arquivo | Rota / URL Gerada | Descrição |
| :--- | :--- | :--- |
| `app/page.tsx` | `/` | Página inicial do Leque de Vagas |
| `app/not-found.tsx` | *Qualquer rota inexistente* | Tela 404 global da aplicação |
| `app/vagas/page.tsx` | `/vagas` | Listagem geral com busca interativa e filtros |
| `app/vagas/[id]/page.tsx` | `/vagas/[id]` (ex: `/vagas/1`) | Detalhes da vaga, cópia de link e formulário de candidatura |
| `app/vagas/[id]/error.tsx` | `/vagas/[id]` (em caso de erro) | Tratamento de erro com botão `retry` |
| `app/vagas/[id]/not-found.tsx` | `/vagas/9999` (id inexistente) | Tela 404 contextualizada da vaga |
| `app/empresas/[slug]/page.tsx` | `/empresas/[slug]` (ex: `/empresas/aurora-tech`) | Página da empresa com alternância de abas |
| `app/(institucional)/termos/page.tsx` | `/termos` | Termos de uso (Route Group sem prefixo) |
| `app/(institucional)/privacidade/page.tsx` | `/privacidade` | Política de privacidade (Route Group sem prefixo) |

---

## ⚙️ Saída do `npm run build`

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /empresas/[slug]
├ ○ /privacidade
├ ○ /termos
├ ○ /vagas
└ ƒ /vagas/[id]

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

---

## � Como Rodar o Projeto Localmente

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

Publicado na [Vercel](https://vercel.com). Commits na branch `main` disparam o deploy automaticamente.

---

**Autor:** Marcelo Filho  
*Aula 03 · Introdução ao Next.js · NickDev (Um Leque de Tecnologia)*
