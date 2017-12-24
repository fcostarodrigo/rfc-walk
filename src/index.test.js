const fs = require("fs");
const walk = require("./index");

jest.mock("fs");

describe("walk", () => {
  it("should transverse files recursively", async () => {
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe(".");
      callback(null, ["a", "b", "c"]);
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("a");
      callback({ code: "ENOTDIR" });
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("b");
      callback({ code: "ENOTDIR" });
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("c");
      callback(null, ["d", "e"]);
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("c/d");
      callback({ code: "ENOTDIR" });
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("c/e");
      callback({ code: "ENOTDIR" });
    });

    expect(await walk()).toEqual(["a", "b", "c/d", "c/e"]);
  });

  it("should propagate errors", () => {
    const error = new Error("error");
    fs.readdir.mockImplementationOnce(() => {
      throw error;
    });
    return expect(walk()).rejects.toBe(error);
  });

  it("should transverse from a folder", async () => {
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("a/a");
      callback(null, ["a"]);
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("a/a/a");
      callback({ code: "ENOTDIR" });
    });
    expect(await walk({ root: "a/a" })).toEqual(["a/a/a"]);
  });

  it("should list folders", async () => {
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe(".");
      callback(null, ["a"]);
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("a");
      callback({ code: "ENOTDIR" });
    });
    expect(await walk({ folders: true })).toEqual([".", "a"]);
  });

  it("should callback for each file", async () => {
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe(".");
      callback(null, ["a", "b", "c"]);
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("a");
      callback({ code: "ENOTDIR" });
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("b");
      callback({ code: "ENOTDIR" });
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("c");
      callback(null, ["d", "e"]);
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("c/d");
      callback({ code: "ENOTDIR" });
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("c/e");
      callback({ code: "ENOTDIR" });
    });

    const callback = jest.fn();

    await walk({ callback });

    expect(callback.mock.calls[0][0]).toBe("a");
    expect(callback.mock.calls[1][0]).toBe("b");
    expect(callback.mock.calls[2][0]).toBe("c/d");
    expect(callback.mock.calls[3][0]).toBe("c/e");
  });

  it("should wait for all callbacks to resolve", async () => {
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe(".");
      callback(null, ["a", "b", "c"]);
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("a");
      callback({ code: "ENOTDIR" });
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("b");
      callback({ code: "ENOTDIR" });
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("c");
      callback(null, ["d", "e"]);
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("c/d");
      callback({ code: "ENOTDIR" });
    });
    fs.readdir.mockImplementationOnce((folder, callback) => {
      expect(folder).toBe("c/e");
      callback({ code: "ENOTDIR" });
    });

    const files = [];
    const callback = file =>
      new Promise(resolve =>
        setTimeout(() => {
          files.push(file);
          resolve();
        })
      );

    await walk({ callback });

    expect(files).toEqual(["a", "b", "c/d", "c/e"]);
  });
});
