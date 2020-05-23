const walk = require("../.");

const expectedPaths = [
  "tests/sampleToTransverse",
  "tests/sampleToTransverse/b",
  "tests/sampleToTransverse/b/g",
  "tests/sampleToTransverse/b/h",
  "tests/sampleToTransverse/c",
  "tests/sampleToTransverse/c/d",
  "tests/sampleToTransverse/c/d/e",
  "tests/sampleToTransverse/c/f",
  "tests/sampleToTransverse/i",
];

describe("walk", () => {
  it("should walk the sample folder recursively", async () => {
    const paths = await walk({
      root: "tests/sampleToTransverse",
      includeFolders: true,
    });

    expect(paths.sort()).toEqual(expectedPaths);
  });

  it("should wait for all promises returned by onPath to resolve", async () => {
    const paths = [];
    const onPath = (path) =>
      new Promise((resolve) =>
        setTimeout(() => {
          paths.push(path);
          resolve();
        }, 100)
      );

    await walk({
      onPath,
      root: "tests/sampleToTransverse",
      includeFolders: true,
    });

    expect(paths.sort()).toEqual(expectedPaths);
  });
});
