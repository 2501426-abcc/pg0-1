// 要素の取得
const saveBtn = document.getElementById('save-btn');
const recordList = document.getElementById('record-list');

// 1. ページ読み込み時に保存されているデータを表示
window.onload = () => {
    displayRecords();
};

// 2. 保存ボタンを押した時の処理
saveBtn.addEventListener('click', () => {
    const subject = document.getElementById('subject').value;
    const content = document.getElementById('content').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!subject || !content || !date || !time) {
        alert("すべての項目を入力してください");
        return;
    }

    // 新しい記録オブジェクト
    const newRecord = { subject, content, date, time };

    // 既存のデータを取得（なければ空配列）
    const records = JSON.parse(localStorage.getItem('studyRecords')) || [];
    
    // 新しいデータを追加して保存
    records.push(newRecord);
    localStorage.setItem('studyRecords', JSON.stringify(records));

    // 入力欄を空にする
    document.getElementById('subject').value = "";
    document.getElementById('content').value = "";
    document.getElementById('date').value = "";
    document.getElementById('time').value = "";

    // リストを更新
    displayRecords();
});

// 3. ローカルストレージの内容を画面に表示する関数
function displayRecords() {
    const records = JSON.parse(localStorage.getItem('studyRecords')) || [];
    recordList.innerHTML = ""; // 一度リセット

    records.forEach((record, index) => {
        const div = document.createElement('div');
        div.className = 'record-item';
        div.innerHTML = `
            <p><strong>日付:</strong> ${record.date} | <strong>教科:</strong> ${record.subject}</p>
            <p><strong>内容:</strong> ${record.content} (${record.time}分)</p>
            <hr>
        `;
        recordList.appendChild(div);
    });
}