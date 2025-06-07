const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const db = new sqlite3.Database('users.db');

// 建立資料表
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  password TEXT NOT NULL
)`);

// 解析表單資料
app.use(express.urlencoded({ extended: true }));

// 提供靜態檔案（讓 index.html 可以直接跑）
app.use(express.static(path.join(__dirname, 'public')));

// 接收登入表單 POST
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);

    res.send(`
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
      <meta charset="UTF-8" />
      <title>登入成功</title>
      <meta http-equiv="refresh" content="3; url=/" />
      <style>
        body {
          background-color: #000;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: "Noto Sans TC", sans-serif;
          font-size: 24px;
        }
      </style>
    </head>
    <body>
      登入成功!
    </body>
    </html>
  `);
});


// 啟動伺服器
app.listen(3000, () => {
    console.log('伺服器啟動於 http://localhost:3000');
});
