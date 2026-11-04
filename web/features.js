// Feature filters shared by the list page (app.js) and the car detail page (car.js).
//
// CarWale lists per-variant features as free text ("Parking Assist": "360 Degree Camera"). Each FACET turns one of
// those fields into a small set of named options so it can be filtered. Within a facet the ticked options are OR'ed;
// different facets are AND'ed. A variant CarWale gives no value for is "Not listed" (which is not the same as "No").
//
// CarWale's data has no speaker brand and no side-view cameras ("Front, Rear & Side" there means parking sensors). Those two
// facets come from the car's brochure instead, for the starter cars only (see data/brochure-facts.json).

const NOT_LISTED = "Not listed";
const num = (s) => { const m = /\d+/.exec(s); return m ? +m[0] : 0; };

const FACETS = [
  { group: "Cameras and parking", id: "camera", label: "Camera", key: "Parking Assist",
    map: { "No": "No camera", "Reverse Camera with Guidance": "Rear camera", "360 Degree Camera": "360° camera" },
    order: ["No camera", "Rear camera", "360° camera"] },
  { group: "Cameras and parking", id: "sensors", label: "Parking sensors", key: "Parking Sensors",
    map: { "Rear": "Rear only", "Front & Rear": "Front and rear", "Front, Rear & Side": "Front, rear and side" },
    order: ["Rear only", "Front and rear", "Front, rear and side"] },
  { group: "Cameras and parking", id: "dashcam", label: "Dashcam", key: "Dashcam",
    map: { "No": "No dashcam", "Yes": "Dashcam", "Front & Rear View": "Front and rear dashcam" },
    order: ["No dashcam", "Dashcam", "Front and rear dashcam"] },
  // Brochure-sourced (data/brochure-facts.json): only present for cars whose brochure was read; others show "Not listed".
  { group: "Cameras and parking", id: "sidecam", label: "Side-view camera (brochure)", key: "Side-view camera (brochure)",
    order: ["None", "Blind spot view monitor", "LaneWatch camera"] },

  { group: "Audio and screen", id: "speakers", label: "Speakers", key: "Speakers",
    fmt: (x) => (/^\d+$/.test(x) ? `${x} speakers` : "No speakers"), sort: (a, b) => num(a) - num(b) },
  { group: "Audio and screen", id: "speakerbrand", label: "Speaker brand (brochure)", key: "Speaker system (brochure)",
    order: ["Bose", "No brand named"] },
  { group: "Audio and screen", id: "screen", label: "Infotainment screen", key: "Infotainment (Front)",
    map: { "No": "No screen", "Touch-screen Display": "Touchscreen", "Curved Dual-screen Display": "Curved dual screen" },
    order: ["No screen", "Touchscreen", "Curved dual screen"] },
  { group: "Audio and screen", id: "carplay", label: "Apple CarPlay / Android Auto", key: "Apple CarPlay",
    map: { "No": "None", "Wired": "Wired", "Wired to Wireless Adapter": "Wired, wireless adapter", "Wireless": "Wireless" },
    order: ["None", "Wired", "Wired, wireless adapter", "Wireless"] },

  { group: "Comfort", id: "sunroof", label: "Sunroof", key: "Sunroof Type",
    map: { "No": "No sunroof", "Electrically Adjustable Sunroof": "Electric sunroof", "Panoramic Sunroof": "Panoramic sunroof" },
    order: ["No sunroof", "Electric sunroof", "Panoramic sunroof"] },
  { group: "Comfort", id: "ac", label: "Air conditioning", key: "Air Conditioner Control",
    map: { "Manual": "Manual", "Automatic Climate Control": "Automatic climate", "Automatic Climate Control: Dual Zone": "Dual-zone climate" },
    order: ["Manual", "Automatic climate", "Dual-zone climate"] },
  { group: "Comfort", id: "ventilated", label: "Ventilated seats", key: "Ventilated Seats",
    map: { "No": "None", "Front Row": "Front row", "Front & Middle Rows": "Front and middle rows" },
    order: ["None", "Front row", "Front and middle rows"] },
  { group: "Comfort", id: "upholstery", label: "Seat upholstery", key: "Seat Upholstery",
    order: ["Fabric", "Leatherette", "Leather"] },
  { group: "Comfort", id: "seatadj", label: "Driver seat adjustment", key: "Seat: Forward / Back", order: ["Manual", "Electric"] },

  { group: "Safety and lights", id: "cruise", label: "Cruise control", key: "Cruise Control",
    map: { "No": "None", "Yes": "Cruise control", "Adaptive": "Adaptive", "Adaptive with Stop and Go": "Adaptive, stop and go" },
    order: ["None", "Cruise control", "Adaptive", "Adaptive, stop and go"] },
  { group: "Safety and lights", id: "headlights", label: "Headlights", key: "Headlights",
    order: ["Halogen", "Halogen Projector", "LED", "LED Projector"] },
];

