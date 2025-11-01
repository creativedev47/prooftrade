import type { Plugin } from "vite";

// ...existing code...
export function componentTagger(): Plugin {
  return {
    name: "prooftrade-tagger",
    enforce: "pre",
    // implement hooks you need (transform, load, etc.)
    transform(code: string, id: string) {
      // no-op for now; return null to leave the file unchanged
      return null;
    },
  };
}
// ...existing code...