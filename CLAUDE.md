# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # eslint
```

No test suite is configured.

## Environment

Requires `.env.local` with:
- `MONGODB_URI` — MongoDB connection string (database name: `note-taking-web-app-v2`)
- `AUTH_SECRET` — NextAuth secret
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth credentials

## Architecture

### Data flow

The root layout (`app/layout.tsx`) is a server component that fetches the session and DB notes in parallel, then passes them to `NoteProvider`. Unauthenticated users see `data.json` as their note store; authenticated users see their MongoDB notes. This pre-fetch avoids a client-side loading state for the initial render.

### State management

Two React contexts wrap the entire app:

- **`NoteContext`** (`app/_context/NoteContext.tsx`) — owns the notes array and `userAuthenticated` flag. Uses `useReducer`. Exposes `dispatch` for optimistic mutations and `reloadNotes()` to re-fetch from the server after auth changes.
- **`NoteUIContext`** (`app/_context/NoteUIContext.tsx`) — owns transient UI state: active `noteId`, `noteMode` (all / archived / tag), `tag`, `showCreateNote`, `showSettings`. Has a `noteState()` helper that coordinates mode switches and navigation.
- **`SessionContext`** (`app/_context/SessionContext.tsx`) — thin client-side mirror of the session, used by components that can't call `auth()` directly.

### Routing

- `/` — redirects to `/app` if logged in, otherwise `/auth/login`
- `/app` — main app shell; uses Next.js parallel routes (`@sidebar`, `@noteList`, `@noteDetails`, `@noteSearch`, `@noteActions`) composed in `app/app/layout.tsx`
- `/app/archived`, `/app/search`, `/app/settings`, `/app/tags`, `/app/note` — sub-routes within the parallel-route shell
- `/auth/login`, `/auth/signup` — credential/Google auth flows

### Auth

NextAuth v5 (beta) in `lib/auth.ts`. Supports credentials + Google. On first Google sign-in, a `User` doc is created and `data.json` notes are imported as the user's initial notes. The JWT callback stamps `token.id` with the MongoDB `_id`; the session callback exposes it as `session.user.id`.

### Database

Mongoose + MongoDB. Models live in `lib/models/` (Note, User). Zod schemas in `lib/schemas/` define the shape used across client and server. Server actions in `app/_actions/note/` and `app/_actions/auth/` are the only place DB calls happen.

### Font / theme

Three Google fonts are loaded as CSS variables (`--font-inter`, `--font-noto-serif`, `--font-source-code-pro`). Font preference is persisted in `localStorage` and applied via a `data-font` attribute on `<html>` using an inline script in `<head>` to avoid FOUC. Color theme uses `next-themes` with the `class` strategy.
