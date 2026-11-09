# Thesis Timeline Planner

A one-page planner for graduate students in the Sensorimotor Exploration Laboratory (SMEL), School of Kinesiology and Health Studies, Queen's University.

Students choose M.Sc. or Ph.D. and enter their planned defence date. The page counts back from that date and lists the deadline for each milestone. It also adds the SKHS and SGSPA completion steps and the supervision conversations from the Queen's guidebooks.

## Lab deadlines

| Degree | Data collection complete | First full draft to supervisor | Thesis to committee |
|---|---|---|---|
| M.Sc. | At least 2 months before the first draft | At least 2 months before the thesis goes to the committee | At least 1 month before the defence |
| Ph.D. | At least 2 months before the first draft | At least 3 months before the thesis goes to the committee | At least 8 weeks before the defence |

A deadline that lands on a weekend moves to the Friday before.

## SKHS and SGSPA steps

- M.Sc.: signed Oral Exam Form and thesis copy to SKHS at least 10 working days before the exam.
- Ph.D.: signed Oral Examination Form to SKHS, and the thesis to every examiner, at least 25 working days before the exam.
- Final thesis to QSpace by April 30 (Spring convocation) or September 30 (Fall convocation). The planner picks the next deadline after the defence.

Sources: [SKHS M.Sc. completion](https://skhs.queensu.ca/students/grad/msc-degree-completion-guidelines), [SKHS Ph.D. completion](https://skhs.queensu.ca/students/grad/phd-degree-completion), [SGSPA convocation](https://www.queensu.ca/grad-postdoc/grad-studies/convocation/overview).

## Features from the supervision guidebooks

Based on the SGSPA [supervision resources](https://www.queensu.ca/grad-postdoc/grad-studies/supervision/overview), including the Setting Expectations guidebook and the Productive Supervisory Relationships conversation guide.

- **Feedback turnaround.** Students enter the turnaround they agreed with their supervisor. The planner adds a feedback milestone and shows how much revision time is left before the committee deadline.
- **Planned time away.** Students add their own vacation and any supervisor leave, such as a sabbatical. The planner flags deadlines that fall inside those dates and counts supervisor working days lost during the review window.
- **Setting expectations checklist.** The guidebook's conversations about meetings, feedback, committee, authorship, data, ethics, time away, concerns and accommodations, plus a pre-defence checklist. Ticks and notes stay in the student's browser and print with the timeline.
- **Program Planning Guide view.** The timeline as a table in the guidebook's worksheet format: milestone, due date, notes and resources.

## Other features

- Calendar export (.ics) with a one-week reminder before each deadline
- Print or save as PDF
- Shareable link, for example `?degree=phd&defence=2027-06-15&fb=3&away=s20270301-20270315`
- Warning and earliest workable defence date when a deadline has already passed
- Checkbox for students who have already finished data collection

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

Offsets accept `months`, `weeks`, `days` or `workdays`. Add a new milestone by giving it an `id` and pointing `before` at the milestone it precedes. Convocation deadlines live in `CONVOCATIONS`, and document links live in `LINKS`.

The page is plain HTML with no build step. GitHub Pages serves it from the `main` branch.
