const $ = (id) => document.getElementById(id);
const lakh = (n) => (n ? `₹${(n / 1e5).toFixed(2)} L` : "n/a");
const sel = { transmission: new Set(), fuel: new Set() };
let car, variants, cityName, cityPrices;

// Spec/feature rows shown for every variant; ones already shown as specs are not repeated as features.
const DUP = new Set(["Seating Capacity", "Drivetrain", "Max Engine Torque", "Turbocharger / Supercharger"]);

async function loadCar(id) {
  let c = (await DB.all()).find((x) => x.id === id);
  if (!c) c = (await (await fetch("seed.json")).json()).find((x) => x.id === id);
  return c;
}

function cellHtml(v) {
  if (v === undefined || v === "" || v === "0") return `<td class="no">–</td>`;
  if (v === "Yes") return `<td class="yes">✓</td>`;
  if (v === "No") return `<td class="no">No</td>`;
  return `<td>${esc(v)}</td>`;
}

function checkboxes(el, values, set) {
  el.innerHTML = values.map((v) => `<label><input type="checkbox" value="${esc(v)}"> ${esc(v)}</label>`).join("");
  el.onchange = (e) => { e.target.checked ? set.add(e.target.value) : set.delete(e.target.value); render(); };
}

function render() {
  const shown = variants.filter((v) =>
    (!sel.transmission.size || sel.transmission.has(v.specs["Transmission Type"])) &&
    (!sel.fuel.size || sel.fuel.has(v.specs["Fuel Type"])));
  $("count").textContent = `${shown.length} of ${variants.length} variants`;
  if (!shown.length) { $("table").innerHTML = ""; $("msg").textContent = "No variants match these filters."; return; }
  $("msg").textContent = "";

  const keys = (get, skip = () => false) => {
    const seen = [];
    shown.forEach((v) => Object.keys(get(v)).forEach((k) => { if (!seen.includes(k) && !skip(k)) seen.push(k); }));
    return seen;
  };
  const specKeys = keys((v) => v.specs);
  const featKeys = keys((v) => v.features, (k) => specKeys.includes(k) || DUP.has(k));
  const section = (label) => `<tr class="sect"><th colspan="${shown.length + 1}">${esc(label)}</th></tr>`;
  const row = (label, get) => `<tr><th class="rowh">${esc(label)}</th>${shown.map((v) => cellHtml(get(v))).join("")}</tr>`;

  $("table").innerHTML =
    `<thead><tr><th class="rowh corner"></th>${shown.map((v) => `<th class="vh">${esc(v.variant)}</th>`).join("")}</tr></thead><tbody>` +
    section("Price") +
    `<tr><th class="rowh">On-road (${esc(cityName)})</th>${shown.map((v) => `<td class="num">${lakh(v.on)}</td>`).join("")}</tr>` +
    `<tr><th class="rowh">Ex-showroom (${esc(cityName)})</th>${shown.map((v) => `<td class="num">${lakh(v.ex)}</td>`).join("")}</tr>` +
    section("Engine and transmission") + specKeys.map((k) => row(k, (v) => v.specs[k])).join("") +
    section("Features") + featKeys.map((k) => row(k, (v) => v.features[k])).join("") +
    `</tbody>`;
}

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

  variants = car.variants.map((v) => ({ ...v, on: (cityPrices[v.id] || [])[0], ex: (cityPrices[v.id] || [])[1] }))
    .sort((a, b) => (a.on ?? Infinity) - (b.on ?? Infinity) || a.variant.localeCompare(b.variant));
  const uniq = (f) => [...new Set(variants.map(f).filter(Boolean))].sort();
  checkboxes($("f-transmission"), uniq((v) => v.specs["Transmission Type"]), sel.transmission);
  checkboxes($("f-fuel"), uniq((v) => v.specs["Fuel Type"]), sel.fuel);
  render();
}
boot();
