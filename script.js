document.addEventListener('DOMContentLoaded', () => {
    // DOM要素の取得
    const sidebar = document.querySelector('.sidebar');
    const notebookList = document.getElementById('notebook-list');
    const memoListContainer = document.getElementById('memo-list-container');
    const memoList = document.getElementById('memo-list');
    const currentNotebookTitle = document.getElementById('current-notebook-title');
    const editView = document.getElementById('edit-view');
    const welcomeView = document.getElementById('welcome-view');
    const addNotebookBtn = document.getElementById('add-notebook-btn');
    const backToNotebooksBtn = document.getElementById('back-to-notebooks-btn');
    const addMemoBtn = document.getElementById('add-memo-btn');
    const backToListBtn = document.getElementById('back-to-list-btn');
    const saveMemoBtn = document.getElementById('save-memo-btn');
    const deleteMemoBtn = document.getElementById('delete-memo-btn');
    const memoTitleInput = document.getElementById('memo-title');
    const memoContentInput = document.getElementById('memo-content');

    const STORAGE_KEY = 'two_level_memos';
    let currentNotebookId = null;
    let currentMemoId = null;

    // データ処理関数
    function getMemos() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : { notebooks: [] };
    }

    function saveMemos(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // 表示描画関数
    function renderNotebooks() {
        const data = getMemos();
        notebookList.innerHTML = '';
        if (data.notebooks.length === 0) {
            notebookList.innerHTML = '<p class="empty-list-msg">ノートブックがありません。</p>';
        } else {
            data.notebooks.forEach(notebook => {
                const item = document.createElement('li');
                item.className = 'list-item';
                item.textContent = notebook.title;
                item.addEventListener('click', () => {
                    currentNotebookId = notebook.id;
                    renderMemos(notebook.id);
                });
                notebookList.appendChild(item);
            });
        }
    }

    function renderMemos(notebookId) {
        const data = getMemos();
        const notebook = data.notebooks.find(n => n.id === notebookId);
        if (!notebook) return;

        currentNotebookTitle.textContent = notebook.title;
        notebookList.style.display = 'none';
        memoListContainer.style.display = 'block';
        editView.style.display = 'none';
        welcomeView.style.display = 'block';

        memoList.innerHTML = '';
        if (notebook.memos.length === 0) {
            memoList.innerHTML = '<p class="empty-list-msg">メモがありません。</p>';
        } else {
            notebook.memos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            notebook.memos.forEach(memo => {
                const item = document.createElement('li');
                item.className = 'list-item';
                item.innerHTML = `<h4>${memo.title}</h4><p>${new Date(memo.updated_at).toLocaleString('ja-JP')}</p>`;
                item.addEventListener('click', () => showEditView(memo.id));
                memoList.appendChild(item);
            });
        }
    }

    function showEditView(memoId) {
        welcomeView.style.display = 'none';
        editView.style.display = 'flex';
        currentMemoId = memoId;

        if (memoId) {
            const data = getMemos();
            const notebook = data.notebooks.find(n => n.id === currentNotebookId);
            const memo = notebook.memos.find(m => m.id === memoId);
            if (memo) {
                memoTitleInput.value = memo.title;
                memoContentInput.value = memo.content;
                deleteMemoBtn.style.display = 'inline-block';
            }
        } else {
            // 新規メモ
            memoTitleInput.value = '';
            memoContentInput.value = '';
            deleteMemoBtn.style.display = 'none';
        }
    }

    // イベントリスナー
    addNotebookBtn.addEventListener('click', () => {
        const title = prompt('新しいノートブックのタイトルを入力してください：');
        if (title) {
            const data = getMemos();
            const newNotebook = {
                id: Date.now().toString(),
                title: title,
                memos: []
            };
            data.notebooks.push(newNotebook);
            saveMemos(data);
            renderNotebooks();
        }
    });

    backToNotebooksBtn.addEventListener('click', () => {
        currentNotebookId = null;
        notebookList.style.display = 'block';
        memoListContainer.style.display = 'none';
        editView.style.display = 'none';
        welcomeView.style.display = 'block';
    });

    addMemoBtn.addEventListener('click', () => {
        if (!currentNotebookId) return;
        showEditView(null);
    });

    backToListBtn.addEventListener('click', () => {
        renderMemos(currentNotebookId);
    });

    saveMemoBtn.addEventListener('click', () => {
        const data = getMemos();
        const notebook = data.notebooks.find(n => n.id === currentNotebookId);
        if (!notebook) return;

        const memoData = {
            title: memoTitleInput.value || '無題のメモ',
            content: memoContentInput.value,
            updated_at: new Date().toISOString()
        };

        if (currentMemoId) {
            const memoIndex = notebook.memos.findIndex(m => m.id === currentMemoId);
            if (memoIndex !== -1) {
                notebook.memos[memoIndex] = { ...notebook.memos[memoIndex], ...memoData };
            }
        } else {
            notebook.memos.push({ id: Date.now().toString(), ...memoData });
        }
        
        saveMemos(data);
        renderMemos(currentNotebookId);
    });

    deleteMemoBtn.addEventListener('click', () => {
        if (currentMemoId && confirm('本当にこのメモを削除しますか？')) {
            const data = getMemos();
            const notebook = data.notebooks.find(n => n.id === currentNotebookId);
            if (notebook) {
                notebook.memos = notebook.memos.filter(m => m.id !== currentMemoId);
                saveMemos(data);
                renderMemos(currentNotebookId);
            }
        }
    });

    // 初期表示
    renderNotebooks();
});
