// Compare several variants (rows from buildRows() in app.js): what differs, what they all share.
// Pure logic, no DOM, so it can be tested on its own. A row needs: specs {}, raw {} (CarWale's raw features), on_road, ex_showroom.
//
// Each field lands in exactly one bucket, judged across all the variants picked:
//   diff     at least two variants have different values
//   common   every variant has the same real value (not "No")
//   neither  every variant has the same "No / None / Not tested" value
//   unknown  CarWale gives no value for some variants and the rest agree. "Not listed" is not "No", so it is never called a difference.
// Every item is {label, section, values: [one per variant, null = not listed]}.

const CMP_SKIP = new Set(["Alloy Wheels"]);   // CarWale fills this for only some variants, which would show up as false differences
const CMP_FLAG = new Set(["Keyless Start/ Button Start"]); // the source says "1" / "0" for yes / no
const CMP_NEGATIVE = new Set(["No", "None", "Not Tested", "Not Available"]);
const CMP_MAX = 4;

function cmpValue(key, raw) {
  if (raw === undefined || raw === null || raw === "") return null;
  if (CMP_FLAG.has(key)) return raw === "1" ? "Yes" : "No";
  return String(raw);
}

function compareRows(list) {
  const out = { diff: [], common: [], neither: [], unknown: [], price: null };
  const seen = new Set();
  const fields = [];
  // spec fields first (engine, gearbox...), then the features CarWale lists separately; a name in both is only counted once
  list.forEach((r) => Object.keys(r.specs || {}).forEach((k) => { if (!seen.has(k)) { seen.add(k); fields.push({ key: k, section: "Engine and gearbox", spec: true }); } }));
  list.forEach((r) => Object.keys(r.raw || {}).forEach((k) => { if (!seen.has(k)) { seen.add(k); fields.push({ key: k, section: "Features" }); } }));

  for (const f of fields) {
    if (CMP_SKIP.has(f.key)) continue;
    const values = list.map((r) => cmpValue(f.key, f.spec ? (r.specs || {})[f.key] ?? (r.raw || {})[f.key] : (r.raw || {})[f.key]));
    const known = values.filter((v) => v !== null);
    if (!known.length) continue;
    const item = { label: f.key, section: f.section, values };
    if (new Set(known).size > 1) out.diff.push(item);
    else if (known.length < values.length) out.unknown.push(item);
    else if (CMP_NEGATIVE.has(known[0])) out.neither.push(item);
    else out.common.push(item);
  }

  const base = list[0];
  const vsFirst = (key) => list.map((r) => (r[key] != null && base[key] != null ? r[key] - base[key] : null));
  out.price = {
    on: list.map((r) => r.on_road), ex: list.map((r) => r.ex_showroom),
    onVsFirst: vsFirst("on_road"), exVsFirst: vsFirst("ex_showroom"),
  };
  return out;
}

if (typeof module !== "undefined") module.exports = { compareRows, cmpValue, CMP_MAX };
