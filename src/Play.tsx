import React, { useEffect, useMemo, useRef, useState } from "react";
import desktopBg from './photo.png';

// Single-file Jeopardy / Quiz app about Саша — copy into App.jsx
// - Questions are in initialBoard().
// - Each question uses `choices: [...]` and `correct: <index>` (0-based) when known.
// - Host can reveal answer or judge correct/incorrect. Scores and state persist in localStorage.

const initialBoard = () => ({
  title: "Студенческие парламентские клубы",
  categories: [
    {
      name: "Кино",
      questions: [
        {
          value: 150,
          q: "Что на самом деле представляет из себя легендарный зеленый код из «Матрицы»?",
          choices: ["Рецепт пельменей", "Случайный набор цифр", "Рецепт суши", "Рецепт Пад Тая"],
          correct: 2,
        },
        {
          value: 250,
          q: 'Кто на самом деле рисовал Розу в «Титанике»?',
          choices: ["Леонардо ДиКаприо", "Билли Зейн", "Джеймс Кэмерон", "Кэти Бейтс"],
          correct: 2,
        },
        {
          value: 350,
          q: "Какого ребенка не было в поездке на фабрику Вонки в фильме «Вилли Вонка и шоколадная фабрика»?",
          choices: ["Билли Варпа", "Веруки Солт", "Майка Тиви", "Чарли Бакета"],
          correct: 0, 
        },
        {
          value: 450,
          q: "Какого цвета полосатый свитер Фредди Крюгера?",
          choices: ["Красно-синего", "Оранжево-зеленого", "Красно-зеленого", "Оранжево-коричневого"],
          correct: 2,
        },
        {
          value: 550,
          q: "Какой фильм стал самым кассовым в 2014 году?",
          choices: ["«Голодные игры: Сойка-пересмешница. Часть I»", "«ЛЕГО Фильм»", "«Первый мститель: Другая война»", "«Стражи Галактики»"],
          correct: 3,
        },
      ],
    },

    {
      name: "География",
      questions: [
        {
          value: 150,
          q: "Какая страна известна как «страна тысячи озер»?",
          choices: ["Финлядния", "Исландия", "Дания", "Норвегия"],
          correct: 0,
        },
        {
          value: 250,
          q: "Какая река протекает через Париж?",
          choices: ["Темза", "Дунай", "Сена", "Футалеуфу"],
          correct: 2,
        }, 
        {
          value: 350,
          q: "Какая самая длинная река в Европе?",
          choices: ["Дунай", "Волга", "Рейн", "Дон"],
          correct: 1,
        },
        {
          value: 450,
          q: "Какой город называют «вечным городом»?",
          choices: ["Афины", "Рим", "Иерусалим", "Рим"],
          correct: 3,
        },
        {
          value: 550,
          q: "Среди перечисленных городов Центральной России укажите центр судостроения.",
          choices: ["Липецк", "Воронеж", "Владимир", "Нижний Новгород"],
          correct: 3,
        },
      ],
    },

    {
      name: "История",
      questions: [
        {
          value: 150,
          q: "Какой древнегреческий полис был главным соперником Афин в Пелопоннесской войне?",
          choices: ["Спарта", "Фивы", "Коринф", "Милет"],
          correct: 0,
        },
        {
          value: 250,
          q: "Какой средневековый правитель был прозван «Королём-Солнце»",
          choices: ["Карл V", "Генрих VIII", "Людовик XIV", "Фридрих II"],
          correct: 2,
        },
        {
          value: 350,
          q: "Какое историческое событие произошло 12 октября 1492 года?",
          choices: ["Падение Константинополя", "Открытие Америки Христофором Колумбом", "Начало Реформации", "Казнь Марии Стюарт"],
          correct: 1,
        },
        {
          value: 450,
          q: "Какой древний народ создал первую в мире письменность — клинопись?",
          choices: ["Шумеры", "Египтяне", "Финикийцы", "Хетты"],
          correct: 0,
        },
        {
          value:550,
          q: "Какой важнейший для Древней Руси торговый путь называли «из варяг в греки»?",
          choices: ["Волжский торговый путь", "Путь через Великий шёлковый путь", "Путь из Балтийского моря в Чёрное по рекам", "Днепровский порог"],
          correct: 2,
        },
      ],
    },

    {
      name: "Наука",
      questions: [
        {
          value: 150,
          q: "Какой газ растения поглощают из атмосферы в процессе фотосинтеза?",
          choices: ["Кислород (O₂)", "Азот (N₂)", "Углекислый газ (CO₂)", "Водород (H₂)"],
          correct: 2,
        },
        {
          value: 250,
          q: "Как называется самая маленькая частица химического элемента, сохраняющая его свойства?",
          choices: ["Молекула", "Атом", "Ион", "Атом"],
          correct: 3,
        },
        {
          value: 350,
          q: "Как называется научная дисциплина, изучающая ископаемые остатки вымерших организмов?",
          choices: ["Археология", "Палеонтология", "Геология", "Антропология"],
          correct: 1,
        },
        {
          value: 450,
          q: "Какая часть клетки является её «энергетической станцией»?",
          choices: ["Ядро", "Рибосома", "Митохондрия", "Аппарат Гольджи"],
          correct: 2,
        },
        {
          value: 550,
          q: "Какая физическая величина измеряется в герцах (Гц)?",
          choices: ["Сила", "Частота", "Напряжение", "Мощность"],
          correct: 1,
        },
      ],
    },

    {
      name: "Искусство и литература",
      questions: [
        {
          value: 150,
          q: 'Кто написал роман "Мастер и Маргарита"?',
          choices: ["Михаил Булгаков", "Александр Пушкин", "Михаил Лермонтов", "Лев Толстой"],
          correct: 0,
        },
        {
          value: 250,
          q: "Кто главный герой исторического романа А.С. Пушкина «Капитанская дочка»?",
          choices: ["Алексей Гринев ", "Петр Исаков", "Петр Гринев", "Евгений Онегин"],
          correct: 2,
        },
        {
          value: 350,
          q: "Кто автор картины «Золотая осень»?",
          choices: ["Илья Ефимович Репин", "Валентин Александрович Серов", "Виктор Михайлович Васнецов", "Исаак Ильич Левитан"],
          correct: 3,
        },
        {
          value: 450,
          q: "Кто автор картины «Звездная ночь»?",
          choices: ["Винсент Ван Гог", "Сальвадор Дали", "Пикассо", "Илья Ефимович Репин"],
          correct: 0,
        },
        {
          value: 550,
          q: 'В какой пьесе Уильяма Шекспира главный герой произносит монолог "Быть или не быть?"',
          choices: ["«Фауст»", "«Гамлет»", "«Ромео и Джульетта»", "«Конь с розовой гривой»"],
          correct: 1,
        },
      ],
    },

  ],
});

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }, [key, val]);
  return [val, setVal];
}

