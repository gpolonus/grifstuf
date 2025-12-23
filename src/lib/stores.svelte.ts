
export function writable(initialValue: any) {
  // Have to do this variable assignment bc of Svelte magic
  const s = $state({ value: initialValue });
  return s
}

export const siteTitle = writable('grifstuf');

