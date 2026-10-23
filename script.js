// Select elements with querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all");

// Notes stored as an array of objects: id, text, category, createdAt
let notes = [];

const STORAGE_KEY = "quicknotes-notes";

// Load notes from localStorage
function loadNotes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      notes = JSON.parse(stored);
    } catch (error) {
      notes = [];
    }
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Format the createdAt date as a readable date and time
function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

// Update the count message for zero, one and many notes
function updateCount() {
  const total = notes.length;
  if (total === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (total === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + total + " notes.";
  }
}

// Show and clear validation errors
function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

// render() rebuilds the list from the array using createElement and textContent
function render() {
  // Clear the current list
  notesList.textContent = "";

  // Filter notes by the search term (case-insensitive)
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filtered = searchTerm
    ? notes.filter(function (note) {
        return note.text.toLowerCase().includes(searchTerm);
      })
    : notes;

  // If a search finds nothing, show a message in the list
  if (filtered.length === 0 && searchTerm) {
    const emptyItem = document.createElement("li");
    emptyItem.classList.add("no-match");
    emptyItem.textContent = "No notes match your search.";
    notesList.appendChild(emptyItem);
  }

  // Build one card per note
  filtered.forEach(function (note) {
    const listItem = document.createElement("li");
    listItem.classList.add("note-card", "category-" + note.category.toLowerCase());

    const textParagraph = document.createElement("p");
    textParagraph.classList.add("note-text");
    textParagraph.textContent = note.text;

    const metaDiv = document.createElement("div");
    metaDiv.classList.add("note-meta");

    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("category-label");
    categoryLabel.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.textContent = formatDate(note.createdAt);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      notes = notes.filter(function (item) {
        return item.id !== note.id;
      });
      saveNotes();
      render();
    });

    metaDiv.appendChild(categoryLabel);
    metaDiv.appendChild(dateSpan);
    metaDiv.appendChild(deleteBtn);

    listItem.appendChild(textParagraph);
    listItem.appendChild(metaDiv);
    notesList.appendChild(listItem);
  });

  updateCount();
}

// Add a note when the form is submitted
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  // Validation
  if (text === "") {
    showError("Please type a note first.");
    return;
  }
  if (text.length > 200) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  saveNotes();
  render();

  // Clear the input after adding and clear any error
  noteInput.value = "";
  clearError();
  noteInput.focus();
});

// Search as the user types
searchInput.addEventListener("input", render);

// Bonus: clear all notes after confirmation
clearAllBtn.addEventListener("click", function () {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

// Load notes and render them when the page opens
loadNotes();
render();
