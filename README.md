# Thesis Timeline Planner

A one-page planner for graduate students in the Machine Intelligence and Human-Robot Interaction Laboratory (MItHRIL), in Smith Engineering's Electrical and Computer Engineering Department at Queen's University.

Original idea by [Jeffrey Wammes](https://www.queensu.ca/psychology/node/130) of the [LAMP Lab](https://www.thelamplab.ca/).

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
| Proposal milestone | Informal preliminary-proposal check-in with the supervisor after the first two semesters; no committee submission | Final term of Year 2 (Part II comprehensive exam) |

The manuscript-style thesis is built from publications. MItHRIL expects a paper or journal publication each year, with a main push every summer. Each annual cycle progresses from robot algorithm or hardware development, to experiment planning, data collection and analysis, and writing for publication. The roadmap illustrates each phase as three months, but actual timing and overlap vary by project; these are planning goals, not fixed deadlines.

The optional course planner offers MItHRIL's fall ELEC 844 and 870 and winter ELEC 842, 845 and 848, or a free-text alternative for each slot. Selected courses appear in their respective first-year terms on the roadmap. Check the [ECE graduate course page](https://smithengineering.queensu.ca/ece/graduate/courses.html) for descriptions, current offerings and registration details; confirm course choices and degree requirements with your supervisor.

An optional internship of 3–12 months pauses the thesis plan and adds its actual calendar duration to it. Its displayed end date is exclusive. Events on or after the internship starts are delayed by that duration, while earlier events remain unchanged; chart activities are interrupted and resume after the internship. Enter proposal and defence dates as they were planned **before** the internship; the displayed dates, milestones and calendar export include the pause. The before-proposal view requires a program start to apply it and checks the start against the program and pre-internship defence. The after-proposal view checks against the pre-internship defence but cannot check the program start.

The adjusted dates are planning dates, not approved extensions of university deadlines. Confirm exam deadlines, course availability, leave and extensions with the supervisor and department. Course bars and labels are illustrative, not actual rescheduled class offerings. Summer publication pushes follow the calendar and pause during the internship.

## Ph.D. proposal countdown

For Ph.D. students, the planner counts back from the proposal meeting: proposal writing and revisions (1 to 2 months, the planner allows 2), and proposal submission to the committee (2 months before the meeting). Research and publication cycles continue alongside proposal work. M.A.Sc. students have an informal preliminary-proposal checkpoint with their supervisor after the first two semesters; it is not submitted to a committee.

## Thesis deadlines

| Degree | First full draft to supervisor | Thesis to committee |
|---|---|---|
| M.A.Sc. | At least 2 months before the thesis goes to the committee | At least 1 month before the defence |
| Ph.D. | At least 3 months before the thesis goes to the committee | At least 8 weeks before the defence |

Baseline thesis deadlines that land on a weekend move to the Friday before; an internship then shifts affected planning dates by its actual duration, which may place them on a weekend. There is no single thesis-wide data collection deadline: data collection and analysis happen within each publication cycle.

## Features

- Calendar export (.ics) with a one-week reminder before each deadline
- Print or save as PDF
- Shareable link, including course and internship choices, for example `?degree=phd&mode=pre&start=fall-2026` or `?degree=msc&mode=post&defence=2027-06-15` (`msc` remains the link key for compatibility)
- Course choices, publication goals and internships are planning information, not calendar deadlines; calendar export includes thesis and proposal milestones
- Warning and earliest workable defence date when a deadline has already passed

## Guidebooks and forms

The bottom of the page links to ECE MASc and Ph.D. program requirements, current graduate student resources, and the Ph.D. comprehensive examination policy, as well as SGSPA supervision guidance, oral examination forms, thesis standards, convocation deadlines, and writing and support resources. The links live in the `resources` section of `index.html`.

## Changing the rules

Thesis deadlines live in the `PROGRAMS` block near the top of the script in `index.html`. The Ph.D. proposal countdown lives in `PROPOSAL_STEPS`; proposal timing and labels for each degree are in `ROADMAPS`. Each countdown milestone is set a fixed time before a later one:

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

Offsets accept `months`, `weeks` or `days`. Add a new milestone by giving it an `id` and pointing `before` at the milestone it precedes. The internship pause is applied to the resulting baseline dates.

The page is plain HTML with no build step. Run `node --test test/timeline.test.js` for the timeline regression tests. GitHub Pages serves it from the `main` branch.
