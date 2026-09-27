# How to track applications and learn from rejections

Two spreadsheets (open them in Excel, Google Sheets, or GitHub's CSV viewer):

- `tracking/applications.csv`: internship applications.
- `tracking/outreach.csv`: cold emails offering to build a website.

Each row's `id` matches its draft file in `drafts/applications/` or `drafts/outreach/`.

## After you send a draft
Set `status` to `sent` and fill `date_sent` (YYYY-MM-DD). Send from your own Gmail, a few at a
time: no more than about 10 applications and 10 cold emails a day, spread out. That pace is what
keeps you inside Gmail's rules and out of spam folders.

## When someone replies
Fill `response` with one of these, and `response_date`:

| response | meaning |
| --- | --- |
| `interview` | They want to talk. Move `next_step` to the date and what to prepare. |
| `task` | They sent an assignment. Put the deadline in `next_step`. |
| `offer` | You got it. |
| `rejected` | A clear no. Fill the three columns below. |
| `no-reply` | Nothing after 21 days. Don't follow up more than once. |
| `no-thanks` | (outreach) They said no. Never email them again. |
| `interested` | (outreach) They want a call or a mock-up. |

## When you get rejected, fill three columns
- `rejection_reason`: their words if they gave any, or your best honest guess
  (`needs-degree`, `wants-3rd-year+`, `stack-mismatch`, `role-filled`, `no-reason-given`, …).
- `lesson`: what it says about the application, not about you. Example: "They wanted Python
  backend; my email led with frontend."
- `next_step`: one concrete action. Example: "Add a FastAPI mini-project" or "Lead with CRM360
  for backend roles".

## Monthly review
Filter `response` = `rejected` and group by `rejection_reason`. If one reason keeps appearing,
fix that first: change `candidate.md`, build the missing project, or stop targeting that kind of
role. Ask Claude Code: "read tracking/applications.csv and tell me what the rejections have in
common and what to change."
