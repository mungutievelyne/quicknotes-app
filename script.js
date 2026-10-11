
"use strict";

// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all-btn");

// 2. Load saved notes from localStorage
const STORAGE_KEY = "quicknotes-notes";

let notes = [];

try {
  const savedNotes = localStorage.getItem(STORAGE_KEY);

  if (savedNotes !== null) {
    const parsedNotes = JSON.parse(savedNotes);

    if (Array.isArray(parsedNotes)) {
      notes = parsedNotes;
    }
  }
} catch (error) {
  console.error("Could not load saved notes:", error);
}

// 3. Save notes to localStorage
function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Could not save notes:", error);
    errorMessage.textContent = "Could not save your notes. Please check your browser storage.";
  }
}

// 4. Update the note count
function updateNoteCount() {
  const total = notes.length;

  if (total === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (total === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${total} notes.`;
  }
}

// 5. Display notes, filtering by search text
function renderNotes() {
  notesList.textContent = "";

  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchTerm);
  });

  filteredNotes.forEach(function (note) {
    const noteCard = document.createElement("li");
    noteCard.classList.add("note-card", `category-${note.category}`);

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("small");
    categoryLabel.textContent = `Category: ${note.category}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function () {
      deleteNote(note.id);
    });

    noteCard.append(noteText, categoryLabel, deleteButton);
    notesList.appendChild(noteCard);
  });

  updateNoteCount();
}

// 6. Delete a note
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });

  saveNotes();
  renderNotes();
}

// 7. Add a note with validation
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text === "") {
    errorMessage.textContent = "Please enter a note.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Your note must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toISOString()
  };

  notes.push(note);

  saveNotes();
  renderNotes();

  noteInput.value = "";
  noteInput.focus();
});

// 8. Search notes as the user types
searchInput.addEventListener("input", renderNotes);

// 9. Display saved notes when the page loads
renderNotes();


clearAllButton.addEventListener("click", function () {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    renderNotes();
    errorMessage.textContent = "";
  }
});

