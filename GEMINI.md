# GEMINI.md — Memória Técnica Permanente (CSS Lab)

## 1. Visão Geral e Stack

- **Projeto:** **CSS Lab** — plataforma pessoal viva ("Segunda Memória") para consulta, estudo e experimentação de CSS moderno, *Every Layout* (composição algorítmica) e padrões de arquitetura frontend.
- **Produção:** `https://css.mouro.dev`
- **Repositório:** `moouro/css-lab` (branch `main`, commits assinados via SSH Ed25519).
- **Stack Principal:**
  - **Framework:** Astro 7 (`output: "static"` SSG, 99 páginas geradas, transições SPA via `ClientRouter` / `astro:transitions`).
  - **Estilos:** Tailwind CSS v4 com Cascade Layers explícitos (`@layer theme, base, primitives, components, utilities`), design tokens nativos com `light-dark()` e primitivas do *Every Layout*.
  - **Tipografia (100% self-hosted):** `@fontsource/ibm-plex-sans` (pesos 400–700) + `@fontsource-variable/jetbrains-mono`.
  - **Busca Estática:** Pagefind v1.6.0 (`pt-br`, 88 páginas / 4.116 palavras indexadas no `postbuild`).
  - **Deploy & CI/CD:** Cloudflare Workers Static Assets (`wrangler.jsonc`) com Cloudflare Workers Builds conectado à branch `main` (`npm run build` + `npx wrangler deploy`).
  - **Segurança:** CSP estrito em `BaseLayout.astro` e `public/_headers` (`font-src 'self' data:;`), zero tracking/CDNs externos, assets `/_astro/*` com cache imutável de 1 ano.
- **Estrutura Chave:**
  - `DESIGN.md` — **Antes de construir ou alterar qualquer UI, leia `DESIGN.md`.** Regras destiladas de Design Engineering, motion, mobile-native e copy.
  - `src/styles/` — `app.css`, `tokens.css`, `typography.css`, `global.css`, `every-layout.css`, `hubs.css`, `utilities.css`.
  - `src/layouts/` — `BaseLayout.astro`, `DocLayout.astro`.
  - `src/components/global/` — `Header.astro`, `Footer.astro`, `CommandPalette.astro`.
  - `src/components/ui/` — `UiIcon.astro`, `ThemeToggle.astro`, `LayoutInspector.astro`, `CodeCopyEnhancer.astro`, `BookmarkButton.astro`, `MasteryButton.astro`.
  - `src/components/content/` — `Callout.astro`, `AntiPattern.astro`, `Checklist.astro`, `PropsTable.astro`, `Playground.astro`.
  - `src/components/layout/` — 13 primitivas do *Every Layout* (`Stack`, `Box`, `Center`, `Cluster`, `Sidebar`, `Switcher`, `Cover`, `Grid`, `Frame`, `Reel`, `Imposter`, `Icon`, `Container`).
  - `src/pages/` — `index.astro`, `404.astro` e os 9 Hubs (`every-layout`, `css-moderno`, `grid-lab`, `flexbox-lab`, `container-query-lab`, `components`, `snippets`, `cheatsheets`, `design-tokens`).
  - `design-system/css-lab/MASTER.md` — fonte de verdade do Design System (gerado via UI UX Pro Max).

---

## 2. Decisões de Arquitetura (e o que decidimos evitar)

### Adotado
- **Visual Mintlify Docs (`MASTER.md`):** bordas *whisper-quiet* translúcidas (`rgb(15 23 42 / 0.08)` no Light / `rgb(255 255 255 / 0.08)` no Dark), cantos suaves (`6px / 12px / 16px`), sombras ambientes sutis, acento Esmeralda/Teal (`#0D9373` Light / `#10B981` Dark) e paridade completa Light/Dark via `light-dark()`.
- **Iconografia 100% SVG inline:** centralizada em `src/components/ui/UiIcon.astro` (`stroke-width="1.75"`, `aria-hidden="true"`).
- **CSS unificado para os 9 Hubs:** extraído para `src/styles/hubs.css` dentro de `@layer components`, eliminando ~1.700 linhas duplicadas.
- **Padrões Modern Web Guidance aplicados:**
  - `copy-button`: Invoker Commands (`command="--copy"` + `commandfor`) com fallback `click` (`!('CommandEvent' in window)`), botão icon-only (`aria-label`), bolha externa `role="status"` alternada apenas via `opacity` e dedup `\u00A0` para VoiceOver.
  - `scrollspy`: `scroll-target-group: auto` em `.toc-nav`, `:is(:target-current, .target-current)` (nunca vírgula fora de `:is()`), `tabindex="-1"` nos títulos-alvo, sincronização de `aria-current` em `scrollend` e fallback `IntersectionObserver` + `scroll` (rAF) para Firefox/Safari.
  - `form-factor-adaptation`: `--target-size: 24px` / `44px` em `@media (pointer: coarse)` e tabelas responsivas em cards empilhados (`<= 640px`).
