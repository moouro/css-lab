# Design System Master: CSS Lab (`css.mouro.dev`)

> **Generated with:** UI UX Pro Max (`Minimalism & Swiss Style` + `Developer Mono`)
> **Audited & Hardened with:** EGM (`egm-design`, `egm-zoom-out`) + `modern-web-guidance` (`color`, `typography`, `form-factor-adaptation`, `accessibility`).
> **Status:** Aguardando aprovação para execução da **Fase 1** (Tokens, Tipografia, Ícones SVG, Header, Footer, Home).

---

## 1. Direção Estética & Arquitetura Visual

- **Estilo:** **Minimalismo Suíço / Editorial Técnico** (sem clichês de IA: sem emojis, sem gradientes neon, sem cards flutuantes com brilho no topo, sem eyebrow `//` estilo terminal clichê).
- **Paridade Light & Dark:** Suporte equivalente em Modo Claro (papel técnico limpo) e Modo Escuro (ardósia profunda) via CSS nativo `light-dark()` + `<meta name="color-scheme" content="light dark">`.
- **Geometria:** Cantos arquitetônicos precisos (`--radius-s: 2px`, `--radius-m: 4px`, `--radius-l: 6px`), hierarquia construída por **bordas reais `1px solid`**, ritmo tipográfico e contraste — sem depender de `box-shadow` em superfícies estáticas (mantendo `--shadow-*` intactos em `tokens.css` para overlays/modais e compatibilidade com a Fase 2).

---

## 2. Sistema de Cores (Calibrado para WCAG 1.4.3 & 1.4.11)

> **Decisão da Auditoria EGM:** Descartamos o *Signal Green* (`#22C55E`) sugerido no preset bruto de API Portal porque ele colidia semanticamente com `--color-success` (exemplos válidos de CSS) e repetia o clichê "terminal hacker". Adotamos um **Vermilion / Terracota Suíço** (inspirado no design gráfico editorial suíço), reservando verde apenas para sucesso e vermelho apenas para anti-patterns/erro.

| Semantic Token | Light Mode | Dark Mode | Contraste Verificado / Papel |
|---|---|---|---|
| `--color-bg` | `#F8FAFC` | `#0B0E14` | Canvas principal |
| `--color-bg-raised` | `#FFFFFF` | `#111622` | Header, Footer, Sidebar |
| `--color-bg-surface` | `#FFFFFF` | `#141A27` | Cards, painéis, tabelas |
| `--color-bg-inset` | `#F1F5F9` | `#07090E` | Inputs, blocos de código |
| `--color-bg-hover` | `#E2E8F0` | `#1C2436` | Hover sutil (150–200ms) |
| `--color-text-strong` | `#0F172A` | `#F8FAFC` | Títulos e ênfase (> 15:1) |
| `--color-text` | `#1E293B` | `#E2E8F0` | Texto corrido (> 12:1) |
| `--color-text-muted` | `#475569` | `#94A3B8` | Descrições e metadados (> 6.5:1) |
| `--color-text-subtle` | `#475569` | `#8496AE` | Legendas e índices (≥ 5.0:1 mesmo em `--color-bg-inset`) |
| `--color-border` | `#CBD5E1` | `#243044` | Linhas estruturais de layout |
| `--color-border-strong` | `#64748B` | `#64748B` | Bordas de controles interativos (4.7:1 Light / 3.6:1 Dark — WCAG 1.4.11 ✓) |
| `--color-accent` | `#C2410C` | `#FB923C` | Acento Editorial Suíço (Light 5.18:1 sobre branco; Dark 8.1:1 sobre `#0B0E14`) |
| `--color-accent-hover` | `#9A3412` | `#FDBA74` | Hover do acento |
| `--color-on-accent` | `#FFFFFF` | `#1C0A00` | Texto sobre `--color-accent` (5.18:1 Light / 9.2:1 Dark — WCAG AA/AAA ✓) |
| `--color-accent-muted` | `color-mix(in oklab, var(--color-accent) 11%, transparent)` | `color-mix(in oklab, var(--color-accent) 14%, transparent)` | Fundo suave de estados ativos (sempre `in oklab`, nunca `in oklch`) |
| `--color-success` | `#15803D` | `#4ADE80` | Exemplos válidos / boas práticas (sem colisão com o acento) |
| `--color-danger` | `#DC2626` | `#F87171` | Anti-patterns / alertas críticos (reutilizando token existente) |