function Cell({ disabled, value, onOpen, isFocused, setRef }) {
  return (
    <button
      ref={setRef}
      className={
        "cell" +
        (disabled ? " cell--done" : "") +
        (isFocused ? " cell--focus" : "")
      }
      disabled={disabled}
      onClick={onOpen}
      aria-disabled={disabled}
    >
      {disabled ? "—" : value}
    </button>
  );
}

export default function App() {
  const [board] = useState(initialBoard);
  const [done, setDone] = useLocalStorage("jp_done", {});
  const [teams, setTeams] = useLocalStorage("jp_teams", [
    { id: 1, name: "Команда 1", score: 0 },
    { id: 2, name: "Команда 2", score: 0 },
  ]);
  const [activeTeamId, setActiveTeamId] = useLocalStorage("jp_active", 1);

  // modal state
  const [openCell, setOpenCell] = useState(null); // {ci, qi}
  const [selectedOption, setSelectedOption] = useState(null);
  const [revealed, setRevealed] = useState(false);

  // focus grid
  const gridRefs = useRef([]);
  gridRefs.current = [];
  const setGridRef = (el) => el && gridRefs.current.push(el);
  const [focusIndex, setFocusIndex] = useState(0);

  const flatCells = useMemo(() => {
    const cells = [];
    board.categories.forEach((c, ci) => {
      c.questions.forEach((q, qi) => cells.push({ ci, qi }));
    });
    return cells;
  }, [board]);

  useEffect(() => {
    gridRefs.current[focusIndex]?.focus();
  }, [focusIndex, openCell]);

  useEffect(() => {
    const onKey = (e) => {
      if (openCell) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeModal();
        } else if (e.key === " ") {
          e.preventDefault();
          setRevealed(true);
        } else if (e.key === "Enter") {
          // Enter acts as confirm reveal if option selected, else reveal
          e.preventDefault();
          if (selectedOption == null) setRevealed((r) => !r);
        }
        return;
      }
      const cols = board.categories.length;
      const rows = board.categories[0].questions.length;
      const r = Math.floor(focusIndex / cols);
      const c = focusIndex % cols;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key))
        e.preventDefault();
      if (e.key === "ArrowLeft")
        setFocusIndex(() => Math.max(c - 1, 0) + r * cols);
      if (e.key === "ArrowRight")
        setFocusIndex(() => Math.min(c + 1, cols - 1) + r * cols);
      if (e.key === "ArrowUp")
        setFocusIndex(() => Math.max(r - 1, 0) * cols + c);
      if (e.key === "ArrowDown")
        setFocusIndex(() => Math.min(r + 1, rows - 1) * cols + c);
      if (e.key === "Enter" || e.key === " ") {
        const { ci, qi } = flatCells[focusIndex] || {};
        if (ci != null && qi != null && !isDone(ci, qi)) openModal(ci, qi);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusIndex, flatCells, board, openCell, selectedOption]);

  function isDone(ci, qi) {
    return !!done[`${ci}:${qi}`];
  }
  function markDone(ci, qi) {
    setDone((d) => ({ ...d, [`${ci}:${qi}`]: true }));
  }

  function openModal(ci, qi) {
    setOpenCell({ ci, qi });
    setSelectedOption(null);
    setRevealed(false);
  }
  function closeModal() {
    setOpenCell(null);
    setSelectedOption(null);
    setRevealed(false);
  }

  function addScore(delta) {
    setTeams((ts) =>
      ts.map((t) =>
        t.id === activeTeamId ? { ...t, score: t.score + delta } : t
      )
    );
  }

  function handleMarkCorrect() {
    if (!openCell) return;
    const { ci, qi } = openCell;
    const value = board.categories[ci].questions[qi].value;
    addScore(value);
    markDone(ci, qi);
    closeModal();
  }
  function handleMarkWrong() {
    if (!openCell) return;
    const { ci, qi } = openCell;
    const value = board.categories[ci].questions[qi].value;
    addScore(-value);
    markDone(ci, qi);
    closeModal();
  }

  function resetGame() {
    setDone({});
    setTeams((ts) =>
      ts.map((t, i) => ({ ...t, score: 0, name: `Team ${i + 1}` }))
    );
    setActiveTeamId(1);
  }

  const activeTeam = teams.find((t) => t.id === activeTeamId) || teams[0];

  return (
    <div className="app">
      <header className="top">
        <div/>
        <h1>{board.title}</h1>
        <div className="controls">
          <button className="ghost" onClick={resetGame}>
            Новая игра
          </button>
        </div>
      </header>

      {/* GRID */}
      <div className="grid" role="table" aria-label="Game Board">
        <div className="head" role="row">
          {board.categories.map((cat, idx) => (
            <div key={idx} className="headCell" role="columnheader">
              {cat.name}
            </div>
          ))}
        </div>

        {board.categories[0].questions.map((_, rowIdx) => (
          <div key={rowIdx} className="row" role="row">
            {board.categories.map((cat, colIdx) => {
              const q = cat.questions[rowIdx];
              const flatIdx = rowIdx * board.categories.length + colIdx;
              return (
                <Cell
                  key={colIdx}
                  value={q.value}
                  disabled={isDone(colIdx, rowIdx)}
                  onOpen={() => openModal(colIdx, rowIdx)}
                  isFocused={focusIndex === flatIdx}
                  setRef={setGridRef}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* TEAMS */}
      <section className="teams" id="teams">
        {teams.map((t) => (
          <div key={t.id} className={"team" + (t.id === activeTeamId ? " active" : "")} onClick={() => setActiveTeamId(t.id)}>
            <input className="teamName" value={t.name} onChange={(e)=>setTeams((ts)=>ts.map((x)=>x.id===t.id?{...x,name:e.target.value}:x))} />
            <div className="score">
              <button onClick={(e)=>{e.stopPropagation(); setTeams((ts)=>ts.map((x)=>x.id===t.id?{...x,score:x.score-50}:x));}}>-1</button>
              <strong>{t.score}</strong>
              <button onClick={(e)=>{e.stopPropagation(); setTeams((ts)=>ts.map((x)=>x.id===t.id?{...x,score:x.score+50}:x));}}>+1</button>
            </div>
          </div>
        ))}
        <button className="addTeam" onClick={()=>setTeams((ts)=>ts.length>=10?ts:[...ts,{id:(ts.at(-1)?.id||0)+1,name:`Team ${ts.length+1}`,score:0}])}>+ команда</button>
      </section>

      {/* MODAL */}
      {openCell && (
        (() => {
          const { ci, qi } = openCell;
          const item = board.categories[ci].questions[qi];
          const correctIndex = typeof item.correct === "number" ? item.correct : null;
          const opts = Array.isArray(item.choices) ? item.choices : Array.isArray(item.options) ? item.options : [];

          return (
            <div className="modalOverlay" onClick={closeModal}>
              <div className="modal" role="dialog" aria-modal="true" onClick={(e)=>e.stopPropagation()}>
                <div className="modalHead">
                  <div>{board.categories[ci].name} — {item.value}</div>
                  <button className="ghost" onClick={closeModal}>✕</button>
                </div>

                <div className="modalBody">
                  <div className="qa">
                    <div className="questionBlock">
                      <span className="label">Вопрос:</span>
                      <div className="questionText">{item.q}</div>
                    </div>

                    <div className="options">
                      {opts.map((opt, idx)=>{
                        const isSelected = selectedOption === idx;
                        const isCorrect = correctIndex === idx;
                        const cls = [
                          "option",
                          isSelected?"option--selected":"",
                          revealed && isCorrect?"option--correct":"",
                          revealed && isSelected && correctIndex != null && isSelected !== isCorrect?"option--wrong":"",
                        ].join(" ");
                        return (
                          <button key={idx} className={cls} onClick={()=>setSelectedOption(idx)} disabled={revealed}>{opt}</button>
                        )
                      })}
                    </div>

                    <div className="modalControls">
                      <button className="reveal" onClick={()=>setRevealed(true)} disabled={revealed}>Показать ответ</button>
                      <div className="judgeRow">
                        <button className="bad" onClick={handleMarkWrong}>Неверно (−{item.value})</button>
                        <button className="good" onClick={handleMarkCorrect}>Верно (+{item.value})</button>
                      </div>
                    </div>

                    {revealed && correctIndex != null && (
                      <div className="correctNote">Правильный ответ: {opts[correctIndex]}</div>
                    )}
                  </div>
                </div>

                <div className="modalFoot">
                  <div className="who">Активная команда: <strong>{activeTeam?.name}</strong></div>
                  <div className="hint">Выберите вариант, затем отметьте Верно/Неверно (либо просто нажмите Показать ответ).</div>
                </div>
              </div>
            </div>
          )
        })()
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap');

  * { box-sizing: border-box; }
  html, body, #root { 
    height: 100%; 
    margin: 0;
    padding: 0;
  }
    body {font-family: 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;}
  .app {
    min-height: 100vh;
    background: url(${desktopBg}) center/cover no-repeat;
    color: #fff; 
    display: flex; 
    flex-direction: column;
  }
  .top { 
    display:flex; 
    align-items:center; 
    justify-content:space-between; 
    padding:14px 16px; 
    text-align:center;
  }
  h1 { font-size: 25px; margin: 0 0 0 95px; }
  .controls .ghost { 
    background: #FFF; 
    border:1px solid rgba(255,255,255,.35); 
    color: #000; 
    padding:6px 10px; 
    border-radius:8px; 
    cursor:pointer; 
  }
  .controls .ghost:hover { border-color: #000; }

  .grid { 
    width: 100%; 
    max-width:1100px; 
    margin: 16px auto; 
    gap: 8px; 
    display:grid; 
    grid-template-rows: auto; 
    flex:1; 
    padding: 16px;
    border-radius: 12px;
  }
  .head { display:grid; grid-template-columns: repeat(5, 1fr); gap:8px; }
  .headCell { 
    background: #fff; 
    color: #000; 
    padding: 65px 10px 1px 10px;
    text-align:center; 
    font-weight:700; 
    border:2px solid #000; 
    text-transform:uppercase; 
  }
  .row { display:grid; grid-template-columns: repeat(5, 1fr); gap:8px; }
  .cell { 
    background: #fff;
    color: #000; 
    border:2px solid #000; 
    padding:22px 10px; 
    font-weight:900;  
    font-size:22px; 
    color: #000; 
    cursor:pointer; 
    outline:none; 
  }
  .cell:hover { background:#4A54AD; color: #FFF }
  .cell:disabled, .cell[aria-disabled="true"] { cursor:not-allowed; opacity:.4; color: #fff; }
  .cell--focus {}
  .cell--done { filter:saturate(.2) brightness(.9); }

  .teams { 
    display:flex; 
    flex-wrap:wrap; 
    gap:10px; 
    justify-content:center; 
    align-items:center; 
    padding:10px 16px 18px; 
    background: rgba(0, 0, 0, 0); 
      }
  .team { 
    display:flex; 
    gap:8px; 
    align-items:center; 
    background: #fff; 
    color: #fff; 
    border-radius:10px; 
    padding:8px; 
    cursor:pointer; 
    border:1px solid #000; 
  }
  .team.active { background: #4A54AD; }
  .teamName { width:140px; border:none; font-weight:700; background:transparent; }
  .teamName:focus { outline:none; border-bottom:1px dashed #333; }
  .score { display:flex; gap:8px; align-items:center; color: #000}
  .score button { background: #000; color: #fff; border:none; padding:4px 6px; border-radius:6px; cursor:pointer; }
  .addTeam { 
    background: #FFF; 
    color: #000; 
    border:1px dashed rgba(255,255,255,.5); 
    border-radius:10px; 
    padding:10px 12px; 
    cursor:pointer; 
  }

  .modalOverlay { 
    position:fixed; 
    inset:0; 
    background: rgba(74,84,173, 0.95); 
    display:flex; 
    align-items:center; 
    justify-content:center; 
    padding:10px; 
  }
  .modal { 
    background: rgba(255, 255, 255, 0.8); 
    border-radius:8px; 
    width:min(900px, 100%); 
    display:flex; 
    flex-direction:column; 
    max-height:90vh;
    color: #000
  }
  .modalHead { 
    display:flex; 
    justify-content:space-between; 
    align-items:center; 
    padding:10px 12px; 
    background: #rgba(255, 255, 255, 0.8); 
  }
  .modalHead .ghost { 
    background:transparent; 
    border:none; 
    color: #rgba(255, 255, 255, 0.8); 
    font-size:20px; 
    cursor:pointer; 
  }
  .modalBody { overflow:auto; padding:16px; }
  .qa { 
    display:flex; 
    flex-direction:column; 
    gap:16px; 
    text-align:center; 
    align-items:center; 
  }
  .questionBlock .label { 
    display:block; 
    opacity:.8; 
    font-size:12px; 
    text-transform:uppercase; 
    letter-spacing:.08em; 
    margin-bottom:6px; 
  }
  .questionText { 
    font-weight:700; 
    font-size:22px; 
    margin-bottom:6px; 
  }
  .options { 
    display:flex; 
    flex-direction:column; 
    gap:8px; 
    width:100%; 
    max-width:720px; 
  }
  .option { 
    padding:10px 12px; 
    border-radius:8px; 
    border: 1px solid rgba(0, 0, 0, 0.76); 
    background:rgba(255, 255, 255, 1); 
    color: #000; 
    cursor:pointer; 
    text-align:left; 
  }
  .option--selected { background: #4A54AD; color: #FFF }
  .option--correct { background: rgba(45,169,78,0.9); color:#fff; border-color: rgba(0,0,0,0.2); }
  .option--wrong { background: rgba(215,38,61,0.9); color:#fff; border-color: rgba(0,0,0,0.2); }
  .modalControls { 
    display:flex; 
    gap:12px; 
    align-items:center; 
    margin-top:12px; 
    flex-wrap:wrap; 
    justify-content:center; 
  }
  .reveal { 
    align-self:center; 
    border:1px solid #fff; 
    background:#FFF; 
    color: #000; 
    padding:8px 12px; 
    border-radius:8px; 
    cursor:pointer; 
  }
  .judgeRow { display:flex; gap:8px; }
  .actions .good, .good { 
    background: #2da94e; 
    border:none; 
    color: #000; 
    padding:8px 12px; 
    border-radius:8px; 
    cursor:pointer; 
    font-weight:700; 
  }
  .bad, .actions .bad { 
    background: #d7263d; 
    border:none; 
    color: #000; 
    padding:8px 12px; 
    border-radius:8px; 
    cursor:pointer; 
    font-weight:700; 
  }
  .modalFoot { 
    display:flex; 
    flex-wrap:wrap; 
    gap:8px; 
    align-items:center; 
    justify-content:space-between; 
    padding:12px; 
    background: #rgba(255, 255, 255, 0.8); 
  }
  .hint { opacity:0.85; }

  @media (max-width: 820px) {
    .cell { padding:16px 8px; font-size:18px; }
    .questionText { font-size:18px; }
    .option { font-size:14px; }
    .teamName { width:110px; }
  }
`}</style>
    </div>
  );
}
