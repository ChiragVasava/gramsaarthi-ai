<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Strict File & Directory Access Restrictions

## Forbidden Paths (.antigravityignore Enforcement)
- **CRITICAL RESTRICTION**: You MUST strictly respect the entries and patterns defined in `.antigravityignore` at all times.
- **Enforcement Rules**:
  - **NEVER** view, read, edit, delete, grep, list, or write to any files or directories matching entries in `.antigravityignore`.
  - **NEVER** run commands, scripts, or processes that target or operate within forbidden paths defined by `.antigravityignore`.
  - If a user prompt requests actions involving paths listed in `.antigravityignore`, immediately refuse or warn the user that the path is excluded by `.antigravityignore`.


