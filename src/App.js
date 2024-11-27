import React, { useState } from 'react';
import { dictionary as initialDictionary } from './dictionary';
import { meanings } from './meanings';
import './App.css';

function App() {
  //入力した単語を保存する箱を作る
  const [userWord, setUserWord] = useState('');
  const [responseWord, setResponseWord] = useState('');//アプリの答え
  const [meaning, setMeaning] = useState('');
  const [history, setHistory] = useState([]);
  const [dictionary, setDictionary] = useState(initialDictionary)

  //コンピュータ側の単語の最後の文字（＝人間が単語の最初につけなければいけない文字）
  const ruleChar = (word) => {
    if (word.endsWith("ー）")) {
      if (word.endsWith("ゃー）")) { return "や"; }
      else if (word.endsWith("ゃー）")) { return "や"; }
      else if (word.endsWith("ゅー）")) { return "ゆ"; }
      else if (word.endsWith("ょー）")) { return "よ"; }
      else if (word.endsWith("ぁー）")) { return "あ"; }
      else if (word.endsWith("ぃー）")) { return "い"; }
      else if (word.endsWith("ぅー）")) { return "う"; }
      else if (word.endsWith("ぇー）")) { return "え"; }
      else if (word.endsWith("ぉー）")) { return "お"; }
      else { return word.slice(-3, -2) }
    }
    else if (word.endsWith("ゃ）")) { return "や"; }
    else if (word.endsWith("ゅ）")) { return "ゆ"; }
    else if (word.endsWith("ょ）")) { return "よ"; }
    else if (word.endsWith("ぁ）")) { return "あ"; }
    else if (word.endsWith("ぃ）")) { return "い"; }
    else if (word.endsWith("ぅ）")) { return "う"; }
    else if (word.endsWith("ぇ）")) { return "え"; }
    else if (word.endsWith("ぉ）")) { return "お"; }
    else { return word.slice(-2, -1) }
  };

  const handleSubmit = () => {
    //空じゃない？
    if (!userWord.trim()) {
      alert("単語を入力してね。");
      return;
    }
    //日本語？
    if (!/^[ぁ-んー]+$/.test(userWord)) {
      alert("ひらがなのみ入力してください");
      return;
    }
    if (userWord.length <= 2) {
      alert("3文字以上で頼むぞ。")
      return;
    }
    const lastChar = userWord.slice(-1);

    if (lastChar === "ん") {
      alert("「ん」で終わってるじゃん。負けちゃうよ。")
      return;
    }

    const firstChar = userWord.slice(0, 1);
    if (!(responseWord === '')) {
      if (!(firstChar === ruleChar(responseWord))) {
        alert("しりとり知ってる？")
        return;
      }
    };


    if (!dictionary[lastChar] || dictionary[lastChar].length === 0) {
      alert("くっ...単語が思いつかない...君の勝ちだ！！")
      reset();
    }
    const words = dictionary[lastChar];
    const randomIndex = Math.floor(Math.random() * words.length)
    const randomWord = words[randomIndex];

    //選んだ単語を辞書から削除
    const updateWords = [...words];
    updateWords.splice(randomIndex, 1);

    setDictionary({
      ...dictionary,
      [lastChar]: updateWords
    })

    setResponseWord(randomWord);
    setMeaning(meanings[randomWord]);
    const history10 = [...history, { user: userWord, app: randomWord }];
    if (history10.length > 5) {
      history10.shift();
    }
    setHistory(history10);
    setUserWord('');
    if (randomWord.endsWith("ん）")) {
      alert(`${randomWord}！...あっ！油断した...おまけして，「${randomWord.slice(-3, -2)}」から頼むよぉ`)
      setResponseWord(randomWord.slice(0, -2) + "）");
    }

  }

  console.log(ruleChar("（ふぅーちゃー）"))

  const reset = () => {
    window.location.reload();
  }
  return (
    <div className="App">
      <div className="container">
        <div className="colums">
          <div className="column is-half is-offset-one-quarter">
            <div className="card fixed-card">
              <div className="card-content">
                <div className="content">
                  <h1>しりとり道場</h1>

                </div>
                <input
                  className="input is-primary"
                  type="text" //入力ボックスを表示
                  value={userWord}
                  onChange={(e) => setUserWord(e.target.value)}//入力値を状態に保存
                  placeholder='単語を入力してください'//
                />
                <h1>　　　</h1>
                <button className="button is-primary is-large is-responsive is-fullwidth" onClick={handleSubmit}>回答</button>
                <h1>　　　</h1>
                <div className="content">
                  <h2>{history.length > 0 ? `${history[history.length - 1].user}、${history[history.length - 1].user.slice(-1)}、${history[history.length - 1].user.slice(-1)}、、、` : "好きな言葉（ひらがな）で始めたまえ"}</h2>
                  <h2>{history.length > 0 ? responseWord + "！" : ''}</h2>
                  <h4>{history.length > 0 ? "【ちょこっと解説】" : ''}<br></br>{meaning}</h4>
                </div>
                <ul>
                  {history.map((item, index) => (
                    <li key={index}>
                      <div className="content">
                        <h4>{item.user} → {item.app} →</h4>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="button is-danger is-fixed-top" onClick={reset}>リセット</button><p>小さい文字で終わる言葉には、その言葉で返してね。例：歯医者（はいしゃ）→やりいか<br></br>しりとり師範は忘れっぽいです。君と同じ言葉を言っても許してね。</p>
    </div >
  );
}

export default App;
