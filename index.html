<?php
// --- データ処理 ---

// データストアのファイルパス
$dataFile = 'memos.json';

/**
 * 全てのメモを取得する関数
 * @return array メモの配列
 */
function getMemos() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        return [];
    }
    $json = file_get_contents($dataFile);
    // JSONをデコードして連想配列に変換。更新日時の降順でソート
    $memos = json_decode($json, true);
    usort($memos, function($a, $b) {
        return $b['updated_at'] <=> $a['updated_at'];
    });
    return $memos;
}

/**
 * メモの配列をファイルに保存する関数
 * @param array $memos 保存するメモの配列
 */
function saveMemos($memos) {
    global $dataFile;
    // 配列をJSONにエンコードしてファイルに書き込む
    $json = json_encode($memos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    file_put_contents($dataFile, $json, LOCK_EX);
}

// --- リクエスト処理 (POST) ---

// フォームが送信された場合の処理
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // どの操作（action）かを判定
    $action = $_POST['action'] ?? '';

    // [保存] アクション
    if ($action === 'save') {
        $memos = getMemos();
        $id = $_POST['id'];
        $title = $_POST['title'];
        $content = $_POST['content'];
        $now = date("Y/m/d H:i:s");

        if ($id === 'new') {
            // 新規作成
            $newMemo = [
                'id' => uniqid(), // ユニークなIDを生成
                'title' => $title,
                'content' => $content,
                'updated_at' => $now
            ];
            $memos[] = $newMemo;
        } else {
            // 更新
            foreach ($memos as &$memo) {
                if ($memo['id'] === $id) {
                    $memo['title'] = $title;
                    $memo['content'] = $content;
                    $memo['updated_at'] = $now;
                    break;
                }
            }
        }
        saveMemos($memos);
    }
    // [削除] アクション
    elseif ($action === 'delete') {
        $memos = getMemos();
        $id = $_POST['id'];
        // IDが一致しないメモだけをフィルタリングして新しい配列を作成
        $memos = array_filter($memos, function($memo) use ($id) {
            return $memo['id'] !== $id;
        });
        saveMemos($memos);
    }

    // 処理後は一覧ページにリダイレクト
    header('Location: index.php');
    exit;
}

// --- 表示処理 (GET) ---

$pageId = $_GET['id'] ?? null; // URLパラメータからIDを取得 (例: index.php?id=xxxxx)

?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memot - PHP</title>
<style>
/* 元のCSSをベースに、フォーム用のスタイルを追加 */
body {
    margin: 0;
    background-color: #fffaf2;
    font-family: sans-serif;
}

.appbar {
    background-color: #84bed6;
    color: #fff;
    padding: 12px;
    text-align: center;
    margin-bottom: 0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.8);
    font-size: 20px;
    font-weight: bold;
}

.container {
    padding: 10px;
}

/* --- 一覧画面 --- */
.memo-list {
    padding-top: 5px;
}

.memo-list-item-link {
    text-decoration: none;
    color: inherit;
}

.memo-list-item {
   background-color: #ffffff;
   padding: 12px;
   border-bottom: 1px solid #e0e0e0;
   transition: background-color 0.2s;
}
.memo-list-item:hover {
    background-color: #f5f5f5;
}

.memo-list-item h3 {
   font-size: 18px;
   margin: 0 0 4px 0;
}

.memo-list-item p {
    font-size: 11px;
    color: gray;
    margin: 0;
}

.memo-add-button {
    width: 50px;
    height: 50px;
    background-color: palevioletred;
    color: #fff;
    font-size: 24px;
    text-align: center;
    line-height: 48px;
    border-radius: 50px;
    position: fixed; /* absoluteからfixedに変更 */
    bottom: 24px;
    right: 24px;
    text-decoration: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.4);
    transition: transform 0.2s;
}
.memo-add-button:hover {
    transform: scale(1.1);
}


/* --- 編集画面 --- */
.form-group {
    margin-bottom: 15px;
}
.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}
.form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* paddingを含めてwidth 100%にする */
}
textarea.form-control {
    height: 250px;
    resize: vertical;
}

.button-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
}
.btn-primary {
    background-color: #3498db;
}
.btn-primary:hover {
    background-color: #2980b9;
}
.btn-danger {
    background-color: #e74c3c;
}
.btn-danger:hover {
    background-color: #c0392b;
}

.back-link {
    display: inline-block;
    margin-top: 15px;
    color: #3498db;
    text-decoration: none;
}
.back-link:hover {
    text-decoration: underline;
}

</style>
</head>
<body>
    <div>
        <div class="appbar">
            Memot
        </div>

        <?php if ($pageId): // --- 詳細・編集・新規作成ページ --- ?>
            
            <?php
            // 表示するメモを特定
            $currentMemo = [
                'id' => 'new',
                'title' => '',
                'content' => '',
            ];
            if ($pageId !== 'new') {
                $memos = getMemos();
                foreach ($memos as $memo) {
                    if ($memo['id'] === $pageId) {
                        $currentMemo = $memo;
                        break;
                    }
                }
            }
            ?>

            <div class="container">
                <form action="index.php" method="POST">
                    <input type="hidden" name="action" value="save">
                    <input type="hidden" name="id" value="<?= htmlspecialchars($currentMemo['id']) ?>">
                    
                    <div class="form-group">
                        <label for="title">タイトル</label>
                        <input type="text" id="title" name="title" class="form-control" value="<?= htmlspecialchars($currentMemo['title']) ?>" required>
                    </div>

                    <div class="form-group">
                        <label for="content">内容</label>
                        <textarea id="content" name="content" class="form-control"><?= htmlspecialchars($currentMemo['content']) ?></textarea>
                    </div>

                    <div class="button-group">
                        <button type="submit" class="btn btn-primary">保存</button>
                        
                        <?php if ($currentMemo['id'] !== 'new'): // 既存メモの場合のみ削除ボタンを表示 ?>
                            <form action="index.php" method="POST" onsubmit="return confirm('本当にこのメモを削除しますか？');" style="display: inline;">
                                <input type="hidden" name="action" value="delete">
                                <input type="hidden" name="id" value="<?= htmlspecialchars($currentMemo['id']) ?>">
                                <button type="submit" class="btn btn-danger">削除</button>
                            </form>
                        <?php endif; ?>
                    </div>
                </form>

                <a href="index.php" class="back-link">&laquo; 一覧に戻る</a>
            </div>


        <?php else: // --- 一覧ページ --- ?>
            
            <div class="memo-list">
                <?php
                $memos = getMemos();
                foreach ($memos as $memo):
                ?>
                    <a href="?id=<?= htmlspecialchars($memo['id']) ?>" class="memo-list-item-link">
                        <div class="memo-list-item">
                            <h3><?= htmlspecialchars($memo['title']) ?></h3> 
                            <p><?= htmlspecialchars($memo['updated_at']) ?></p>
                        </div>
                    </a>
                <?php endforeach; ?>

                <?php if (empty($memos)): ?>
                    <p style="text-align: center; color: gray; margin-top: 20px;">メモはまだありません。<br>右下の「＋」ボタンから作成しましょう。</p>
                <?php endif; ?>
            </div>
            
            <a href="?id=new" class="memo-add-button">
                ＋
            </a>

        <?php endif; ?>

    </div>
</body>
</html>
