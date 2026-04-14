# PostHog post-wizard report

The wizard has completed a deep integration of your project. Three new client-side events were added to complement the existing PostHog instrumentation. All events follow the existing `snake_case` naming convention. PostHog was already initialized via `PHProvider` in `app/components/common/Analytics.tsx` with session replay, web vitals, and exception capture — no changes were needed to the setup layer. Environment variables were updated in `.env.local`.

| Event | Description | File |
|---|---|---|
| `site_loaded` | Fires when the 3D scene finishes loading (progress = 100%) — top of the engagement funnel | `app/components/hero/index.tsx` |
| `work_timeline_completed` | Fires once per portal visit when the user scrolls to the end of the work & education timeline | `app/components/experience/work/index.tsx` |
| `project_mobile_selected` | Fires on mobile when a user taps a project tile to expand or collapse it in the carousel | `app/components/experience/projects/ProjectsCarousel.tsx` |

Pre-existing events already in the codebase (not duplicated):

| Event | File |
|---|---|
| `footer_link_clicked` | `app/components/footer/index.tsx` |
| `section_portal_entered` | `app/components/experience/GridTile.tsx` |
| `section_portal_exited` | `app/components/experience/GridTile.tsx` |
| `theme_changed` | `app/components/common/ThemeSwitcher.tsx` |
| `project_link_clicked` | `app/components/experience/projects/ProjectTile.tsx` |
| `project_viewed` | `app/components/experience/projects/ProjectTile.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/382209/dashboard/1468117
- **Insight — Site load completions over time**: https://us.posthog.com/project/382209/insights/A8YekhPt
- **Insight — Section exploration funnel** (site_loaded → section entered → section exited): https://us.posthog.com/project/382209/insights/XQRJlytJ
- **Insight — Project clicks by project**: https://us.posthog.com/project/382209/insights/nDqHwutd
- **Insight — Work timeline completion rate** (entered work → completed timeline): https://us.posthog.com/project/382209/insights/HJkUTVjH
- **Insight — Footer link clicks by destination**: https://us.posthog.com/project/382209/insights/Zb4gJqyq

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
