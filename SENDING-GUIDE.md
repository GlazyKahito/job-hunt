# Sending guide (for whoever sends the Gmail drafts)

Krutik has asked another Claude session to review and send these drafts from
kahitokrutik@gmail.com. Follow this guide exactly.

## What is in Gmail Drafts
- **65 cold emails** offering to build or fix a website for a Mumbai small business.
  Each names a specific problem found on that business's website or listing.
  They are tracked in `tracking/outreach.csv`, where status is `drafted-gmail` and the Gmail draft ID is in `notes`.
- **3 internship applications**, to Drivetrain, Supero and SkillsCapital. These are tracked in
  `tracking/applications.csv`, where status is `drafted-gmail`.
- **Not in Gmail:** the Kross Paaws cold email. Claude Code's safety check blocked creating it.
  The text is in `drafts/outreach/of-07-kross-paaws.md` if Krutik wants to send it.

## Krutik's rules
- **Paid work only, done fully online.** Every cold email already says this. For internships,
  confirm the stipend is paid and the role is remote before sending. If the posting says unpaid or on-site, don't send.
- **Pace: at most 25 emails every 3 hours** (Krutik's setting), spaced out within each window, never in one burst. Pause for the day if bounces or spam warnings appear.
- **Send each draft as written.** Don't send the same text to anyone else, add recipients, or
  combine drafts.
- **Before sending, re-open the business's website** and check the problem the email describes still exists. If it has been fixed, delete that draft instead.
- **August Cafe** (`contactus@augustcafe.in`): its domain is suspended, so the email may bounce.
- **Stop at "no thanks".** If anyone replies no, or asks not to be contacted, set `response` to
  `no-thanks` in `tracking/outreach.csv` and never email them again.
- **No follow-ups** unless Krutik asks for them.

## Before sending anything else
The unsent drafts still describe Krutik as a CURRENT Ediglobe intern. He completed it in September 2026. Do not send them until that line is rewritten to the past tense.

## After sending
For each email sent, update the tracker row: set `status` to `sent` and `date_sent` to YYYY-MM-DD. When
replies arrive, fill `response`, `response_date`, and for rejections `rejection_reason`,
`lesson` and `next_step`, as `TRACKING.md` explains.

## Internships that need a form, not an email
39 applications are cover notes for website forms (Internshala, LinkedIn, Unstop and others).
Open `send.html` locally to copy each note and open its posting. **12 are marked
`skip-not-online`** (on-site or hybrid in Mumbai), so skip those.
