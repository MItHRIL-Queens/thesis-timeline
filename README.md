# Thesis Timeline Planner

A one-page planner for graduate students in the Machine Intelligence and Human-Robot Interaction Laboratory (MItHRIL), in Smith Engineering's Electrical and Computer Engineering Department at Queen's University.

Original idea by Jeff at the LAMP lab.

Students choose M.A.Sc. or Ph.D. and where to start the countdown:

- **Before my proposal.** A roadmap from the first term to the defence: coursework, thesis research, the two-part Ph.D. comprehensive exam (Part II is the thesis proposal), the proposal countdown, and the thesis deadlines.
- **After my proposal.** The thesis deadlines, counted back from the planned defence date.

## Program roadmap

| | M.A.Sc. (2 years, 6 terms) | Ph.D. (4 years, 12 terms) |
|---|---|---|
| Coursework | Year 1, typically two courses in fall and two in winter | Year 1, typically two courses in fall and two in winter |
| Thesis research | Throughout the 2-year program | Throughout the 4-year program |
| Part I comprehensive exam | | Report within 10 months; exam within 2 months of report |
| Part II comprehensive exam (thesis proposal) | | Report within 22 months; exam within 2 months of report |
| Thesis proposal | Fall or Winter of Year 2 | Final term of Year 2 (Part II) |

MItHRIL expects a paper or journal publication each year, with a main push every summer. The roadmap marks the summer publication periods; these are planning goals, not fixed submission deadlines.

The optional course planner offers MItHRIL's fall ELEC 844 and 870 and winter ELEC 842, 845 and 848, or a free-text alternative for each slot. Selected courses appear in their respective first-year terms on the roadmap. Check the [ECE graduate course page](https://smithengineering.queensu.ca/ece/graduate/courses.html) for descriptions, current offerings and registration details; confirm course choices and degree requirements with your supervisor.

An optional internship can start on any date and last 3–12 months. Its displayed end date is exclusive. It appears on the dated roadmap when it overlaps the chart; the planner warns if it extends outside the program or beyond the defence, but does not automatically reschedule thesis deadlines. In the after-proposal view only the defence boundary can be checked.

## Proposal countdown (both degrees)

Counted back from the proposal meeting: pilot data collection (1 semester, about 4 months) with pilot analysis alongside it, pilot data summary and synthesis (1 month), proposal writing and revisions (1 to 2 months, the planner allows 2), proposal to committee (2 months before the meeting).

## Thesis deadlines

| Degree | Data collection complete | First full draft to supervisor | Thesis to committee |
|---|---|---|---|
| M.A.Sc. | At least 2 months before the first draft | At least 2 months before the thesis goes to the committee | At least 1 month before the defence |
| Ph.D. | At least 2 months before the first draft | At least 3 months before the thesis goes to the committee | At least 8 weeks before the defence |

A deadline that lands on a weekend moves to the Friday before. Students who have already finished data collection can tick a box so that milestone shows as finished and does not trigger a warning.

Analysis and writing run alongside thesis data collection, and pilot analysis runs alongside pilot data collection. The roadmap shows these as overlapping bars. The 2 months after the last thesis data are for data summary, synthesis and formatting. The month after the last pilot data is for pilot data summary and synthesis.

## Features

- Calendar export (.ics) with a one-week reminder before each deadline
- Print or save as PDF
- Shareable link, including course and internship choices, for example `?degree=phd&mode=pre&start=fall-2026` or `?degree=msc&mode=post&defence=2027-06-15` (`msc` remains the link key for compatibility)
- Course choices, publication goals and internships are planning information, not calendar deadlines; calendar export includes thesis and proposal milestones
- Warning and earliest workable defence date when a deadline has already passed

## Guidebooks and forms

The bottom of the page links to ECE MASc and Ph.D. program requirements, current graduate student resources, and the Ph.D. comprehensive examination policy, as well as SGSPA supervision guidance, oral examination forms, thesis standards, convocation deadlines, and writing and support resources. The links live in the `resources` section of `index.html`.

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
