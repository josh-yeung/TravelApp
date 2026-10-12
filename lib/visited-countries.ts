import { useSyncExternalStore } from "react";

import { MOCK_VISITED_COUNTRIES } from "@/constants/profile";

type Listener = () => void;

let visitedIsos: string[] = [...MOCK_VISITED_COUNTRIES];
const listeners = new Set<Listener>();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function getVisited(): string[] {
  return visitedIsos;
}

export function setVisited(isos: string[]): void {
  const unique = [...new Set(isos.filter((iso) => iso.length === 2))].sort();
  const prev = visitedIsos.join(",");
  const next = unique.join(",");
  if (prev === next) {
    return;
  }
  visitedIsos = unique;
  emit();
}

export function subscribeVisited(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Subscribe to the in-memory visited ISO list (MVP — not persisted). */
export function useVisitedCountries(): string[] {
  return useSyncExternalStore(subscribeVisited, getVisited, getVisited);
}
