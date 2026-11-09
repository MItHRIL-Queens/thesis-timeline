# Thesis Timeline Planner

A one-page planner for graduate students in the Sensorimotor Exploration Laboratory (SMEL), School of Kinesiology and Health Studies, Queen's University.

Students choose M.Sc. or Ph.D. and enter their planned defence date. The page counts back from that date and lists the deadline for each milestone.

## Rules

| Degree | Data collection complete | First full draft to supervisor | Thesis to committee |
|---|---|---|---|
| M.Sc. | At least 2 months before the first draft | At least 2 months before the thesis goes to the committee | At least 1 month before the defence |
| Ph.D. | At least 2 months before the first draft | At least 3 months before the thesis goes to the committee | At least 8 weeks before the defence |

A deadline that lands on a weekend moves to the Friday before. Students who have already finished data collection can tick a box so that milestone shows as finished and does not trigger a warning.

## Features

- Calendar export (.ics) with a one-week reminder before each deadline
- Print or save as PDF
- Shareable link, for example `?degree=phd&defence=2027-06-15`
- Warning and earliest workable defence date when a deadline has already passed

## Guidebooks and forms

The bottom of the page links to the SGSPA supervision guidebooks (Setting Expectations, Productive Supervisory Relationships, the Graduate Supervision Handbook and Policy), the SKHS M.Sc. and Ph.D. completion steps, the oral exam forms, the Standards for Graduate Theses, the Permission of Co-Authors Form, convocation deadlines, and writing and support resources. The links live in the `resources` section of `index.html`.

## Changing the rules

All rules live in the `PROGRAMS` block near the top of the script in `index.html`. Each milestone is set a fixed time before a later one:

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
