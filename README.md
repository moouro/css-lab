# 📐 CSS Lab — Segunda Memória de CSS & Layout

> Plataforma de documentação, consulta e experimentação de arquitetura CSS moderno e layout algorítmico intrínseco. Construída com Astro, Every Layout (3ª Edição), Tailwind CSS v4, Shiki dual-theme e Pagefind.

[![Live Site](https://img.shields.io/badge/Site-css.mouro.dev-blue?style=for-the-badge&logo=cloudflare)](https://css.mouro.dev)
[![Astro](https://img.shields.io/badge/Astro-7.4-orange?style=for-the-badge&logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Cloudflare Workers](https://img.shields.io/badge/Deploy-Cloudflare_Workers_Assets-F38020?style=for-the-badge&logo=cloudflare)](https://workers.cloudflare.com)
[![Search](https://img.shields.io/badge/Search-Pagefind_WASM-success?style=for-the-badge)](https://pagefind.app)

---

## 🧭 Visão Geral

O **CSS Lab** é uma "segunda memória" profissional viva para desenvolvedores que buscam dominar CSS moderno sem depender de frameworks pesados, breakpoints frágeis ou complexas cadeias de compilação.

O projeto é guiado pelo axioma central de *Every Layout*: **o layout deve responder ao conteúdo e ao espaço disponível, e não à largura arbitrária do dispositivo.** O próprio site é inteiramente construído com as primitivas e decisões arquiteturais que documenta.

---

## 🏛️ Os 9 Pilares de Conhecimento

| Pilar | Descrição | Conteúdo |
| :--- | :--- | :---: |
| 📐 **[Every Layout](/every-layout)** | As 13 primitivas universais de Heydon Pickering & Andy Bell aplicadas em código nativo. | **13 Primitivas** |
| ⚡ **[CSS Moderno](/css-moderno)** | Nesting nativo, Cascade Layers, `:has()`, `:is()/:where()`, `light-dark()` e propriedades lógicas. | **11 Tópicos** |
| ⊞ **[Grid Lab](/grid-lab)** | Do `minmax()` com `auto-fill` até `subgrid` e mapeamento semântico de `grid-template-areas`. | **7 Guias** |
| ⇄ **[Flexbox Lab](/flexbox-lab)** | Domínio profundo de `flex-basis`, Holy Albatross, eixos, quebra de linha suave e alinhamento. | **6 Guias** |
| ⧉ **[Container Queries](/container-query-lab)** | Size queries, style queries, unidades `cqi`/`cqw` e componentes verdadeiramente modulares. | **5 Guias** |
| ❖ **[Componentes](/components)** | Buttons, Modals com `<dialog>` nativo, Tabs acessíveis, Accordions e Cards resilientes. | **10 Componentes** |
| ✂ **[Snippets](/snippets)** | Padrões de código prontos para copiar e colar em projetos de produção. | **25 Snippets** |
| 📄 **[Cheatsheets](/cheatsheets)** | Tabelas e referências compactas formatadas e otimizadas para impressão em papel A4. | **6 Guias A4** |
| 🎨 **[Design Tokens](/design-tokens)** | Arquitetura de variáveis CSS, escalas tipográficas fluidas e paletas `oklch`. | **5 Guias** |

---

## ⚡ Recursos e Ferramentas Embutidas

- **🔍 Busca Offline via WebAssembly (<kbd>⌘K</kbd> ou <kbd>Ctrl+K</kbd>):**
  Indexação estática via [Pagefind](https://pagefind.app) em pt-BR. Funciona instantaneamente sem chamadas de API externas, com suporte a realce semântico e sub-resultados.
- **🌓 Sistema de Temas com `light-dark()` (<kbd>⇧T</kbd>):**
  Ciclo trifásico (*Sistema → Claro → Escuro*) sem flash de cor incorreta (FOUC), persistido no `localStorage` e sincronizado com transições de tela (`ClientRouter`).
- **📐 Inspetor do Every Layout (<kbd>⇧L</kbd>):**
  Widget em tempo real que desenha contornos coloridos e identifica todas as 13 primitivas estruturais ativas na página inspecionada.
- **⭐ Minha Segunda Memória (Favoritos Locais):**
  Permite favoritar qualquer artigo ou snippet com um clique, armazenando a lista diretamente no navegador para acesso rápido na página inicial.
- **📱 Responsividade Intrínseca:**
  Zero dependência de media queries mágicas em cascata. Gaveta de navegação mobile com `<dialog>`, menu colapsável em acordeão para coleções e contenção de scroll horizontal com `overflow-x: clip`.

---

## 🛡️ Segurança e Performance (Hardening)

- **Content Security Policy (CSP) Estrita:**
  Restrição de scripts apenas para `'self'`, WebAssembly local e telemetria anônima do Cloudflare Insights.
- **Cabeçalhos de Segurança HTTP:**
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy` configurados via `public/_headers`.
- **Cache Imutável:**
  Assets com hash em `/_astro/*` servidos com `Cache-Control: public, max-age=31536000, immutable`.
- **0 Vulnerabilidades:**
  Auditado e mantido limpo via `npm audit`.

---

## 🛠️ Tecnologias e Dependências

- **Core:** [Astro v7](https://astro.build) (Modo Estático / SSG) + [Content Collections v2.0](https://docs.astro.build/en/guides/content-collections/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com) (Arquitetura `@layer` + `@theme`) + CSS Nativo
- **Tipografia & Ícones:** `@fontsource-variable/inter` e `@fontsource-variable/jetbrains-mono`
- **Sintaxe & Code Highlight:** [Shiki](https://shiki.style) Dual-Theme (`github-light-default` / `github-dark-default`)
- **Busca:** [Pagefind Extended](https://pagefind.app) v1.6.0
- **Hospedagem & CDN:** [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)

---

## 💻 Desenvolvimento Local

### Pré-requisitos
- Node.js 20+ (ou gerenciado via nvm)
- Git com suporte a assinatura de commits (opcional)

### 1. Clonar e Instalar
```bash
git clone git@github.com:moouro/css-lab.git
cd css-lab
npm install
```

### 2. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:4321](http://localhost:4321).

### 3. Verificar Tipagem e Build Estático
```bash
npm run check   # Validação de tipos Astro e TypeScript
npm run build   # Compila as páginas estáticas e gera o índice do Pagefind
npm run preview # Visualização prévia da versão de produção
```

---

## 🚀 Integração Contínua (CI/CD) no Cloudflare Workers

O projeto está pronto para integração contínua automática através do **Cloudflare Workers Builds**. A cada commit ou pull request na branch `main`, o Cloudflare compila e publica a nova versão no subdomínio `css.mouro.dev`.

### Passo a Passo de Configuração:

1. Acesse o [Painel da Cloudflare](https://dash.cloudflare.com) e navegue até **Workers & Pages**.
2. Clique em **Create application** > selecione **Workers** ou conecte via **Workers Builds**.
3. Selecione o repositório **`moouro/css-lab`** da sua conta GitHub.
4. Defina as configurações de Build:
   - **Framework Preset:** `Astro` (ou `None`)
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist`
5. Salve e implante (**Save and Deploy**).
6. Em **Settings > Triggers > Custom Domains**, confirme a rota para:
   ```txt
   css.mouro.dev
   ```

A partir desse momento, qualquer `git push origin main` atualizará seu ambiente global automaticamente!

---

## 📄 Licença e Créditos

Distribuído sob a licença [MIT](LICENSE).

Conceitos de layout intrínseco e primitivas composable inspirados na obra seminal *Every Layout (3rd Edition)* por [Heydon Pickering](https://heydonworks.com) & [Andy Bell](https://bell.bz).
