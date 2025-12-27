# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React-based notes application using Tiptap rich text editor, React Router v7, and Tailwind CSS v4 with DaisyUI. The app features a three-column layout (type navigation, article list, and content detail) with lazy-loaded pages.

## Development Commands

- **Start dev server**: `npm run dev` (runs on 0.0.0.0)
- **Build**: `npm run build` (TypeScript check + Vite build)
- **Lint**: `npm run lint` (ESLint with auto-fix)
- **Format**: `npm run format` (Prettier)
- **Preview**: `npm run preview`

## Architecture

### Routing Structure
- Uses React Router v7 with lazy-loaded route components
- Route definitions in `src/route/index.tsx`
- Lazy imports in `src/route/component.ts`
- Main layout: `src/layout/Notes.tsx` wraps child routes with `<Outlet />`

Routes:
- `/login` - Login page
- `/` - Notes layout with home page (index)
- `/detail/:id` - Article detail page
- `/setting` - Settings page

### Three-Column Layout
`NotesLayout` component structure:
1. **Left sidebar** (`SideNav`) - Type navigation (currently placeholder)
2. **Middle column** (`MiddleNav`) - Article list with outline previews
3. **Main content area** - Article detail view with rich text editor

### Content Management

#### Article Data
- Articles stored in `src/data/Article-Content.tsx` as static JSON
- Each article has: `id`, `title`, `type: "doc"`, `content: JSONContent[]`
- Content format: Tiptap JSON structure (from `@tiptap/react`)

#### Outline Generation
`src/data/index.tsx` contains:
- `getArticle(id)` - Fetch article by ID
- `parseOutlineFromTiptapJSON(doc)` - Parses article content to extract headings and paragraphs for outline preview
- `OutlineItem` type - Shape of outline items (heading/paragraph with level and text)

### Tiptap Editor

Located in `src/components/RichEditor/`:
- `Tiptap.tsx` - Main editor component using `@tiptap/react` with StarterKit
- `EditorCommands.tsx` - Editor toolbar (currently commented out in usage)

Key implementation details:
- Editor is initialized with empty content, then populated via `useEffect` using `editor.commands.setContent()`
- Auto-focuses at start of document after loading: `editor.chain().focus(0)`
- Uses Tailwind Typography classes for styling: `prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl`

### Outline Preview Component

`src/components/Outline/Outline.tsx`:
- Renders article preview cards in middle column
- Shows active state based on current route param (`params.id`)
- Truncates paragraph text to 50 chars
- Displays up to 5 outline items per article
- Visual indicator: red left border for active article

## Technology Stack

- **React 19.2.0** with React Compiler enabled (via babel-plugin-react-compiler)
- **React Router 7.11.0** - Latest version with hooks API
- **Tiptap 3.14.0** - ProseMirror-based rich text editor
- **Tailwind CSS 4.1.18** with Vite plugin
- **DaisyUI 5.5.14** - Component library
- **TypeScript 5.9.3** with strict mode enabled

## Important Notes

- Article content is Tiptap JSON format, not HTML
- The app uses lazy loading for all page components
- Active article highlighting uses route params comparison
- Scrollbar styling uses `scroll-bar` utility class (custom implementation)
- Dark mode classes referenced (`bg-dark`, `bg-light`) but implementation depends on Tailwind config
