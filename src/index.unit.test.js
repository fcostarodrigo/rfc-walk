const fs = require("fs");
const walk = require("./index");

jest.mock("fs");

const mockReadDir = results => {
  for (const { folder: expectedFolder, result } of results) {
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe(expectedFolder);
      callback(...result);
    });
  }
};

describe("walk", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it("should transverse files recursively", async () => {
    mockReadDir([
      { folder: ".", result: [null, ["a", "b", "c"]] },
      { folder: "a", result: [{ code: "ENOTDIR" }] },
      { folder: "b", result: [{ code: "ENOTDIR" }] },
      { folder: "c", result: [null, ["d", "e"]] },
      { folder: "c/d", result: [{ code: "ENOTDIR" }] },
      { folder: "c/e", result: [{ code: "ENOTDIR" }] }
    ]);

    expect(await walk()).toEqual(["a", "b", "c/d", "c/e"]);
  });

  it("should propagate errors", () => {
    const error = new Error("error");

    fs.readdir.mockImplementationOnce((folder, callback) => {
      callback(error);
    });

    return expect(walk()).rejects.toBe(error);
  });

  it("should transverse starting in a folder", async () => {
    mockReadDir([
      { folder: "a/a", result: [null, ["a"]] },
      { folder: "a/a/a", result: [{ code: "ENOTDIR" }] }
    ]);

    expect(await walk({ root: "a/a" })).toEqual(["a/a/a"]);
  });

  it("should list folders", async () => {
    mockReadDir([
      { folder: ".", result: [null, ["a", "b"]] },
      { folder: "a", result: [null, ["c"]] },
      { folder: "a/c", result: [{ code: "ENOTDIR" }] },
      { folder: "b", result: [{ code: "ENOTDIR" }] }
    ]);

    expect(await walk({ includeFolders: true })).toEqual([
      ".",
      "a",
      "a/c",
      "b"
    ]);
  });

  it("should call onPath for each file", async () => {
    mockReadDir([
      { folder: ".", result: [null, ["a", "c"]] },
      { folder: "a", result: [{ code: "ENOTDIR" }] },
      { folder: "c", result: [null, ["d"]] },
      { folder: "c/d", result: [{ code: "ENOTDIR" }] }
    ]);

    const onPath = jest.fn();

    await walk({ onPath });

    expect(onPath.mock.calls[0][0]).toBe("a");
    expect(onPath.mock.calls[1][0]).toBe("c/d");
  });
});
