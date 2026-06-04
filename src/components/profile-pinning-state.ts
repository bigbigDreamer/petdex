export function applyPinChangeToPinnedSlugs(
  currentSlugs: string[],
  slug: string,
  nextPinned: boolean,
  maxPins: number,
): string[] {
  const normalizedSlug = slug.toLowerCase();
  const withoutSlug = currentSlugs.filter((item) => item !== normalizedSlug);
  if (!nextPinned) return withoutSlug;
  if (withoutSlug.length >= maxPins) return currentSlugs;
  return [...withoutSlug, normalizedSlug];
}

export function applyPinnedOrderChange(
  currentSlugs: string[],
  orderedSlugs: string[],
): string[] {
  const currentSet = new Set(currentSlugs);
  const orderedCurrentSlugs = orderedSlugs.filter((slug) =>
    currentSet.has(slug),
  );
  const orderedSet = new Set(orderedCurrentSlugs);
  const remainingSlugs = currentSlugs.filter((slug) => !orderedSet.has(slug));
  return [...orderedCurrentSlugs, ...remainingSlugs];
}

export function hasSamePinnedOrder(left: string[], right: string[]): boolean {
  return (
    left.length === right.length && left.every((slug, i) => slug === right[i])
  );
}

export function shouldResetPinnedOrderFromProps({
  previousPropSlugs,
  nextPropSlugs,
  currentOrderSlugs,
}: {
  previousPropSlugs: string[];
  nextPropSlugs: string[];
  currentOrderSlugs: string[];
}): boolean {
  if (hasSamePinnedOrder(previousPropSlugs, nextPropSlugs)) return false;
  return !hasSamePinnedOrder(currentOrderSlugs, nextPropSlugs);
}