### Compatibilidade & Forced Colors Mode
- Todos os aliases existentes em `src/styles/tokens.css` (`--color-fg`, `--color-fg-muted`, `--color-fg-subtle`, `--color-bg-subtle`, `--color-border-hover`, `--color-border-subtle`, `--color-text-code`, `--color-surface`, `--color-error`, `--accent-muted`, `--shadow-*`) serão mantidos mapeados para os novos valores — **zero quebra nas páginas da Fase 2**.
- Todos os usos de `color: #ffffff` sobre `var(--color-accent)` (`index.astro`, `utilities.css`, `LayoutInspector.astro`) migrarão para `var(--color-on-accent)`.
- Em `@media (forced-colors: active)`, todas as divisórias e estados ativos usam `border` real (`1px solid`) e `outline` com `CanvasText`/`Highlight`.

---

## 3. Tipografia (100% Self-Hosted, Zero Tracking)

> **Decisão da Auditoria EGM:** `JetBrains Mono` em títulos grandes em pt-BR causa quebras excessivas no mobile e fadiga de leitura nos 88 guias. Usaremos **`IBM Plex Sans`** para títulos e corpo, reservando **`JetBrains Mono`** para marcadores técnicos curtos.

- **Headings (`h1`–`h4`) & Body / UI:** `IBM Plex Sans` (`@fontsource/ibm-plex-sans`, pesos 400, 500, 600, 700 — self-hosted, preserva CSP `font-src 'self'`).
  - Headings: `font-weight: 600–700`, `letter-spacing: -0.025em`, `text-wrap: balance`.
  - Body: `line-height: 1.6`, `max-inline-size: 65ch`, `text-wrap: pretty`.
- **Código, Índices (`01–09`), Badges, `<kbd>`, Tabelas de Props:** `JetBrains Mono Variable` (`@fontsource-variable/jetbrains-mono`, já instalado).
- **Higiene Técnica:** Eliminar a declaração duplicada de `--font-sans`/`--font-mono` entre `tokens.css` e `typography.css`, e remover `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'` (específicos da fonte `Inter`).

---

## 4. Iconografia (Zero Emojis)

- Criar `src/components/ui/UiIcon.astro` enxuto (YAGNI: apenas os ~14 glifos usados na Fase 1, estilo Lucide/Phosphor com `stroke-width="1.75"`, `aria-hidden="true"`).
- Complementar ao `src/components/layout/Icon.astro` (que permanece como primitiva *Every Layout* de alinhamento).
- Substituir 100% dos emojis na Fase 1 (marca no Header/Footer, os 9 pilares na Home e gaveta mobile, Sol/Lua no `ThemeToggle`, estrela nos favoritos, lupa na busca, ícone do `LayoutInspector`).

---

## 5. Arquitetura da Fase 1 (Escopo Exato)

1. **`src/styles/tokens.css` & `src/styles/typography.css` & `src/styles/utilities.css`:**
   - Nova paleta editorial (Light + Dark), `--color-on-accent`, `--color-border-strong`, raios arquitetônicos (`2/4/6px`), fontes `IBM Plex Sans` + `JetBrains Mono` sem duplicação, `@media (forced-colors: active)`.
2. **`src/components/ui/UiIcon.astro` + `ThemeToggle.astro` + `LayoutInspector.astro`:**
   - Remoção total de emojis por SVGs nítidos + correção de contraste (`--color-on-accent`).
3. **`src/components/global/Header.astro` & `Footer.astro`:**
   - Cabeçalho editorial limpo com borda `1px`, marca com ícone SVG + wordmark técnico, controles com `--color-border-strong` (≥ 3:1) e alvo ≥ `44×44px` em `pointer: coarse`.
   - Rodapé estruturado em grade editorial com colofão limpo.
4. **`src/pages/index.astro` (Home):**
   - **Hero Editorial Assimétrico (alinhado à esquerda):** Eyebrow técnico limpo em caixa alta (`ARQUITETURA CSS · EVERY LAYOUT`), título forte em `IBM Plex Sans` (`700`), descrição limitada a `62ch`, CTAs claros (`Explorar os 9 Pilares ↓` + `Buscar Conceito ⌘K`) e painel lateral/inferior de índice estrutural (`09 Pilares`, `13 Primitivas`, `88 Guias`, `0 Tracking`).
   - **Grid dos 9 Pilares:** Cards com **bordas reais `1px solid var(--color-border)`** (sem o truque `gap: 1px` de background que cria célula cinza órfã em 2 colunas e falha em Forced Colors Mode), índice numérico `01`–`09` em `JetBrains Mono`, ícone SVG, transição limpa de borda/fundo no hover — zero `box-shadow` pesado, zero `translateY(-4px)`, zero linha neon no topo.
   - **Índice das 13 Primitivas:** Tabela limpa estilo especificação técnica.
