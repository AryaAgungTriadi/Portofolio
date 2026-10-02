type Message = { id: string; parent_id: string | null; created_at: string };
export function threadMessages<T extends Message>(entries: T[]): { entry: T; nested: boolean }[] {
  const sorted = [...entries].sort((a,b)=>Date.parse(a.created_at)-Date.parse(b.created_at));
  const ids = new Set(sorted.map(entry=>entry.id));
  const visited = new Set<string>();
  const children = new Map<string,T[]>();
  for (const entry of sorted) if (entry.parent_id) children.set(entry.parent_id,[...(children.get(entry.parent_id)??[]),entry]);
  const result: {entry:T; nested:boolean}[] = [];
  const visit = (entry:T,nested:boolean) => {
    if (visited.has(entry.id)) return;
    visited.add(entry.id);result.push({entry,nested});
    for (const child of children.get(entry.id)??[]) visit(child,true);
  };
  for (const entry of sorted) if (!entry.parent_id || !ids.has(entry.parent_id)) visit(entry,false);
  // Defensive fallback for malformed/cyclic data. Every message still appears once.
  for (const entry of sorted) visit(entry,false);
  return result;
}
