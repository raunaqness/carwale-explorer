const $ = (id) => document.getElementById(id);
const lakh = (n) => (n ? `₹${(n / 1e5).toFixed(2)} L` : "n/a");
const sel = { transmission: new Set(), fuel: new Set(), facets: new Map() };
const hidden = new Set(), collapsed = new Set(); // variant ids hidden entirely / shrunk to a narrow strip
let car, variants, cityName, cityPrices;

// Spec/feature rows shown for every variant; ones already shown as specs are not repeated as features.
const DUP = new Set(["Seating Capacity", "Drivetrain", "Max Engine Torque", "Turbocharger / Supercharger"]);

async function loadCar(id) {
  let c = (await DB.all()).find((x) => x.id === id);
  const seedCars = await (await fetch("seed.json")).json().catch(() => []);
  if (!c) c = seedCars.find((x) => x.id === id);
  else addBrochureFacts(c, seedCars); // older saved copies lack the brochure fields
  return c;
}

function cellHtml(v, c) {
  if (c.includes(" col")) return `<td class="${c}"></td>`; // collapsed column: keep the shade, hide the value
  if (v === undefined || v === "" || v === "0") return `<td class="no ${c}">–</td>`;
  if (v === "Yes") return `<td class="yes ${c}">✓</td>`;
  if (v === "No") return `<td class="no ${c}">No</td>`;
  return `<td class="${c}">${esc(v)}</td>`;
}

function checkboxes(el, values, set) {
  el.innerHTML = values.map((v) => `<label><input type="checkbox" value="${esc(v)}"> ${esc(v)}</label>`).join("");
  el.onchange = (e) => { e.target.checked ? set.add(e.target.value) : set.delete(e.target.value); render(); };
}

const matches = (v) =>
  (!sel.transmission.size || sel.transmission.has(v.specs["Transmission Type"])) &&
  (!sel.fuel.size || sel.fuel.has(v.specs["Fuel Type"])) &&
  passesFacets(v.facets, sel.facets);

function render() {
  const matching = variants.filter(matches);
  const shown = matching.filter((v) => !hidden.has(v.id));
  const nHidden = matching.length - shown.length;
  $("count").textContent = `${shown.length} of ${variants.length} variants` + (nHidden ? ` (${nHidden} hidden)` : "");

  // sidebar list: tick = visible
  $("f-variants").innerHTML = matching.map((v) =>
    `<label><input type="checkbox" value="${esc(v.id)}" ${hidden.has(v.id) ? "" : "checked"}> ${esc(v.variant)}</label>`).join("");

  if (!shown.length) { $("table").innerHTML = ""; $("msg").textContent = matching.length ? "All matching variants are hidden." : "No variants match these filters."; return; }
  $("msg").textContent = "";

  const keys = (get, skip = () => false) => {
    const seen = [];
    shown.forEach((v) => Object.keys(get(v)).forEach((k) => { if (!seen.includes(k) && !skip(k)) seen.push(k); }));
    return seen;
  };
  const specKeys = keys((v) => v.specs);
  const featKeys = keys((v) => v.features, (k) => specKeys.includes(k) || DUP.has(k));
  const cls = (i, v) => `c${i % 2}${collapsed.has(v.id) ? " col" : ""}`; // alternating shade + collapsed flag
  const section = (label) => `<tr class="sect"><th colspan="${shown.length + 1}">${esc(label)}</th></tr>`;
  const row = (label, get) => `<tr><th class="rowh">${esc(label)}</th>${shown.map((v, i) => cellHtml(get(v), cls(i, v))).join("")}</tr>`;
  const head = (v, i) => {
    const col = collapsed.has(v.id);
    return `<th class="vh ${cls(i, v)}"><div class="vh-tools">
      <button type="button" data-act="collapse" data-id="${esc(v.id)}" title="${col ? "Expand" : "Collapse"} this variant">${col ? "▸" : "◂"}</button>
      <button type="button" data-act="hide" data-id="${esc(v.id)}" title="Hide this variant">✕</button></div>
      <div class="vh-name">${esc(v.variant)}</div></th>`;
  };
  const price = (label, f) => `<tr><th class="rowh">${esc(label)} (${esc(cityName)})</th>${shown.map((v, i) =>
    `<td class="num ${cls(i, v)}">${collapsed.has(v.id) ? "" : lakh(f(v))}</td>`).join("")}</tr>`;

  // Header + both price rows live in <thead>, which is sticky, so they stay in view while the rest scrolls.
  $("table").innerHTML =
    `<thead><tr><th class="rowh corner">Variant</th>${shown.map(head).join("")}</tr>` +
    price("On-road", (v) => v.on) + price("Ex-showroom", (v) => v.ex).replace("<tr>", '<tr class="last">') + `</thead><tbody>` +
    section("Engine and transmission") + specKeys.map((k) => row(k, (v) => v.specs[k])).join("") +
    section("Features") + featKeys.map((k) => row(k, (v) => v.features[k])).join("") +
    `</tbody>`;
}