- **Infraestrutura & Homelab:** `wrangler.jsonc` permanece versionado (IaC obrigatório para o CI/CD da Cloudflare; sem credenciais). No AdGuard Home local (`172.16.0.103`), manter exceção `@@||css.mouro.dev^` para evitar captura pelo wildcard `*.mouro.dev`.

### Evitado Explicitamente
- **Bordas duras e estética quadriculada rígida (`2px` / `#64748b`):** descartada após avaliação da tentativa Editorial Suíço.
- **Emojis como ícones de UI:** removidos de Header, Footer, Home, `DocLayout`, `Callout`, `AntiPattern`, `Checklist`, `Playground`, `ThemeToggle`, `LayoutInspector` e `BookmarkButton`.
- **Fonte `Inter` genérica e CDNs de fontes externas:** mantido 100% self-hosted para preservar CSP estrito e zero tracking.
- **Clichês visuais de IA:** sem `box-shadow` pesado, `translateY(-4px)` ou pseudo-elementos neon `::before` nos cards dos Hubs.
- **Vazamento de segredos ou skills locais no Git:** `.agents/`, `.dev.vars*`, `.wrangler/`, `*.pem`, `*.key`, `*.cert`, `*.crt`, caches e arquivos de IDE estão protegidos no `.gitignore`.

---

## 3. Estado Atual (Concluído e Funcionando em Produção)

- [x] **Deploy & CI/CD:** `https://css.mouro.dev` ativo em Cloudflare Workers Static Assets com build automático via GitHub `main` e CSP corrigido (`font-src 'self' data:;`).
- [x] **Redesign Mintlify Docs (Fase 1 e Fase 2):** Home com Hero focado em busca (`data-open-search`), Header translúcido (`0.92`), Footer, `DocLayout`, todos os 9 Hubs (`hubs.css`) e componentes de conteúdo padronizados sem emojis.
- [x] **Busca Pagefind (`⌘K` e `/`):** modal nativo `<dialog>` com filtro *Seção* compacto sem espaço vazio e snippets limpos (`data-pagefind-ignore` em breadcrumbs, metadados, botões de ação e paginação).
- [x] **Botão "Copiar Código" Global (`CodeCopyEnhancer.astro`):** ativo em todos os blocos `<pre>` dos 88 guias, 25 Snippets e `AntiPattern`.
- [x] **Scroll-Spy no TOC Lateral Direito (`DocLayout.astro`):** indicador ativo em trilha vertical Mintlify ao rolar para cima/baixo no desktop (`> 1080px`), `scroll-margin-block-start: 5.5rem` nos headings e correção da altura de linha em tópicos de 2 linhas.
- [x] **Memória Local de Estudo (`localStorage`):**
  - `css-lab-recent`: registra últimos 3 guias visitados e exibe a seção **"Continuar estudando"** na Home.
  - `css-lab-mastered`: botão **"Dominado"** (`MasteryButton.astro`) nos guias com selo correspondente nos recentes da Home.
  - `css-lab-bookmarks`: botão **"Salvar na Memória"** (`BookmarkButton.astro`) + chips na Home.
- [x] **Playgrounds Responsivos (`Playground.astro`):** slider de espaçamento, presets de largura (`320px`, `640px`, `100%`), redimensionamento horizontal (`resize: horizontal`) e leitura ao vivo em `px` via `ResizeObserver`.
- [x] **Responsividade & UX Mobile:** zero overflow horizontal (375px–1440px), `PropsTable` sem quebra de palavras no desktop e em cards no mobile, `Checklist` em grid `auto 1fr`, `ThemeToggle` 1-clique (Claro ↔ Escuro) e `LayoutInspector` reposicionado no canto inferior direito (`safe-area-inset-bottom`).
- [x] **Design Engineering & Identidade Autoral (`emilkowalski/skills` + `human-writing`):** paleta Editorial Neutra + Azul Cobalto Técnico (`#2563EB` / `#60A5FA`), remoção do `.hero-glow` genérico, `HeroLabDemo.astro` (`@container` interativo ao vivo na Home), drawer mobile com `@starting-style` + `--ease-drawer`, curvas `cubic-bezier(0.23, 1, 0.32, 1)` (`150ms/200ms/320ms`), piso touch mobile-native, `:hover` isolado com `@media (hover: hover) and (pointer: fine)`, copy refinado na Home/Footer com link discreto para `mouro.dev` e `DESIGN.md` na raiz.
- [x] **Validação:** `astro check` (`0 errors, 0 warnings, 0 hints`) e `astro build` (99 páginas / 88 indexadas).

---

## 4. Próximos Passos Planejados

- [ ] Rodar verificação visual final pós-deploy em `https://css.mouro.dev` (Desktop + Mobile) validando `CodeCopyEnhancer`, `Scroll-Spy`, `MasteryButton`, `Continuar estudando` e presets do `Playground`.
- [ ] (Opcional) Substituir o último emoji restante (`🖨`) no botão de impressão de `src/pages/cheatsheets/[...slug].astro` por `<UiIcon />`.
- [ ] Expandir novos guias MDX, snippets ou laboratórios interativos conforme necessidade de estudo.

