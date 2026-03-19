# AGENTS.md

This file provides context and documentation for AI coding agents working on this Next.js project.

## Project Information

- **Framework**: Next.js 16.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Animation**: Motion 12.x
- **Package Manager**: pnpm

## Next.js 16.2.0 Features In Use

- **Turbopack**: Enabled for faster development.
- **Experimental Prefetch Inlining**: Enabled in `next.config.ts`.
- **Browser Log Forwarding**: Enabled by default (Next.js 16.2.0+).

## Architecture Notes

- Using App Router.
- Feature-based organization in `src/features`.
- Shared components and logic in `src/shared` and `src/lib`.

## Agent Instructions

- Follow the established design patterns in `src/features`.
- Use `lucide-react` for icons.
- Prefer Server Components where possible.
- Use `motion` for animations.
