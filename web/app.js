const CORE = [
  { key: "car", label: "Car" },
  { key: "variant", label: "Variant" },
  { key: "on_road", label: "On-road", num: true },
  { key: "ex_showroom", label: "Ex-showroom", num: true },
  { key: "fuel", label: "Fuel" },
  { key: "gearbox", label: "Gearbox" },
  { key: "power", label: "Power" },
  { key: "brochure", label: "Brochure" },
];
const state = { cars: new Set(), gearbox: new Set(), fuel: new Set(), features: new Set(), facets: new Map(), hidden: new Set(), maxPrice: 0, sort: { key: "on_road", dir: 1 } };
let rows = [], cars = [], saved = [], cityList = [];
let city = { slug: "bangalore", name: "Bangalore" };
const $ = (id) => document.getElementById(id);
const lakh = (n) => (n ? `₹${(n / 1e5).toFixed(2)} L` : "n/a");
const uniq = (arr) => [...new Set(arr.filter(Boolean))].sort();
const gearGroup = (g) => (g || "").split(" ")[0]; // Automatic / Manual / Clutchless...

function checkboxes(el, values, set, label = (v) => v) {
  el.innerHTML = values.map((v) => `<label><input type="checkbox" value="${esc(v)}"> ${esc(label(v))}</label>`).join("");
  el.onchange = (e) => {
    e.target.checked ? set.add(e.target.value) : set.delete(e.target.value);
    render();
  };
}

// ---- small preferences (selected city, hidden cars) live in localStorage; saved cars in IndexedDB (storage.js)
const prefs = {
  get: readPrefs,
  save: () => localStorage.setItem("cwx-prefs", JSON.stringify({ city: city.slug, hidden: [...state.hidden] })),
};

// ---- turn saved cars + the selected city's prices into table rows (port of the old build script)
const HIDE = new Set(["", "No", "Not Tested", "Not Available", "0", "None"]);
const FLAG_ONLY = new Set(["Keyless Start/ Button Start"]); // source says "1" for yes
const SKIP = new Set(["Alloy Wheels", "Max Engine Torque", "Seating Capacity", "Drivetrain", "Turbocharger / Supercharger"]);

function buildRows() {
  const out = [];
  for (const car of saved) {
    const prices = (car.prices || {})[city.slug] || {};
    for (const v of car.variants) {
      const s = v.specs || {}, features = {};
      for (const [k, x] of Object.entries(v.features || {})) {
        if (!SKIP.has(k) && !FACET_FIELDS.has(k) && !HIDE.has(x)) features[k] = x === "Yes" || FLAG_ONLY.has(k) ? "Yes" : x;
      }
      const p = prices[v.id];
      out.push({ key: `${car.id}:${v.id}`, car: car.overview.name, variant: v.variant,
        on_road: p ? p[0] : null, ex_showroom: p ? p[1] : null,
        fuel: s["Fuel Type"], gearbox: s["Transmission Type"], power: s["Max Engine Power"],
        brochure: car.overview.brochure || null, features, facets: facetValues(v.features) });
    }
  }
  return out;
}

