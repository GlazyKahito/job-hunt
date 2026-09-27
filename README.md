# Job hunt: internship applications and website outreach

Private workspace for Krutik Mhatre's internship search and freelance website outreach.
**Nothing here sends email.** Everything is a draft that you read, edit, and send yourself.

## What's here
| Path | What it is |
| --- | --- |
| `candidate.md` | The only facts any email may use. Update it when your resume changes. |
| `drafts/applications/` | One file per internship application: To, Subject, body. |
| `drafts/outreach/` | One file per cold email offering to build a website. |
| `tracking/applications.csv` | Every application: sent, response, rejection reason, lesson, next step. |
| `tracking/outreach.csv` | Every cold email: the business's observed need, sent, response. |
| `TRACKING.md` | How to fill in the tracker and learn from rejections. |
| `daily-instructions.md` | Rules for the automatic routine: limits, honesty, anti-spam, format. |
| `run-daily.ps1` | Runs the routine once on this laptop. |
| `reports/` | What each routine run found. |

## Sending safely
- Send from your own Gmail, about 10 applications and 10 cold emails a day at most, spread out.
- Only to addresses the company published. Every email is personalized; don't mass-send.
- Cold emails end with an opt-out line. If someone says no, mark `no-thanks` and never email again.

## The automatic routine
It searches for new postings and writes up to 5 email drafts and 10 platform leads a day
(max 2 drafts and 4 leads per run), logging everything in `tracking/applications.csv`.

Run it once by hand:
```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\OneDrive\Desktop\internship-drafts\run-daily.ps1"
```
To run it every 3 hours in the cloud, even with the laptop off, create a scheduled cloud agent
with `/schedule` in Claude Code, pointing at this repository and `daily-instructions.md`.
