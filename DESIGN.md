# DESIGN.md — Padrão de Design Engineering (CSS Lab)

Regras concretas de UI, motion, mobile-native e texto para o **CSS Lab** (`https://css.mouro.dev`).
Antes de criar ou alterar qualquer componente visual, consulte este arquivo e `design-system/css-lab/MASTER.md`.

---

## Surfaces & Depth

- **Identidade:** Editorial Técnico / Design Engineering — superfícies neutras puras (`#ffffff` / `#fafafa` no claro; `#0c0c0f` / `#121216` no escuro) e bordas hairline translúcidas: `rgb(9 9 11 / 0.08)` no claro e `rgb(255 255 255 / 0.09)` no escuro. Sem glows radiais decorativos no Hero.
- **Raio de borda:** `6px` (chips, botões pequenos), `12px` (cards, inputs), `16px` (modais, painéis).
- **Sombras:** ambientes e discretas (`--shadow-sm`, `--shadow-md`, `--shadow-lg`). Evite sombras pesadas ou glows saturados em cards.
- **Contenção de scroll:** toda região rolável interna (`.desktop-sidebar-sticky`, `.toc-sticky`, `.mobile-collection-content`, `.mobile-drawer`, `#pagefind-container`) usa `overscroll-behavior: contain` para não arrastar o scroll da página atrás.

## Color & Theme

- **Paridade Light/Dark nativa:** tokens em `src/styles/tokens.css` usando `light-dark()`.
- **Acento único:** Azul Cobalto Técnico (`#2563EB` no claro / `#60A5FA` no escuro) para foco, links ativos, scroll-spy e controles interativos.
- **Chrome do navegador:** `<meta name="theme-color">` com pares separados para `(prefers-color-scheme: light)` (`#ffffff`) e `(prefers-color-scheme: dark)` (`#0c0c0f`).

## Typography & Iconography

- **Fontes 100% self-hosted:** `IBM Plex Sans` (400–700) para interface/leitura e `JetBrains Mono` (variable) para código e metadados. Nunca adicionar CDNs externos (mantém CSP `font-src 'self' data:;`).
- **Ícones:** apenas SVG inline centralizado em `src/components/ui/UiIcon.astro` (`stroke-width="1.75"`, `aria-hidden="true"`). Sem emojis na UI.

## Motion

- **Curvas (`src/styles/tokens.css`):**
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` para entradas, hovers e respostas diretas.
  - `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` para drawers e sheets.
  - Nunca usar `ease-in` em controles de UI (passa sensação lenta).
- **Durações:** `--duration-fast: 150ms`, `--duration-normal: 200ms`, `--duration-slow: 320ms`. Transições de UI ficam abaixo de `300ms`.
- **Origem e escala:** popovers e dropdowns (`.dropdown-menu`) animam a partir do gatilho (`transform-origin: top left`, `scale(0.96) translateY(-4px)` -> `scale(1) translateY(0)` em `180ms`). Nunca animar a partir de `scale(0)`.
- **Mobile Drawer (`@starting-style`):** `.mobile-drawer` entra e sai com `translateX(100%)` -> `translateX(0)` em `320ms var(--ease-drawer)` (`transition-behavior: allow-discrete`), sem JavaScript de animação.
- **Feedback tátil:** controles clicáveis (`button:not(:disabled):active`, `[role="button"]:active`) respondem com `transform: scale(0.97)` em `120ms`. Botão de copiar código anima a troca de ícone (`scale(0.75)` -> `1` em `160ms var(--ease-out)`).
- **Propriedades explícitas:** nunca usar `transition: all`. Animar apenas propriedades específicas (`opacity`, `transform`, `color`, `background-color`, `border-color`, `box-shadow`).
- **Ações disparadas por teclado nunca animam:** `CommandPalette.astro` (`⌘K` / `/`) abre e fecha instantaneamente, sem atraso de transição.

## Mobile-Native

- **Viewport:** `width=device-width, initial-scale=1.0, viewport-fit=cover, interactive-widget=resizes-content`.
- **Safe areas:** `.site-header` usa `padding-block-start: env(safe-area-inset-top, 0px)` e `.mobile-drawer-content` respeita `env(safe-area-inset-bottom)`.
- **Piso de toque (`src/styles/global.css`):**
  - `-webkit-tap-highlight-color: transparent` e `-webkit-text-size-adjust: 100%` em `html`.
  - `touch-action: manipulation` em `button, a, [role="button"]`.
  - `user-select: none; -webkit-user-select: none; -webkit-touch-callout: none;` em botões.
  - `@media (pointer: coarse) { input, textarea, select { font-size: 16px; } }` para evitar zoom automático no iOS.
- **Hover isolado:** toda regra `:hover` fica dentro de `@media (hover: hover) and (pointer: fine)` para eliminar *sticky hover* em telas touch.

## Copy & Autoria

- **Tom:** técnico, direto, escrito de desenvolvedor para desenvolvedor (`human-writing`). Preferir dados concretos (ex.: "9 pilares · 13 primitivas · 88 guias") a adjetivos vazios ("robusto", "inovador", "em milissegundos").
- **Posicionamento:** referência pública de CSS moderno que também funciona como vitrine técnica do autor.
- **Assinatura discreta:** link `mouro.dev ↗` apenas no rodapé (`Footer.astro`) e no rodapé do menu mobile (`Header.astro`), mantendo a barra superior limpa.
