const walk = require("../.");

describe("walk", () => {
  it("should walk the sample folder recursively", async () => {
    const paths = await walk({ root: "tests/a", includeFolders: true });
    expect(paths.sort()).toEqual([
      "tests/a",
      "tests/a/b",
      "tests/a/b/g",
      "tests/a/b/h",
      "tests/a/c",
      "tests/a/c/d",
      "tests/a/c/d/e",
      "tests/a/c/f",
      "tests/a/i"
    ]);
  });
});
