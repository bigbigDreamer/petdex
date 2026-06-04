import { describe, expect, it } from "bun:test";

import {
  applyPinChangeToPinnedSlugs,
  applyPinnedOrderChange,
} from "@/components/profile-pinning-state";

describe("profile pinning state", () => {
  it("keeps concurrently pinned pets when a saved reorder reports an older full list", () => {
    const afterPin = applyPinChangeToPinnedSlugs(
      ["boba", "quack", "corsair"],
      "boxcat",
      true,
      6,
    );

    expect(
      applyPinnedOrderChange(afterPin, ["corsair", "boba", "quack"]),
    ).toEqual(["corsair", "boba", "quack", "boxcat"]);
  });

  it("does not add duplicate pins or exceed the cap", () => {
    expect(
      applyPinChangeToPinnedSlugs(["boba", "quack"], "boba", true, 6),
    ).toEqual(["quack", "boba"]);

    expect(
      applyPinChangeToPinnedSlugs(["a", "b", "c", "d", "e", "f"], "g", true, 6),
    ).toEqual(["a", "b", "c", "d", "e", "f"]);
  });
});
