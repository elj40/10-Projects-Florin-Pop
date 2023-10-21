
let allNoteData = [];

setup();

function setup() {
    allNoteData = JSON.parse(localStorage.getItem('notes'));

    for (let note of allNoteData) {
        addToList(note[0]);
    }
}

function saveNote() {
    const titleText = document.getElementById("text-title");
    const noteText = document.getElementById("text-area");

    let title = titleText.value;

    if (title.length == 0) {
        alert("Please add a title before saving");
        return;
    }

    for (let note of allNoteData) {
        if (title == note[0]) {
            note[1] = noteText.value;
            return;
        }
    }

    addToList(title);
    const noteData = [title, noteText.value];
    allNoteData.push(noteData);
    localStorage.setItem(`notes`, JSON.stringify(allNoteData));
}

function newNote() {
    const titleText = document.getElementById("text-title");
    const noteText = document.getElementById("text-area");

    titleText.value = "";
    noteText.value = ""
}

function deleteNote() {
    const eachNote = document.getElementById("each-note");
    const titleText = document.getElementById("text-title");

    let i = 0;
    for (let note of allNoteData) {
        if (titleText.value == note[0]) {
            allNoteData.splice(i,1);
        }
        i++;
    }

    for (let child of eachNote.children) {
        if (child.innerText == titleText.value) eachNote.removeChild(child);
    }

    localStorage.setItem("notes", JSON.stringify(allNoteData));

    newNote();
}

function loadNote(name) {
    const titleText = document.getElementById("text-title");
    const noteText = document.getElementById("text-area");

    for (let note of allNoteData) {
        if (name == note[0]) {
            titleText.value = note[0];
            noteText.value = note[1];
        }
    }
}

function addToList(name) {
    const eachNote = document.getElementById("each-note");
    const newNote = document.createElement("p");

    newNote.innerText = name;
    newNote.addEventListener("click", (e)=>{
        loadNote(e.target.innerText);
    })

    eachNote.appendChild(newNote);
}