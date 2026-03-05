/**
 * Utility: cn()
 * Merges class name strings, filtering out falsy values.
 * No external dependencies — pure string concatenation.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
