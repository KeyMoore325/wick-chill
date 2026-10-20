<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep landing-page sections in the index route and use the shared design system for presentation; this keeps the single-page experience consistent.
- Use accessible dialogs for kit previews and supplementary footer information until real business destinations are provided; never imply an operational checkout.
- Keep the ritual article in a dedicated presentation component inside the existing dialog flow, with a scrollable reading area and a return to the unchanged quiz result; this preserves answers and keeps controls reachable on short screens.
- Mount SiteShell around the root Outlet for shared navigation, footer, and dialog state; pages use its action context so quiz answers survive page navigation.
- Keep scroll reveals in the shared shell's browser-only hook and button motion in global styles; animate off-screen sections once per page visit, preserve visible content without JavaScript, and respect reduced motion.
- Keep the kit collection and founder story in dedicated /wick-it and /about-us routes with their own metadata; identify unconfirmed products and biography as provisional content.
- Keep page-specific search metadata and self-referencing canonical URLs on leaf routes; every route must declare its sitemap eligibility so the router-derived sitemap tracks public pages automatically.
- Keep mobile touch targets and viewport-bounded menus/dialogs in the shared presentation system, with independently scrolling dialog content and non-shrinking actions; all pages inherit reachable controls on narrow and short screens.
