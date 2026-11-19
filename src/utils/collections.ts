import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

/**
 * Busca entradas publicadas (não rascunho) de uma coleção do Astro,
 * retornando-as ordenadas de forma imutável pelo campo `order`.
 */
export async function getPublishedCollection<C extends CollectionKey>(
  collection: C,
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return entries.toSorted((a, b) => a.data.order - b.data.order);
}
