📝 Todo List — React + Vite (RTL + Dark Mode)

A clean, responsive, offline-friendly Todo app built with React 18 and Vite.
It supports light/dark themes, RTL layout, colored categories, inline editing, and a self-contained datetime input (no extra buttons) that works with native pickers and provides smart shortcuts.

✨ Features

Add, inline-edit, complete/uncomplete, and delete tasks

Category tags with distinct colors (General/Work/University/Shopping)

Live counters (total & remaining) with toast feedback

Self-contained datetime input

Native picker; auto-closes on change (blur)

Click inside the input’s icon area opens the picker

Shortcuts: Double-click / Alt+N / Ctrl+Enter ⇒ set to “now”

Cross-browser fallback for browsers without datetime-local (separate Date + Time inputs)

Light/Dark theme toggle with persistence (localStorage)

RTL-friendly (Persian labels included)

Offline-friendly (todos saved in localStorage)

Accessible focus rings & keyboard navigation

🔧 Tech Stack

Frontend: React 18, Vite

Styling: Tailwind CSS

UX: react-hot-toast

State: Local component state + localStorage

Linting (optional): ESLint + react/prop-types

🚀 Getting Started
Prerequisites

Node.js 18+ and npm

Installation
npm i

Development
npm run dev

Production build
npm run build
npm run preview

🗂 Project Structure
src/
  components/
    DarkModeToggle.jsx
    TodoInput.jsx
    TodoList.jsx
  App.jsx
  main.jsx
  index.css
public/
  favicon.svg
  screenshot-light.png   # optional
  screenshot-dark.png    # optional

⚙️ Configuration

No environment variables required.

Theme preference is stored under localStorage["theme"].

Todos are stored under localStorage["todos"].

🧭 Usage

Add task: Type a title → (optional) set date/time → click Add

Edit inline: Click ✏️, change text, then Save

Complete: Toggle the checkbox; you’ll get a toast

Datetime input tricks:

Click inside the right icon area of the input ⇒ opens native picker

Double-click / Alt+N / Ctrl+Enter ⇒ set to “now”

Picker auto-closes after selection
