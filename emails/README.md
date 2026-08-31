# Emails

Source for the Loops emails, versioned here so copy changes are reviewable.

| File                | Where it goes                                          |
| ------------------- | ------------------------------------------------------ |
| `01-welcome.mjml`   | Loops → email → **Code** tab → Select → upload the file |
| `01-welcome.txt`    | Same copy for the **Plain** tab, and the plain-text part |

## Sending it

Trigger: **Contact added** → filter `userGroup` is `early-cohort` (set by
`api/_loops.ts`). Send immediately — a welcome email delayed past a few
minutes gets far worse engagement.

## Rules that keep these landing in the inbox

- **No images.** An image-heavy first email from a cold domain is the fastest
  route to Promotions. `01-welcome.mjml` renders zero `<img>` tags.
- **Keep `{unsubscribe_link}`.** Loops requires it, and Gmail/Yahoo bulk-sender
  rules require one-click unsubscribe.
- **Send from a person** (`krishna@veyns.com`), never `no-reply@`. The email
  asks for a reply; replies are one of the strongest positive signals a new
  sending domain can accumulate.
- **Authenticate the domain before the first send** — SPF, DKIM, and DMARC in
  Loops → Settings → Sending domain. Unauthenticated mail from a new domain
  goes to spam regardless of content.
- Rendered output is ~12 KB. Gmail clips at 102 KB.

## Personalization

We only collect an email address, so there is no name to merge. If you start
collecting one, Loops' fallback syntax is `{firstName | there}` — never use a
bare `{firstName}`, which renders "Hi ," for every contact that lacks it.
