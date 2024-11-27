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
      if (responseWord.endsWith("ー）")) {
        if (responseWord.endsWith("ゃー）")) {
          if (!userWord.startsWith("や")) {
            alert("僕の単語聞いてた？")
            return;
          }
        }
        else if (responseWord.endsWith("ゅー）")) {
          if (!userWord.startsWith("ゆ")) {
            alert("僕の単語聞いてた？")
            return;
          }
        }
        else if (responseWord.endsWith("ょー）")) {
          if (!userWord.startsWith("よ")) {
            alert("僕の単語聞いてた？")
            return;
          }
        }
        else if (responseWord.endsWith("ぁー）")) {
          if (!userWord.startsWith("あ")) {
            alert("僕の単語聞いてた？")
            return;
          }
        }
        else if (responseWord.endsWith("ぃー）")) {
          if (!userWord.startsWith("い")) {
            alert("僕の単語聞いてた？")
            return;
          }
        }
        else if (responseWord.endsWith("ぅー）")) {
          if (!userWord.startsWith("う")) {
            alert("僕の単語聞いてた？")
            return;
          }
        }
        else if (responseWord.endsWith("ぇー）")) {
          if (!userWord.startsWith("え")) {
            alert("僕の単語聞いてた？")
            return;
          }
        }
        else if (responseWord.endsWith("ぉー）")) {
          if (!userWord.startsWith("お")) {
            alert("僕の単語聞いてた？")
            return;
          }
        }
        else {
          if (!(firstChar === responseWord.slice(-3, -2))) {
            alert("僕の単語聞いてた？")
            return;
          }
        }
      }
      else if (responseWord.endsWith("ゃ）")) {
        if (!userWord.startsWith("や")) {
          alert("僕の単語聞いてた？")
          return;
        }
      }
      else if (responseWord.endsWith("ゅ）")) {
        if (!userWord.startsWith("ゆ")) {
          alert("僕の単語聞いてた？")
          return;
        }
      }
      else if (responseWord.endsWith("ょ）")) {
        if (!userWord.startsWith("よ")) {
          alert("僕の単語聞いてた？")
          return;
        }
      }
      else if (responseWord.endsWith("ぁ）")) {
        if (!userWord.startsWith("あ")) {
          alert("僕の単語聞いてた？")
          return;
        }
      }
      else if (responseWord.endsWith("ぃ）")) {
        if (!userWord.startsWith("い")) {
          alert("僕の単語聞いてた？")
          return;
        }
      }
      else if (responseWord.endsWith("ぅ）")) {
        if (!userWord.startsWith("う")) {
          alert("僕の単語聞いてた？")
          return;
        }
      }
      else if (responseWord.endsWith("ぇ）")) {
        if (!userWord.startsWith("え")) {
          alert("僕の単語聞いてた？")
          return;
        }
      }
      else if (responseWord.endsWith("ぉ）")) {
        if (!userWord.startsWith("お")) {
          alert("僕の単語聞いてた？")
          return;
        }
      }
      else {
        if (!(firstChar === responseWord.slice(-2, -1))) {
          alert("僕の単語聞いてた？")
          return;
        }
      }
    }

    // if (!(responseWord === '')) {
    //   if ((responseWord.slice(-2) === "ー）")
    //   ) {
    //     if (!(responseWord.slice(-3, -2) === firstChar)) {
    //       alert("僕の単語聞いてた？")
    //       return;
    //     }
    //   } else if (!((firstChar) === (responseWord.slice(-2, -1)))) {
    //     alert("僕の単語聞いてた？")
    //     return;
    //   }
    // }

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
    if (randomWord.endsWith("ん") || randomWord.endsWith("ン") || randomWord.endsWith("ん）") || randomWord.endsWith("ン）")) {
      alert(`${randomWord}！...あっ！油断した...君の勝ちだ！！`)
      reset();
    }

  }

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
                  <h2>{history.length > 0 ? `${history[history.length - 1].user}、${history[history.length - 1].user.slice(-1)}、${history[history.length - 1].user.slice(-1)}、、、` : "好きな言葉で始めたまえ"}！</h2>
                  <h2>{responseWord}！</h2>
                  <h3>【ちょこっと解説】<br></br>{meaning}</h3>
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

      <button className="button is-danger is-fixed-top" onClick={reset}>リセット</button><h1>小さい文字で終わる言葉には、その言葉で返してね。例：歯医者（はいしゃ）→やりいか</h1>
    </div>
  );
}

export default App;
