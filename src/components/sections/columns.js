/**
 * How many columns a row of `n` items should use.
 *
 * Picking `min(n, 4)` leaves a ragged last row whenever the count is not a
 * multiple of the columns: six items become a row of four and a row of two.
 * This prefers the widest column count that divides the items evenly, so six
 * items make two rows of three rather than four and two.
 *
 * Falls back to the old behaviour for counts with no useful divisor — seven
 * items cannot be even at any width, and four across is still the best of a
 * bad set.
 */
export function gridColumns(n, max = 4) {
  if (n <= max) return n || max
  for (let c = max; c >= 2; c--) if (n % c === 0) return c
  return max
}
