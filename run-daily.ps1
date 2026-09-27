<#
  Daily internship-application routine for Krutik Mhatre.
  Finds real internship postings, writes tailored application drafts, and logs everything.
  It NEVER sends email: drafts go to Gmail Drafts (when the Gmail MCP works) or to drafts\ files.
  Scheduled by the Windows task "GLAZY Internship Drafts". Run by hand any time:
    powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\OneDrive\Desktop\internship-drafts\run-daily.ps1"
#>
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $root
$today = Get-Date -Format 'yyyy-MM-dd'
foreach ($d in 'logs', 'reports', 'drafts') { New-Item -ItemType Directory -Force (Join-Path $root $d) | Out-Null }
$log = Join-Path $root "logs\$today.log"

# Runs every 3 hours; daily limits are enforced by daily-instructions.md from applications.csv.
# Permission rules want //c/Users/... style paths.
$folder = '//' + $root.Substring(0, 1).ToLower() + ($root.Substring(2) -replace '\\', '/')
$allowed = @(
  'WebSearch', 'WebFetch', 'Glob', 'Grep',
  "Read($folder/**)", "Edit($folder/**)",
  'mcp__gmail__create_draft', 'mcp__gmail__list_drafts', 'mcp__gmail__get_draft'
) -join ','
$denied = @(
  'Bash', 'PowerShell',
  'mcp__gmail__trash_thread', 'mcp__gmail__trash_message', 'mcp__gmail__untrash_thread', 'mcp__gmail__untrash_message',
  'mcp__gmail__mark_thread_spam', 'mcp__gmail__mark_message_spam', 'mcp__gmail__unmark_thread_spam', 'mcp__gmail__unmark_message_spam',
  'mcp__gmail__label_thread', 'mcp__gmail__label_message', 'mcp__gmail__unlabel_thread', 'mcp__gmail__unlabel_message',
  'mcp__gmail__update_message_labels', 'mcp__gmail__apply_sensitive_thread_label', 'mcp__gmail__apply_sensitive_message_label',
  'mcp__gmail__create_label'
) -join ','

$prompt = "Today is $today, current time $(Get-Date -Format 'HH:mm'). " + (Get-Content (Join-Path $root 'daily-instructions.md') -Raw)
# Don't let the CLI kill long web research after 10 minutes.
$env:CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS = '0'
"[$(Get-Date -Format s)] starting run for $today" | Out-File $log -Append -Encoding utf8
$prompt | claude -p --allowedTools $allowed --disallowedTools $denied 2>&1 | Out-File $log -Append -Encoding utf8
"[$(Get-Date -Format s)] finished with exit code $LASTEXITCODE" | Out-File $log -Append -Encoding utf8
