//npm i express

const express = require('express');
//実行した結果をappという変数に入れる
const app = express();
//appがexpressそのもの
console.dir(app);

//リクエストがきたことを認識できるようにする。Expressにリクエストがある度に必ずコールバック関数が呼ばれるようになる。
app.use(()=>{
    console.log('リクエストを受け付けました');
});

//2つのパラメーターを使える。サーバーに入ってくるリクエストのオブジェクト。サーバーから出て行くレスポンスのオブジェクト。
app.use((req, res)=>{
    console.log('リクエストを受け付けました');
    console.dir(req);
    console.dir(res);
});


app.use((req, res)=>{
    console.log('リクエストを受け付けました');
    res.send('リクエストを受けたのでレスポンスを返します');
    //https://expressjs.com/ja/4x/api.html#res.send
    res.send ({color: 'red'});
    // JSONに変換される
    res.send('<h1>はじめてのExpress</h1>');
    //h1が反映される
});
//↑　全てのリクエストに同じレスポンスを返している


//↓　リクエストに応じてレスポンスを変える
app.get('/cats',(req, res) => {
    console.log('/catsにリクエストがきました');
    res.send('にゃー');
});

app.post('/cats', (req, res) => {
    res.send('/catsにPOSTリクエストがきました');
})
//他のHTTPメソッド

app.get('/dogs', (req, res) => {
    res.send('わんわん');
});

app.get('/', (req, res) => {
    res.send('ここはホームページ');
});


//ルーティングのパスにパターンを定義する
// /r/hogeでも/r/mogeでも、この文字がでる. /r/hoge/mogeはエラー
// '/:subreddit'はreqのparamsに入っている
app.get('/r/:subreddit', (req, res) => {
    console.log(req.params);
    //{ subreddit: 'cats}
    res.send('subredditページ');

    const { subreddit} = req.params;
    res.send(`'<h1>${subreddit} subredditのページ</h1>`);
    // catsのページだと、 「cats subredditのページ」　とでる
});


app.get('/r/:subreddit/:postId', (req, res) => {
    console.log(req.params);
    // { subreddit: 'cats', postId: '12345'}
    const { subreddit, postId} = req.params;
    res.send(`<h1>${subreddit} subreddit Post ID: ${postId} のページ</h1>`);
    // catsのページだと、 「cats subreddit 12345のページ　」とでる
});


//クエリストリング
app.get('/search', (req, res) => {
    console.log(req.query);
    // {}
    res.send('hi');
    //postmanで q dogs, color redtというparamsを追加 localhost:3000/search?q=dogs&color=red　にすると
    //console.log(req.query)　は　 {q: 'dogs', color: 'red'}がでる

    const { q } = req.query;
    if (!q ){
        res.send('検索するものが指定されていません');
    } else {
        res.send(`<h1>「${q}の検索結果」</h1>`);
    }
    //urlを /search?q=dog　にすると、「dog」の検索結果　　　とページに表示
})


//expressのルーティングは定義順にマッチングしていくため、*は最後が好ましい
app.get('*', (req, res) => {
    res.send('そんなパスは知らない');
})

//ルーティングのパスにパターンを定義する



//サーバー立ち上げ。第1引数はポート番号。第２引数はコールバック関数。サーバーが起動した後に完了したら呼ばれるコールバック
app.listen(3000,() => {
    console.log('リクエストをポート3000で待ち受け中...');
});