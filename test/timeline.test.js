const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

function planner() {
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) elements.set(id, {
      value: "", checked: false, hidden: false, textContent: "", innerHTML: "",
      appendChild() {}, addEventListener() {}, querySelector() { return null; }
    });
    return elements.get(id);
  }
  const form = element("planner");
  form.querySelectorAll = () => [];
  form.querySelector = selector => {
    if (selector === 'input[name="degree"]:checked') return { value: "msc" };
    if (selector === 'input[name="mode"]:checked') return { value: "pre" };
    return null;
  };
  const document = { getElementById: element, createElement: () => ({}) };
  const window = {};
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  vm.runInNewContext(script, {
    document, window, URLSearchParams, Intl, Date,
    location: { search: "", pathname: "/" },
    history: { replaceState() {} }
  });
  return window.ThesisPlanner;
}

test("publication cycles do not impose a thesis-wide collection deadline", () => {
  const p = planner();
  for (const term of ["winter", "summer", "fall"]) {
    const msc = p.computeRoadmap("msc", 2027, term, null, null);
    assert.deepEqual(Array.from(msc.thesis, item => item.id), ["firstDraft", "committee", "defence"]);
    assert.deepEqual(Array.from(msc.pre, item => item.id), ["proposal"]);
    assert.equal(msc.pre[0].title, "Preliminary proposal checkpoint");
    assert.match(msc.pre[0].rule, /informally with your supervisor/);

    const phd = p.computeRoadmap("phd", 2027, term, null, null);
    assert.deepEqual(Array.from(phd.thesis, item => item.id), ["firstDraft", "committee", "defence"]);
    assert.deepEqual(Array.from(phd.pre, item => item.id), ["writingStart", "toCommittee", "proposal"]);
  }
});

test("the M.A.Sc. preliminary proposal checkpoint is due at the end of semester two", () => {
  const p = planner();
  const roadmap = p.computeRoadmap("msc", 2027, "fall", null, null);
  assert.equal(p.toISO(roadmap.proposal), "2028-04-30");
  assert.equal(roadmap.pre[0].date.getTime(), roadmap.proposal.getTime());
});

test("internship delays only events at or after its start, including exports", () => {
  const p = planner();
  const pause = { start: p.parseISO("2027-07-01"), end: p.parseISO("2027-10-01"), months: 3 };
  const baseline = p.computeRoadmap("phd", 2026, "fall", null, null);
  const roadmap = p.computeRoadmap("phd", 2026, "fall", null, null, pause);
  assert.equal(roadmap.pauseDays, 92);
  for (const group of ["program", "pre", "thesis"]) {
    for (const item of baseline[group]) {
      const shifted = roadmap[group].find(candidate => candidate.id === item.id);
      const expected = new Date(item.date);
      if (item.date >= pause.start) expected.setDate(expected.getDate() + 92);
      assert.equal(p.toISO(shifted.date), p.toISO(expected), item.id);
    }
  }
  const calendar = p.buildICS({ key: "phd", items: roadmap.thesis, defence: roadmap.defence });
  assert.ok(calendar.includes("DTSTART;VALUE=DATE:" + p.toISO(roadmap.defence).replace(/-/g, "")));
  assert.ok(!calendar.includes("Thesis data collection complete"));
});

test("internship spanning a thesis deadline pauses it without moving earlier deadlines", () => {
  const p = planner();
  const baseline = p.compute("msc", p.parseISO("2028-08-31"));
  const pause = { start: p.parseISO("2028-06-15"), end: p.parseISO("2028-08-15") };
  const shifted = p.pauseItems(baseline, pause);
  assert.equal(p.toISO(shifted[0].date), "2028-05-31");
  assert.equal(p.toISO(shifted[1].date), "2028-09-30");
  assert.equal(p.toISO(shifted[2].date), "2028-10-31");
});

test("a one-year pause shifts an event on its start date and rejects an out-of-program start", () => {
  const p = planner();
  const date = p.parseISO;
  const pause = { start: date("2027-05-28"), end: date("2028-05-28"), months: 12 };
  const baseline = p.computeRoadmap("msc", 2026, "fall", null, date("2027-08-31"));
  const roadmap = p.computeRoadmap("msc", 2026, "fall", null, date("2027-08-31"), pause);
  assert.equal(roadmap.pauseDays, 366);
  assert.equal(p.toISO(baseline.thesis[0].date), "2027-05-28");
  assert.equal(p.toISO(roadmap.thesis[0].date), "2028-05-28");
  assert.equal(p.toISO(roadmap.defence), "2028-08-31");
  const invalid = p.computeRoadmap("msc", 2026, "fall", null, null, {
    start: date("2026-08-31"), end: date("2026-11-30"), months: 3
  });
  assert.equal(invalid.pauseDays, 0);
  assert.equal(p.toISO(invalid.defence), p.toISO(p.computeRoadmap("msc", 2026, "fall", null, null).defence));
});
