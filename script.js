
"use strict";

// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// 2. Create an array to store notes
const notes = [];

// 3. Display notes on the page
function renderNotes() {
  notesList.textContent = "";

  notes.forEach(function (note) {
    // Create the note card
    const noteCard = document.createElement("li");
    noteCard.classList.add("note-card");
    noteCard.classList.add(`category-${note.category}`);

    // Create the note text
    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    // Create the category label
    const categoryLabel = document.createElement("small");
    categoryLabel.textContent = `Category: ${note.category}`;

    // Add the content to the card
    noteCard.append(noteText, categoryLabel);

    // Add the card to the list
    notesList.appendChild(noteCard);
  });
}

// 4. Add a new note when the form is submitted
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const noteText = noteInput.value.trim();
  const category = noteCategory.value;

  // Create a note object
  const note = {
    id: Date.now(),
    text: noteText,
    category: category,
    createdAt: new Date().toISOString()
  };

  // Add the note to the array
  notes.push(note);

  // Display the updated notes
  renderNotes();

  // Clear the input
  noteInput.value = "";
  noteInput.focus();
});
