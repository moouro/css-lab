import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ─── Shared Base Schema ──────────────────────────────
const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  draft: z.boolean().default(false),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
  order: z.number().default(0),
  relatedContent: z.array(z.string()).default([]),
  layoutPrimitives: z.array(z.enum([
    'stack', 'box', 'center', 'cluster', 'sidebar',
    'switcher', 'cover', 'grid', 'frame', 'reel',
    'imposter', 'icon', 'container'
  ])).default([]),
});

// ─── 1. Every Layout Collection ───────────────────────
const everyLayout = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/every-layout' }),
  schema: baseSchema.extend({
    primitive: z.enum([
      'stack', 'box', 'center', 'cluster', 'sidebar',
      'switcher', 'cover', 'grid', 'frame', 'reel',
      'imposter', 'icon', 'container'
    ]),
    problem: z.string(),
    solution: z.string(),
    cssProperties: z.array(z.string()).default([]),
    propsApi: z.array(z.object({
      name: z.string(),
      type: z.string(),
      default: z.string().optional(),
      description: z.string(),
    })).default([]),
  }),
});

// ─── 2. CSS Moderno Collection ────────────────────────
const cssModerno = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/css-moderno' }),
  schema: baseSchema.extend({
    feature: z.string().default(''),
    browserSupport: z.enum(['stable', 'wide', 'emerging']).default('stable'),
    canIUseId: z.string().optional(),
  }),
});

// ─── 3. Grid Lab Collection ───────────────────────────
const gridLab = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/grid-lab' }),
  schema: baseSchema,
});

// ─── 4. Flexbox Lab Collection ────────────────────────
const flexboxLab = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/flexbox-lab' }),
  schema: baseSchema,
});

// ─── 5. Container Query Lab Collection ────────────────
const containerQueryLab = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/container-query-lab' }),
  schema: baseSchema,
});

// ─── 6. Component Library Collection ──────────────────
const components = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/components' }),
  schema: baseSchema.extend({
    anatomy: z.array(z.string()).default([]),
    hasPlayground: z.boolean().default(true),
    a11yNotes: z.string().optional(),
  }),
});

// ─── 7. Snippets Collection ───────────────────────────
const snippets = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/snippets' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['layout', 'typography', 'animation', 'utilities', 'patterns']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    order: z.number().default(0),
    language: z.enum(['css', 'html', 'js']).default('css'),
  }),
});

// ─── 8. Cheatsheets Collection ────────────────────────
const cheatsheets = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cheatsheets' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    order: z.number().default(0),
    printable: z.boolean().default(true),
  }),
});

// ─── 9. Design Tokens Collection ──────────────────────
const designTokens = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/design-tokens' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['colors', 'typography', 'spacing', 'borders', 'shadows']),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'every-layout': everyLayout,
  'css-moderno': cssModerno,
  'grid-lab': gridLab,
  'flexbox-lab': flexboxLab,
  'container-query-lab': containerQueryLab,
  'components': components,
  'snippets': snippets,
  'cheatsheets': cheatsheets,
  'design-tokens': designTokens,
};
