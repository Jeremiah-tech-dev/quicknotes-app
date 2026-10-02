const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all");

const STORAGE_KEY = "quicknotes-app-notes";

function loadNotes() {
  const savedNotes = localStorage.getItem(STORAGE_KEY);
  if (!savedNotes) return [];

  try {
    return JSON.parse(savedNotes);
  } catch {
    return [];
  }
}

let notes = loadNotes();

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function render() {
  list.replaceChildren();
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm),
  );

  visibleNotes.forEach((note) => {
    const card = document.createElement("li");
    card.classList.add("note", `category-${note.category}`);

    const content = document.createElement("div");
    content.classList.add("note-content");

    const text = document.createElement("span");
    text.classList.add("note-text");
    text.textContent = note.text;

    const category = document.createElement("span");
    category.classList.add("note-category");
    category.textContent = note.category[0].toUpperCase() + note.category.slice(1);

    const date = document.createElement("time");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    content.append(text, category, date);
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    card.append(content, deleteButton);
    list.append(card);
  });

  if (visibleNotes.length === 0 && searchTerm !== "") {
    const emptyMessage = document.createElement("li");
    emptyMessage.classList.add("empty-search");
    emptyMessage.textContent = "No notes match your search.";
    list.append(emptyMessage);
  }

  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const noteText = input.value.trim();
  if (noteText === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (noteText.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  const note = {
    id: Date.now(),
    text: noteText,
    category: categoryInput.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  saveNotes();
  render();
  input.value = "";
});

searchInput.addEventListener("input", render);

clearAllButton.addEventListener("click", () => {
  if (!confirm("Delete all notes?")) return;
  notes = [];
  saveNotes();
  render();
});

render();