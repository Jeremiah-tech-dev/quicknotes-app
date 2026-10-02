const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all");

let notes = [];

function render() {
  list.replaceChildren();

  notes.forEach((note) => {
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
    card.append(content);
    list.append(card);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const noteText = input.value.trim();
  const note = {
    id: Date.now(),
    text: noteText,
    category: categoryInput.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  render();
  input.value = "";
});

render();