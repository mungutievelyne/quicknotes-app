

"use strict";

// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// 2. Create an array to store notes
const notes = [];

// 3. Update the note count
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

// 4. Display notes on the page
function renderNotes() {
  notesList.textContent = "";

  notes.forEach(function (note) {
    const noteCard = document.createElement("li");
    noteCard.classList.add("note-card");
    noteCard.classList.add(`category-${note.category}`);

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("small");
    categoryLabel.textContent = `Category: ${note.category}`;

    // Create a delete button
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

// 5. Delete a note
function deleteNote(id) {
  const noteIndex = notes.findIndex(function (note) {
    return note.id === id;
  });

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
  }

  renderNotes();
}

// 6. Validate and add a note
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const noteText = noteInput.value.trim();
  const category = noteCategory.value;

  // Check for empty notes
  if (noteText === "") {
    errorMessage.textContent = "Please enter a note.";
    return;
  }

  // Check for notes longer than 200 characters
  if (noteText.length > 200) {
    errorMessage.textContent = "Your note must be 200 characters or fewer.";
    return;
  }

  // Clear any previous error
  errorMessage.textContent = "";

  // Create a note object
  const note = {
    id: Date.now(),
    text: noteText,
    category: category,
    createdAt: new Date().toISOString()
  };

  notes.push(note);

  renderNotes();

  // Reset the input
  noteInput.value = "";
  noteInput.focus();
});
