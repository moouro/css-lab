# Design System Master: CSS Lab (`css.mouro.dev`)

> **Generated with:** UI UX Pro Max (`FAQ/Documentation Landing` + `Soft UI Evolution` + `Bento`)
> **Visual References:** Mintlify Docs (`mintlify.com/docs`), Vercel Docs (`vercel.com/docs`), GitBook (`gitbook.com/docs`)
> **Status:** Ativo (Fase 1 — Mintlify Docs Aesthetic)

---

## 1. Aesthetic Direction

- **Style:** **Modern Documentation (Mintlify / Soft UI Evolution)**
- **Borders:** *Whisper-quiet* — bordas translúcidas ultra-sutis (`rgb(15 23 42 / 0.08)` no Light, `rgb(255 255 255 / 0.08)` no Dark). Sem caixas cinzas pesadas.
- **Radii:** Cantos macios e modernos (`--radius-s: 6px`, `--radius-m: 12px`, `--radius-l: 16px`, `--radius-full: 9999px`).
- **Elevation:** Separação por contraste tonal suave de superfície + sombra ambiente delicada no hover.
- **Header:** Translúcido com `backdrop-filter: blur(16px)` e botões de ação leves (sem bordas grossas).
- **Hero:** Focado em **Busca em destaque** (barra interativa que abre o Pagefind) + pílulas de acesso rápido.

---

## 2. Color System (Light & Dark Parity — Mintlify Emerald/Teal)

| Token | Light Mode | Dark Mode | Papel |
|---|---|---|---|
| `--color-bg` | `#FFFFFF` | `#090B0E` | Canvas principal limpo |
| `--color-bg-raised` | `#FAFAFA` | `#0E1116` | Superfícies secundárias, footer |
| `--color-bg-surface` | `#FFFFFF` | `#11151C` | Cards e painéis |
| `--color-bg-inset` | `#F4F5F7` | `#161B24` | Inputs, badges, blocos recuados |
| `--color-bg-hover` | `#F4F6F8` | `#171D27` | Hover suave |
| `--color-border` | `rgb(15 23 42 / 0.08)` | `rgb(255 255 255 / 0.08)` | Bordas *whisper-quiet* |
| `--color-border-strong` | `rgb(15 23 42 / 0.14)` | `rgb(255 255 255 / 0.14)` | Bordas de inputs/busca/hover |
| `--color-accent` | `#0D9373` | `#10B981` | Mintlify Emerald/Teal |
| `--color-accent-hover` | `#0A7A5F` | `#34D399` | Hover do acento |
| `--color-on-accent` | `#FFFFFF` | `#032219` | Texto sobre botão primário |
| `--color-accent-muted` | `rgb(13 147 115 / 0.09)` | `rgb(16 185 129 / 0.13)` | Fundo tonal suave de ícones/badges |

---

## 3. Typography & Iconography

- **Sans:** `IBM Plex Sans` (self-hosted via `@fontsource/ibm-plex-sans`)
- **Mono:** `JetBrains Mono Variable` (self-hosted via `@fontsource-variable/jetbrains-mono`)
- **Icons:** 100% SVG inline via `src/components/ui/UiIcon.astro` (zero emojis).
