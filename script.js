document.addEventListener('DOMContentLoaded', () => {
    const noteText = document.getElementById('note-text');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesContainer = document.getElementById('notes-container');
    
    // ポップアップ関連の要素
    const popupOverlay = document.getElementById('popup-overlay');
    const editNoteText = document.getElementById('edit-note-text');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    
    let currentEditIndex = -1;

    // ローカルストレージからメモを読み込み、表示する
    function loadNotes() {
        notesContainer.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note, index) => {
            createNoteCardElement(note, index);
        });
    }

    // 新しいメモカードを作成する
    function createNoteCardElement(text, index) {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');

        const noteContent = document.createElement('p');
        noteContent.textContent = text;
        noteCard.appendChild(noteContent);
        
        // カードをクリックしたときの処理
        noteCard.addEventListener('click', (e) => {
            // 削除ボタンクリック時はポップアップを開かない
            if (e.target.classList.contains('delete-btn')) return;
            openPopup(index);
        });

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
    
    // ポップアップを開く
    function openPopup(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        if (index >= 0 && index < notes.length) {
            currentEditIndex = index;
            editNoteText.value = notes[index];
            popupOverlay.classList.add('active');
        }
    }

    // ポップアップを閉じる
    function closePopup() {
        popupOverlay.classList.remove('active');
        currentEditIndex = -1;
    }

    // 編集内容を保存する
    saveEditBtn.addEventListener('click', () => {
        if (currentEditIndex !== -1) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes[currentEditIndex] = editNoteText.value.trim();
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
            closePopup();
        }
    });

    // 編集をキャンセルする
    cancelEditBtn.addEventListener('click', () => {
        closePopup();
    });

    // ポップアップの背景をクリックして閉じる
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // ページ読み込み時にメモを読み込む
    loadNotes();
});
