document.addEventListener('DOMContentLoaded', () => {
    const noteText = document.getElementById('note-text');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesContainer = document.getElementById('notes-container');

    // ローカルストレージからメモを読み込み、表示する
    function loadNotes() {
        notesContainer.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note, index) => {
            createNoteElement(note, index);
        });
    }

    // 新しいメモカードを作成する
    function createNoteElement(text, index) {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');

        const noteContent = document.createElement('p');
        noteContent.textContent = text;
        noteCard.appendChild(noteContent);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', () => {
            deleteNote(index);
        });
        noteCard.appendChild(deleteBtn);

        notesContainer.appendChild(noteCard);
    }

    // メモを追加する
    addNoteBtn.addEventListener('click', () => {
        const text = noteText.value.trim();
        if (text) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(text);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteText.value = '';
            loadNotes();
        }
    });

    // メモを削除する
    function deleteNote(index) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }

    // ページ読み込み時にメモを読み込む
    loadNotes();
});
