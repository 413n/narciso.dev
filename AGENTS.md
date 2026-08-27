# Coding Guidelines

These instructions apply to all work in this repository.

## Formatting & Linting
- Use Biome for formatting and linting.
- Indent style: tabs.
- Quote style: double quotes.
- Organize imports (Biome will do this).
- Do not hand-format; run Biome when changing code.

## TypeScript/JavaScript Conventions
- Prefer explicit types where inference is unclear.
- Avoid explicit return types unless the function is complex and the return type is not obvious; otherwise rely on inference.
- Prefer `satisfies` for object/variable type validation when it helps readability and preserves inference.
- Extract reusable logic into functions and keep feature-specific code grouped (e.g., payment utilities live in a payments-related module).
- Avoid regular expressions unless there is no simpler alternative.
- If a regular expression is required, extract it into a testable function and add unit tests.
- Prefer `undefined` over `null` unless an API or runtime explicitly requires `null`.
- For React component props, inline the props type when it is not reused or exported.
- Only extract a props type/interface when it is shared or exported.
- Avoid introducing one-off variables/objects solely to pass them along; only extract a variable when it improves clarity or is reused.
- Use blank lines to separate unrelated logic blocks (e.g., setup, guards, main flow).
- Avoid single-line `if` early returns; always use braces and multi-line blocks.
- Avoid `any`; use `unknown` with narrowing when needed.
- Favor small, composable modules over large files.

## Tailwind CSS
- Use Tailwind CSS utilities for styling.
- Prefer colors and styles from the Tailwind design system and or Shadcn tokens/variables.
- Only use custom colors (e.g., hex values) when explicitly requested or required by a specific design brief.
- Avoid using opacity on white for subtitles or muted text; use the `muted` variable instead.
- Avoid margins unless absolutely necessary.
- Prefer `flex` layouts with `gap` for spacing.
- Nest flex containers if different gaps are needed between element groups.
- Use the `cn` utility from `#/lib/utils` to merge class names; avoid template string concatenation.
- If class lists get long, use `cn` to split them across lines and group by concern (layout, spacing, color, effects).

## Icons (Lucide)
- Import Lucide icons with the `Icon` suffix (e.g., `PlusIcon`).
- Avoid `size`/`color` props on Lucide icons; use Tailwind classes (e.g., `className="size-4 text-muted-foreground"`).
- When an icon is inside a button, do not set size classes by default (button sizing handles it). Only override icon size when explicitly requested to make icons larger.

## Changes & Safety
- Keep changes minimal and focused on the task.
- Update or add tests when behavior changes.
- When creating reusable pure functions that will be reused, add unit tests with Vitest to cover them.
- Do not edit generated files or build artifacts.
- When moving files, use `git mv` instead of manual moves whenever possible.

## Dependencies
- Use `pnpm` catalogs defined in `pnpm-workspace.yaml` when adding deps.
- Avoid introducing new dependencies unless required.

<!-- intent-skills:start -->
# TanStack Intent - before editing files, run the matching guidance command.
tanstackIntent:
  - id: "@tanstack/devtools#devtools-app-setup"
    run: "pnpm dlx @tanstack/intent@latest load @tanstack/devtools#devtools-app-setup"
    for: "Install TanStack Devtools, pick framework adapter (React/Vue/Solid/Preact), register plugins via plugins prop, configure shell (position, hotkeys, theme, hideUntilHover, requireUrlFlag, eventBusConfig). TanStackDevtools component, defaultOpen, localStorage persistence."
  - id: "@tanstack/react-start#react-start"
    run: "pnpm dlx @tanstack/intent@latest load @tanstack/react-start#react-start"
    for: "React bindings for TanStack Start: createStart, StartClient, StartServer, React-specific imports, re-exports from @tanstack/react-router, full project setup with React, useServerFn hook."
  - id: "@tanstack/router-core#router-core"
    run: "pnpm dlx @tanstack/intent@latest load @tanstack/router-core#router-core"
    for: "Framework-agnostic core concepts for TanStack Router: route trees, createRouter, createRoute, createFileRoute, createRootRoute, Register type declaration, file naming conventions."
  - id: "@tanstack/router-core#router-core/navigation"
    run: "pnpm dlx @tanstack/intent@latest load @tanstack/router-core#router-core/navigation"
    for: "Link component, useNavigate, Navigate component, router.navigate, view transitions, preloading, scroll restoration."
  - id: "@tanstack/router-core#router-core/path-params"
    run: "pnpm dlx @tanstack/intent@latest load @tanstack/router-core#router-core/path-params"
    for: "Dynamic path segments ($paramName), splat routes, useParams, notFound()."
  - id: "@tanstack/start-client-core#start-core"
    run: "pnpm dlx @tanstack/intent@latest load @tanstack/start-client-core#start-core"
    for: "Core overview for TanStack Start: tanstackStart() Vite plugin, getRouter() factory, root route document shell (HeadContent, Scripts, Outlet), client/server entry points, routeTree.gen.ts."
<!-- intent-skills:end -->
