# Thesis Timeline Planner

A one-page planner for graduate students in the Sensorimotor Exploration Laboratory (SMEL), School of Kinesiology and Health Studies, Queen's University.

Students choose M.Sc. or Ph.D. and where to start the countdown:

- **Before my proposal.** A roadmap from the first term to the defence: coursework, directed research project, comprehensive exam (Ph.D.), the proposal countdown, and the thesis deadlines.
- **After my proposal.** The thesis deadlines, counted back from the planned defence date.

## Program roadmap

| | M.Sc. (2 years, 6 terms) | Ph.D. (4 years, 12 terms) |
|---|---|---|
| Coursework | Year 1 | Year 1 |
| Directed research project | Year 1 | Years 1 and 2 |
| Comprehensive exam | | Starts term 3, finished within 18 months |
| Thesis proposal | Fall or Winter of Year 2 | Fall of Year 3 |

## Proposal countdown (both degrees)

Counted back from the proposal meeting: pilot data collection (1 semester, about 4 months) with pilot analysis alongside it, pilot data summary and synthesis (1 month), proposal writing and revisions (1 to 2 months, the planner allows 2), proposal to committee (2 months before the meeting).

## Thesis deadlines

| Degree | Data collection complete | First full draft to supervisor | Thesis to committee |
|---|---|---|---|
| M.Sc. | At least 2 months before the first draft | At least 2 months before the thesis goes to the committee | At least 1 month before the defence |
| Ph.D. | At least 2 months before the first draft | At least 3 months before the thesis goes to the committee | At least 8 weeks before the defence |

A deadline that lands on a weekend moves to the Friday before. Students who have already finished data collection can tick a box so that milestone shows as finished and does not trigger a warning.

Analysis and writing run alongside thesis data collection, and pilot analysis runs alongside pilot data collection. The roadmap shows these as overlapping bars. The 2 months after the last thesis data are for data summary, synthesis and formatting. The month after the last pilot data is for pilot data summary and synthesis.

## Features

- Calendar export (.ics) with a one-week reminder before each deadline
- Print or save as PDF
- Shareable link, for example `?degree=phd&mode=pre&start=fall-2026` or `?degree=msc&mode=post&defence=2027-06-15`
- Warning and earliest workable defence date when a deadline has already passed

## Guidebooks and forms

The bottom of the page links to the SGSPA supervision guidebooks (Setting Expectations, Productive Supervisory Relationships, the Graduate Supervision Handbook and Policy), the SKHS M.Sc. and Ph.D. completion steps, the oral exam forms, the Standards for Graduate Theses, the Permission of Co-Authors Form, convocation deadlines, and writing and support resources. The links live in the `resources` section of `index.html`.

## Changing the rules

Thesis deadlines live in the `PROGRAMS` block near the top of the script in `index.html`. The proposal countdown lives in `PROPOSAL_STEPS` and the program roadmap in `ROADMAPS`. Each milestone is set a fixed time before a later one:

```js
{
  id: "committee",
  title: "Thesis to examining committee",
  before: "defence",
  offset: { weeks: 8 },
  rule: "At least 8 weeks before the defence.",
  next: "Committee reading period"
}
```

Offsets accept `months`, `weeks` or `days`. Add a new milestone by giving it an `id` and pointing `before` at the milestone it precedes.

The page is plain HTML with no build step. GitHub Pages serves it from the `main` branch.