// Source fields now covered by a facet (so lists of plain yes/no features can leave them out).
const FACET_FIELDS = new Set([...FACETS.map((f) => f.key), "Android Auto"]);

function facetLabel(f, features) {
  const raw = features[f.key];
  if (raw === undefined || raw === null || raw === "") return NOT_LISTED;
  return f.map && f.map[raw] ? f.map[raw] : f.fmt ? f.fmt(raw) : String(raw);
}

// {facetId: option label} for one variant's raw feature dict.
function facetValues(features) {
  const out = {};
  FACETS.forEach((f) => (out[f.id] = facetLabel(f, features || {})));
  return out;
}

// True when a variant's facet values satisfy every facet that has something ticked.
function passesFacets(values, selected) {
  for (const [id, set] of selected) if (set.size && !set.has(values[id])) return false;
  return true;
}

const openGroups = new Set(["Cameras and parking", "Audio and screen"]); // groups left expanded; remembered across redraws

// Draw the grouped option lists into `el` for the variants in `all` (an array of facetValues() results).
// `selected` is a Map(facetId -> Set(option)) that the checkboxes read from and write to; `onChange` runs after each tick.
function renderFacets(el, all, selected, onChange) {
  const groups = [...new Set(FACETS.map((f) => f.group))];
  el.innerHTML = groups.map((g) => {
    const body = FACETS.filter((f) => f.group === g).map((f) => {
      const counts = new Map();
      all.forEach((v) => counts.set(v[f.id], (counts.get(v[f.id]) || 0) + 1));
      const rank = (o) => (o === NOT_LISTED ? 1e9 : f.order && f.order.includes(o) ? f.order.indexOf(o) : 1e8);
      const options = [...counts.keys()].sort((a, b) => rank(a) - rank(b) || (f.sort ? f.sort(a, b) : a.localeCompare(b)));
      if (!selected.has(f.id)) selected.set(f.id, new Set());
      const set = selected.get(f.id);
      [...set].forEach((o) => { if (!counts.has(o)) set.delete(o); }); // an option that no longer exists can't stay ticked
      if (options.length < 2 || (options.length === 2 && options.includes(NOT_LISTED))) return ""; // nothing to choose between
      return `<div class="facet"><div class="facet-name">${esc(f.label)}</div>${options.map((o) =>
        `<label><input type="checkbox" data-facet="${f.id}" value="${esc(o)}"${set.has(o) ? " checked" : ""}> ${esc(o)} <span class="n">${counts.get(o)}</span></label>`).join("")}</div>`;
    }).join("");
    return body ? `<details class="fgroup" data-group="${esc(g)}"${openGroups.has(g) ? " open" : ""}><summary>${esc(g)}</summary>${body}</details>` : "";
  }).join("");
  el.querySelectorAll("details").forEach((d) => d.addEventListener("toggle", () =>
    d.open ? openGroups.add(d.dataset.group) : openGroups.delete(d.dataset.group))); // toggle doesn't bubble
  el.onchange = (e) => {
    const box = e.target;
    if (!box.dataset.facet) return;
    const set = selected.get(box.dataset.facet);
    box.checked ? set.add(box.value) : set.delete(box.value);
    onChange();
  };
}
