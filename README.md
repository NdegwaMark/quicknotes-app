# QuickNotes

QuickNotes is a simple, fast note-taking web app built with plain HTML, CSS and JavaScript. It lets you capture short notes, organise them into categories (Personal, Work, Study), search through them instantly, and keeps them safe in the browser using localStorage — all without a server or database.

## Features

- Add notes with a text input and a category dropdown (Personal, Work, Study)
- Each note card shows the text, a small category label, the date and time, and a Delete button
- Live search that filters notes as you type (case-insensitive)
- Validation: empty notes (or notes over 200 characters) are rejected with a clear error message
- Note counter that correctly shows zero, one or many notes
- Notes persist in localStorage, so they survive a page refresh
- "Clear all" button with a confirmation dialog (bonus feature)
- Responsive design: a media query stacks the form controls on screens of 600px or narrower

## How to Run Locally

1. Clone the repository or download the ZIP and extract it.
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser (or use File > Open in your browser).
4. No build step, server or installation is required.

## What I Learned

- How to build a complete interactive app with vanilla JavaScript using an array of objects as the data model, and re-rendering the page from that array.
- How to use `createElement` and `textContent` to build the DOM safely, instead of `innerHTML`, so user text can never inject markup.
- How to persist data between page loads with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to lay out a form with Flexbox and make a layout responsive with a `@media (max-width: 600px)` query.
# quicknotes-app