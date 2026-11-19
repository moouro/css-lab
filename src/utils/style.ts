/**
 * Combina CSS Custom Properties internas de uma primitiva de layout
 * com um atributo `style` externo (string ou objeto), mantendo tipagem estrita.
 */
export function mergeVars(
  vars: Record<string, string | undefined>,
  externalStyle?: astroHTML.JSX.HTMLAttributes['style'],
): astroHTML.JSX.HTMLAttributes['style'] {
  const cleanVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    if (value !== undefined && value !== '') {
      cleanVars[key] = value;
    }
  }

  if (typeof externalStyle === 'string') {
    const trimmed = externalStyle.trim();
    if (trimmed !== '') {
      const varsCss = Object.entries(cleanVars)
        .map(([k, v]) => `${k}:${v}`)
        .join(';');
      return varsCss ? `${varsCss};${trimmed}` : trimmed;
    }
  }

  if (externalStyle && typeof externalStyle === 'object') {
    return {
      ...cleanVars,
      ...(externalStyle as Record<string, string | number | undefined>),
    } as astroHTML.JSX.CSSProperties;
  }

  return Object.keys(cleanVars).length > 0
    ? (cleanVars as astroHTML.JSX.CSSProperties)
    : undefined;
}