function buildCars() {
  return saved.map((c) => {
    const l = c.overview.launched || "";
    const year = /^\d\d\/\d\d\/\d{4}/.test(l) ? l.slice(6, 10) : /^\d{4}/.test(l) ? l.slice(0, 4) : null;
    return { id: c.id, name: c.overview.name, image: c.overview.image, year };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function rebuild() { rows = buildRows(); cars = buildCars(); }

async function api(path) {
  const r = await fetch(path);
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(d.error || `HTTP ${r.status}`), { status: r.status });
  return d;
}

// Fetch prices for the cars that don't have them for this city yet; returns names with no price page.
async function ensureCityPrices(slug) {
  const missing = [];
  await Promise.all(saved.map(async (car) => {
    car.prices = car.prices || {};
    if (car.prices[slug]) return;
    if ((car.noPrice || []).includes(slug)) return missing.push(car.overview.name);
    try {
      car.prices[slug] = (await api(`/api/prices?brand=${car.brand}&model=${car.model}&city=${slug}`)).variants;
    } catch (e) {
      if (e.status !== 404) throw e;
      car.noPrice = [...(car.noPrice || []), slug];
      missing.push(car.overview.name);
    }
    await DB.put(car);
  }));
  return missing;
}

// ---- location: pick a state, then a city; prices are fetched per city
async function initLocation() {
  try {
    cityList = await api("/api/cities");
  } catch (e) { $("loc-status").textContent = "Could not load cities: " + e.message; return; }
  const states = uniq(cityList.map((c) => c.state));
  const home = cityList.find((c) => c.slug === city.slug);
  $("f-state").innerHTML = states.map((s) => `<option>${esc(s)}</option>`).join("");
  $("f-state").value = home ? home.state : states[0];
  fillCities(city.slug);
  $("f-state").onchange = () => fillCities(null);
  $("f-city").onchange = () => { if ($("f-city").value) setCity($("f-city").value); };
  if (home && home.slug !== "bangalore") setCity(home.slug); else $("loc-status").textContent = `Showing ${city.name} prices`;
}

function fillCities(selected) {
  const inState = cityList.filter((c) => c.state === $("f-state").value);
  inState.sort((a, b) => b.popular - a.popular || a.name.localeCompare(b.name));
  $("f-city").innerHTML = (selected ? "" : `<option value="">Select a city…</option>`) +
    inState.map((c) => `<option value="${esc(c.slug)}">${esc(c.name)}</option>`).join("");
  if (selected) $("f-city").value = selected;
}

async function setCity(slug) {
  const c = cityList.find((x) => x.slug === slug);
  const status = $("loc-status");
  status.textContent = `Fetching ${c.name} prices…`;
  $("f-state").disabled = $("f-city").disabled = true;
  try {
    const missing = await ensureCityPrices(slug);
    city = { slug: c.slug, name: c.name };
    prefs.save();
    rebuild(); refresh();
    status.textContent = `Showing ${c.name}, ${c.state} prices` + (missing.length ? `. No price listed for: ${missing.join(", ")}` : "");
  } catch (e) {
    status.textContent = `Could not load ${c.name} prices: ${e.message}`;
  } finally {
    $("f-state").disabled = $("f-city").disabled = false;
  }
}

function init() {
  const prices = rows.map((r) => r.on_road).filter(Boolean);
  const range = $("f-price");
  range.min = prices.length ? Math.floor(Math.min(...prices) / 1e5) * 1e5 : 0;
  range.max = prices.length ? Math.ceil(Math.max(...prices) / 1e5) * 1e5 : 5e6;
  range.step = 25000;
  range.oninput = () => { state.maxPrice = +range.value; render(); };
  checkboxes($("f-car"), uniq(rows.map((r) => r.car)), state.cars);
  checkboxes($("f-gearbox"), uniq(rows.map((r) => gearGroup(r.gearbox))), state.gearbox);
  checkboxes($("f-fuel"), uniq(rows.map((r) => r.fuel)), state.fuel);
  const counts = {};
  rows.forEach((r) => Object.keys(r.features).forEach((k) => (counts[k] = (counts[k] || 0) + 1)));
  checkboxes($("f-feature"), Object.keys(counts).sort(), state.features);
  renderFacets($("f-facets"), rows.map((r) => r.facets), state.facets, render);
  $("reset").onclick = () => {
    [state.cars, state.gearbox, state.fuel, state.features, state.hidden, ...state.facets.values()].forEach((s) => s.clear());
    document.querySelectorAll("#filters input[type=checkbox]").forEach((c) => (c.checked = false));
    range.value = range.max; state.maxPrice = +range.max; prefs.save(); render();
  };
  range.value = range.max;
  state.maxPrice = +range.max;
  render();
}

// Rebuild filters after the dataset grows, keeping current selections.
function refresh() {
  const sel = { cars: [...state.cars], gearbox: [...state.gearbox], fuel: [...state.fuel], features: [...state.features] };
  const wasMax = +$("f-price").value === +$("f-price").max;
  init();
  for (const [name, id] of [["cars", "f-car"], ["gearbox", "f-gearbox"], ["fuel", "f-fuel"], ["features", "f-feature"]]) {
    sel[name].forEach((v) => {
      const box = [...document.querySelectorAll(`#${id} input`)].find((i) => i.value === v);
      if (box) { box.checked = true; state[name].add(v); }
    });
  }
  render();
}

// ---- add a car
const dlg = $("add-dialog"), results = $("results");
let timer, seq = 0;
$("add-car").onclick = () => { dlg.showModal(); $("q").focus(); };
$("q").oninput = () => {
  clearTimeout(timer);
  timer = setTimeout(search, 350);
};
async function search() {
  const q = $("q").value.trim(), mine = ++seq;
  if (q.length < 2) { results.textContent = "Type at least 2 characters."; return; }
  results.textContent = "Searching…";
  try {
    const d = await api("/api/search?q=" + encodeURIComponent(q));
    if (mine !== seq) return;
    d.forEach((m) => (m.saved = saved.some((c) => c.id === `${m.brand_slug}-${m.slug}`)));
    results.innerHTML = d.length ? d.map((m, i) => `<div class="res"><span>${esc(m.brand)} ${esc(m.model)}<small>${esc(m.price)}</small></span>
      <button data-i="${i}" ${m.saved ? "disabled" : ""}>${m.saved ? "Added" : "Add"}</button></div>`).join("") : "No cars found.";
    results.querySelectorAll("button:not(:disabled)").forEach((b) => (b.onclick = () => add(d[b.dataset.i], b)));
  } catch (e) { results.textContent = "Search failed: " + e.message; }
}
async function add(m, btn) {
  btn.disabled = true; btn.textContent = "Fetching…";
  try {
    const car = await api(`/api/car?brand=${m.brand_slug}&model=${m.slug}`);
    saved = saved.filter((c) => c.id !== car.id).concat(car);
    await DB.put(car);
    if (city.slug !== "bangalore") await ensureCityPrices(city.slug).catch(() => {});
    rebuild(); refresh();
    btn.textContent = "Added";
  } catch (e) { btn.disabled = false; btn.textContent = "Retry"; results.insertAdjacentText("afterbegin", "Failed: " + e.message + " "); }
}

function renderCars() {
  $("cars").innerHTML = cars.map((c) => {
    const hid = state.hidden.has(c.name);
    return `<div class="car${state.cars.has(c.name) ? " on" : ""}${hid ? " hidden" : ""}" data-name="${esc(c.name)}">
    <a class="car-link" href="car.html?id=${encodeURIComponent(c.id)}" target="_blank" rel="noopener" title="Open ${esc(c.name)} details in a new tab">
      ${c.image ? `<img src="${esc(c.image)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : `<span class="noimg"></span>`}
      <span class="car-name">${esc(c.name)}</span>${c.year ? `<span class="car-year">${esc(c.year)}</span>` : ""}
    </a>
    <button type="button" class="car-x">${hid ? "Show" : "Hide"}</button></div>`;
  }).join("");
  $("cars").querySelectorAll(".car-x").forEach((x) => (x.onclick = () => {
    const n = x.parentElement.dataset.name;
    state.hidden.has(n) ? state.hidden.delete(n) : state.hidden.add(n);
    prefs.save();
    render();
  }));
}

function render() {
  renderCars();
  $("price-label").textContent = lakh(state.maxPrice);
  const match = (set, v) => !set.size || set.has(v);
  const shown = rows.filter((r) =>
    match(state.cars, r.car) && !state.hidden.has(r.car) && match(state.gearbox, gearGroup(r.gearbox)) && match(state.fuel, r.fuel) &&
    (!r.on_road || r.on_road <= state.maxPrice) &&
    [...state.features].every((f) => r.features[f]) && passesFacets(r.facets, state.facets));
  const { key, dir } = state.sort;
  const val = (r) => (key in r ? r[key] : key.startsWith("facet:") ? r.facets[key.slice(6)] : r.features[key]) ?? (key === "on_road" || key === "ex_showroom" ? Infinity : "");
  shown.sort((a, b) => {
    const x = val(a), y = val(b);
    return (typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y))) * dir;
  });
  const facetCols = FACETS.filter((f) => (state.facets.get(f.id) || new Set()).size).map((f) => ({ key: "facet:" + f.id, label: f.label, facet: f.id }));
  const cols = [...CORE, ...facetCols, ...[...state.features].sort().map((f) => ({ key: f, label: f, feat: true }))];
  $("count").textContent = `${shown.length} of ${rows.length} variants`;
  $("table").innerHTML =
    `<thead><tr>${cols.map((c) => `<th data-k="${c.key}">${esc(c.label)}${key === c.key ? (dir > 0 ? " ▲" : " ▼") : ""}</th>`).join("")}</tr></thead>` +
    `<tbody>${shown.map((r) => `<tr>${cols.map((c) => cell(r, c)).join("")}</tr>`).join("")}</tbody>`;
  $("table").querySelectorAll("th").forEach((th) => (th.onclick = () => {
    state.sort = { key: th.dataset.k, dir: state.sort.key === th.dataset.k ? -state.sort.dir : 1 };
    render();
  }));
}

function cell(r, c) {
  if (c.facet) return `<td>${esc(r.facets[c.facet])}</td>`;
  if (c.feat) {
    const v = r.features[c.key];
    return `<td class="${v === "Yes" ? "yes" : ""}">${v === "Yes" ? "✓" : esc(v)}</td>`;
  }
  const v = r[c.key];
  if (c.key === "brochure") return `<td>${v ? `<a href="${esc(v)}" target="_blank" rel="noopener noreferrer">PDF</a>` : ""}</td>`;
  return c.num ? `<td class="num">${lakh(v)}</td>` : `<td>${esc(v)}</td>`;
}



// ---- export / import / clear: the user's data only ever lives in this browser
$("export").onclick = () => {
  const blob = new Blob([JSON.stringify({ version: 1, cars: saved, prefs: prefs.get() })], { type: "application/json" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "car-comparison-data.json" });
  a.click(); URL.revokeObjectURL(a.href);
};
$("import").onclick = () => $("import-file").click();
$("import-file").onchange = async (e) => {
  try {
    const d = JSON.parse(await e.target.files[0].text());
    if (!Array.isArray(d.cars) || !d.cars.every((c) => c.id && c.overview && Array.isArray(c.variants))) throw new Error("not a data file from this app");
    await DB.clear(); await DB.putAll(d.cars);
    localStorage.setItem("cwx-seeded", "1");
    localStorage.setItem("cwx-prefs", JSON.stringify(d.prefs || {}));
    location.reload();
  } catch (err) { alert("Import failed: " + err.message); }
};
$("clear").onclick = async () => {
  if (!confirm("Delete all cars and settings saved in this browser? The starter cars will come back.")) return;
  await DB.clear(); localStorage.removeItem("cwx-seeded"); localStorage.removeItem("cwx-prefs");
  location.reload();
};

async function boot() {
  try {
    saved = await DB.all();
    if (!saved.length && !localStorage.getItem("cwx-seeded")) {
      saved = await (await fetch("seed.json")).json();
      await DB.putAll(saved);
      localStorage.setItem("cwx-seeded", "1");
    }
  } catch (e) { $("count").textContent = "Could not open browser storage: " + e.message; return; }
  try {
    const seedCars = await (await fetch("seed.json")).json();
    for (const c of saved) if (addBrochureFacts(c, seedCars)) await DB.put(c);
  } catch (e) { /* offline or no seed: the brochure filters just show "Not listed" */ }
  const p = prefs.get();
  (p.hidden || []).forEach((n) => state.hidden.add(n));
  if (p.city) city = { slug: p.city, name: p.city };
  rebuild(); init(); initLocation();
}
boot();
