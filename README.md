# QuickNotes

QuickNotes is a lightweight browser-based note-taking app for capturing, organizing, searching, and managing short notes by category. Notes are stored in your browser so they are still available after refreshing the page.

## Features

- Add notes in the Personal, Work, or Study category.
- Validate note text to require 1–200 characters.
- Delete one note or clear all notes after confirmation.
- Search note text as you type, without case sensitivity.
- View each note's category, creation date, and the total note count.
- Save notes in browser localStorage between visits.
- Use a responsive layout on narrow screens.

## Run locally

Open `index.html` in a browser, or serve this folder with a local web server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## What I learned

- How semantic HTML, labels, and accessible controls structure a small application.
- How to render user-provided text safely with DOM methods and `textContent`.
- How to validate, categorize, delete, and search objects in an array.
- How to persist application data with `localStorage`, `JSON.stringify`, and `JSON.parse`.