---

## 5. Resumo Técnico da Sessão Atual (2026-11-21 a 2026-11-23)

- **Commits publicados em `origin/main` (assinados via SSH):**
  - `ca48daf` — fortalecimento do `.gitignore` (`.dev.vars*`, chaves/certificados, logs, IDEs).
  - `e63f221` — setup local do UI UX Pro Max (`.agents/` ignorado), criação do `MASTER.md`, migração para `IBM Plex Sans` self-hosted e `UiIcon.astro`.
  - `b816478` — pivô visual para **Mintlify Docs** (bordas *whisper-quiet*, cantos `6/12/16px`, acento Esmeralda/Teal, Hero com barra de busca).
  - `2d09995` — correções da auditoria ao vivo (CSP `font-src 'self' data:;`, `PropsTable`, `Checklist`, `data-pagefind-ignore`, `LayoutInspector` à direita, `ThemeToggle` 1-clique e opacidade do Header `0.92`).
  - `2e2bf76` — `CodeCopyEnhancer.astro` global (`command="--copy"` + fallback), atalho `/` e ajuste do filtro no `CommandPalette.astro`.
  - `c43f378` — Fase 2 Mintlify Docs (`Callout`, `AntiPattern`, `Checklist`, `PropsTable`, `BookmarkButton`, `hubs.css` nos 9 Hubs), `MasteryButton.astro`, seção "Continuar estudando" em `index.astro` e presets/ResizeObserver em `Playground.astro`.
  - `9f7e18b` — Scroll-Spy ativo no TOC lateral direito (`DocLayout.astro`) com `scroll-target-group: auto` + fallback `IntersectionObserver`/`scroll`.
- **Principais arquivos criados/modificados:** `design-system/css-lab/MASTER.md`, `src/styles/tokens.css`, `src/styles/hubs.css`, `src/styles/app.css`, `src/layouts/BaseLayout.astro`, `src/layouts/DocLayout.astro`, `src/components/global/Header.astro`, `src/components/global/CommandPalette.astro`, `src/components/ui/UiIcon.astro`, `src/components/ui/CodeCopyEnhancer.astro`, `src/components/ui/MasteryButton.astro`, `src/components/ui/ThemeToggle.astro`, `src/components/ui/LayoutInspector.astro`, `src/components/ui/BookmarkButton.astro`, `src/components/content/{Callout,AntiPattern,Checklist,PropsTable,Playground}.astro`, `src/pages/index.astro`, 9 arquivos `src/pages/*/index.astro` e `public/_headers`.

- **Sessão 2026-11-27 (Design Engineering + Home de Documentação Guiada + Human-Writing + Auditoria Browser):**
  - Instaladas skills `emilkowalski/skills` localmente em `.agents/skills/` (ignoradas pelo Git junto com `skills-lock.json`).
  - Aplicadas diretrizes de `emil-design-eng`, `improve-animations`, `remove-animations`, `mobile-native`, `learn-taste` e `human-writing` com paleta Editorial Neutra + Azul Cobalto Técnico (`#2563EB` / `#60A5FA`), drawer mobile com `@starting-style` e `DESIGN.md` na raiz.
  - Evolução da Home para **Modo Documentação Guiada (Opção 2)**: CTA primário *"Começar pelos fundamentos"* (`/flexbox-lab/fundamentals`) ao lado da busca `⌘K`, trilha *"Por onde começar"* em 3 níveis (Iniciante, Intermediário, Dia a dia), `HeroLabDemo.astro` traduzido para português didático e reescrita das introduções dos 9 Hubs eliminando jargões e clichês de IA.
  - Auditoria local via navegador (`1280×800` e `375×812`) sem erros de rede/overflow; corrigido erro de CSP em transições do `ClientRouter` (`data:` em `script-src`) e elevada opacidade de `--color-header-bg` para `0.96`.
  - **Arquivos criados/modificados:** `DESIGN.md`, `GEMINI.md`, `.gitignore`, `public/_headers`, `src/components/home/HeroLabDemo.astro`, `src/layouts/BaseLayout.astro`, `src/layouts/DocLayout.astro`, `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/hubs.css`, `src/components/global/{Header,Footer,CommandPalette}.astro`, `src/components/ui/{ThemeToggle,CodeCopyEnhancer}.astro`, `src/pages/index.astro` e os 9 arquivos `src/pages/*/index.astro`.

---

## Manutenção de Memória do Projeto

- Sempre que o usuário pedir para **"salvar progresso"**, **"encerrar sessão"** ou **"atualizar memória"**, atualize o arquivo `GEMINI.md` na raiz do projeto marcando as tarefas concluídas em **"Estado Atual"**, ajustando os **"Próximos Passos"** e registrando a data e o resumo técnico das mudanças no final do arquivo.
