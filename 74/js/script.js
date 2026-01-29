document.addEventListener('DOMContentLoaded', () => {
    const logList = document.getElementById('log-list');
    
    // ページ読み込み時に保存されたデータを表示
    displayLogs();
    
    // 「記録を追加する」ボタンがクリックされた時の処理
    document.getElementById('add-btn').addEventListener('click', () => {
        const subject = document.getElementById('subject').value;
        const time = document.getElementById('time').value;
        const category = document.getElementById('category').value;
        
        // 入力チェック（空欄がある場合は保存しない）
        if (!subject || !time || !category) {
            alert("未入力の項目があります");
            return;
        }
        
        // 今日の日付を取得 
        const today = new Date();
        const date = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

        // 入力内容確認用
        console.log(subject,time,category);
        
        // 保存用のデータオブジェクト
        const newLog = {
            subject: subject,
            time: time,
            category: category,
            date: date
        };
        
        // ローカルストレージから既存データを取得（なければ空配列）
        const logs = JSON.parse(localStorage.getItem('studyLogs')) || [];
        
        // 新しいデータを先頭に追加
        logs.unshift(newLog);
        
        // ローカルストレージに保存
        localStorage.setItem('studyLogs', JSON.stringify(logs));

        // 保存された内容を表示
        console.log(newLog);
        
        // 入力欄をリセット
        document.getElementById('subject').value = "";
        document.getElementById('time').value = "";
        document.getElementById('category').value = "";
        
        // 表示を更新
        displayLogs();
    });

    // 「記録を削除する」ボタンがクリックされたときの処理
    document.getElementById("del-btn").addEventListener('click' , () => {
        const result = confirm('すべての最新の学習記録が削除されます。\n本当に削除しますか？');
        if(result){
            localStorage.clear();
            
        }
    });
    
    // 画面にログを表示する関数
    function displayLogs() {
        const logs = JSON.parse(localStorage.getItem('studyLogs')) || [];
        
        // リストを一旦空にする
        logList.innerHTML = "";

        // データの数だけカードを生成
        logs.forEach(log => {
            const logCard = document.createElement('div');
            logCard.id = 'log-card'; // CSSのスタイルを適用

            logCard.innerHTML = `
                <div id="log-info">
                    <span class="category-tag">${log.category}</span>
                    <h3>${log.subject}</h3>
                    <p>${log.date} ・ ${log.time}分</p>
                </div>
            `;
            logList.appendChild(logCard);
        });
    }
});