$("table").onclick = (e) => {
  const b = e.target.closest("button[data-act]");
  if (!b) return;
  const id = b.dataset.id;
  if (b.dataset.act === "hide") hidden.add(id);
  else collapsed.has(id) ? collapsed.delete(id) : collapsed.add(id);
  render();
};
$("f-variants").onchange = (e) => { e.target.checked ? hidden.delete(e.target.value) : hidden.add(e.target.value); render(); };
$("show-all").onclick = () => { hidden.clear(); collapsed.clear(); render(); };
$("hide-all").onclick = () => { variants.forEach((v) => { if (matches(v)) hidden.add(v.id); }); render(); };

async function boot() {
  const id = new URLSearchParams(location.search).get("id") || "";
  try { car = await loadCar(id); } catch (e) { $("msg").textContent = "Could not open browser storage: " + e.message; return; }
  if (!car) { $("title").textContent = "Car not found"; $("msg").innerHTML = 'This car isn\'t saved in this browser. <a href="./">Go back</a> and add it first.'; return; }

  const o = car.overview;
  document.title = `${o.name} · Cars Explorer`;
  $("title").textContent = o.name;
  const slug = readPrefs().city || "bangalore";
  cityPrices = (car.prices || {})[slug] || (car.prices || {}).bangalore || {};
  cityName = (car.prices || {})[slug] ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Bangalore";
  $("subtitle").textContent = o.price_range || "";
  const l = o.launched || "";
  const year = /^\d\d\/\d\d\/\d{4}/.test(l) ? l.slice(6, 10) : "";
  $("hero").innerHTML = `${o.image ? `<img src="${esc(o.image)}" alt="" referrerpolicy="no-referrer">` : ""}
    <div><h2>${esc(o.name)}${year ? ` <span class="muted">${esc(year)}</span>` : ""}</h2>
    <div class="muted">${[o.rating ? `★ ${esc(o.rating)}${o.review_count ? ` (${esc(o.review_count)} reviews)` : ""}` : "", esc(o.price_range || ""),
      o.brochure ? `<a href="${esc(o.brochure)}" target="_blank" rel="noopener noreferrer">Brochure (PDF)</a>` : ""].filter(Boolean).join(" · ")}</div></div>`;

  variants = car.variants.map((v) => ({ ...v, id: String(v.id), facets: facetValues(v.features), on: (cityPrices[v.id] || [])[0], ex: (cityPrices[v.id] || [])[1] }))
    .sort((a, b) => (a.on ?? Infinity) - (b.on ?? Infinity) || a.variant.localeCompare(b.variant));
  const uniq = (f) => [...new Set(variants.map(f).filter(Boolean))].sort();
  checkboxes($("f-transmission"), uniq((v) => v.specs["Transmission Type"]), sel.transmission);
  checkboxes($("f-fuel"), uniq((v) => v.specs["Fuel Type"]), sel.fuel);
  renderFacets($("f-facets"), variants.map((v) => v.facets), sel.facets, render);
  render();
}
boot();
