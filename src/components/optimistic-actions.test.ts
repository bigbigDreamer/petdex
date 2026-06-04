import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";

const petCardFooterSource = readFileSync(
  new URL("./pet-card-footer.tsx", import.meta.url),
  "utf8",
);

const profilePinButtonSource = readFileSync(
  new URL("./profile-pin-button.tsx", import.meta.url),
  "utf8",
);

const petGallerySource = readFileSync(
  new URL("./pet-gallery.tsx", import.meta.url),
  "utf8",
);

describe("optimistic lightweight actions", () => {
  it("keeps card favorites instant without a loading spinner", () => {
    expect(petCardFooterSource).not.toContain("Loader2");
    expect(petCardFooterSource).not.toContain("setBusy");
    expect(petCardFooterSource).toContain("JSON.stringify({ liked: next })");
    expect(petCardFooterSource).toContain("likeRequestSeq.current !== seq");
  });

  it("keeps profile pins instant without a loading spinner", () => {
    expect(profilePinButtonSource).not.toContain("Loader2");
    expect(profilePinButtonSource).not.toContain("setBusy");
    expect(profilePinButtonSource).toContain("useState(isPinned)");
    expect(profilePinButtonSource).toContain("setOptimisticPinned(nextPinned)");
    expect(profilePinButtonSource).toContain("pinRequestSeq.current === seq");
  });

  it("does not duplicate favorite state with the old caught dot", () => {
    expect(petGallerySource).not.toContain("CheckCircle2");
    expect(petGallerySource).not.toContain("caughtTitle");
    expect(petGallerySource).not.toContain("caught={");
  });
});
