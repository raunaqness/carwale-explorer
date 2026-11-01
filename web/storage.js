// Shared by the list page (app.js) and the car page (car.js).
const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
// Saved cars live in the visitor's browser (IndexedDB); nothing is stored on the server.
const DB = (() => {
  const open = () => new Promise((res, rej) => {
    const r = indexedDB.open("cars-explorer", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("cars", { keyPath: "id" });
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  const run = async (mode, fn) => {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction("cars", mode), store = tx.objectStore("cars");
      const req = fn(store);
      tx.oncomplete = () => res(req && req.result);
      tx.onerror = tx.onabort = () => rej(tx.error);
    });
  };
  return {
    all: () => run("readonly", (s) => s.getAll()),
    put: (car) => run("readwrite", (s) => s.put(car)),
    putAll: (list) => run("readwrite", (s) => list.forEach((c) => s.put(c))),
    clear: () => run("readwrite", (s) => s.clear()),
  };
})();
const readPrefs = () => { try { return JSON.parse(localStorage.getItem("cwx-prefs")) || {}; } catch { return {}; } };
