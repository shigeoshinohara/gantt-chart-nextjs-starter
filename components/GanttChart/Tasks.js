import { useEffect, useRef } from 'react';

export default function Tasks({ tasks, setTasks, setTaskDurations }) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  /**
   * タスク削除処理
   * @param e
   */
  const handleDelete = (e) => {
    // 選択したタスクのIDを取得する
    const idNum = parseInt(e.target.getAttribute('data-task-id'));
    // タスク配列から該当のIDを除外して配列を作り直しStateに再設定
    const newTasks = tasks.filter((task) => task.id !== idNum);
    setTasks(newTasks);

    // 前回の状態を引数で受け取り、該当IDを除外して再度設定
    setTaskDurations((prevState) => {
      const newTaskDurations = prevState.filter(
        (taskDuration) => taskDuration.task !== idNum
      );
      return newTaskDurations;
    });
  };

  /**
   * タスク変更処理
   * @param e
   * @param i
   */
  const handleOnChange = (e, i) => {
    // 入力値を取得
    const { value } = e.target;

    // 対象のIDを取得
    const idNum = parseInt(e.target.getAttribute('data-task-id'));

    // 該当ID以外を取得して、最後に設定値を追加し、ID順にソートしてStateに再設定
    let newTasks = tasks.filter((task) => task.id !== idNum);
    newTasks.push({ id: idNum, name: value });
    newTasks = newTasks.sort((a, b) => a.id - b.id);
    setTasks(newTasks);
    // 対象のindex番号をuseRefに登録
    indexRef.current = i;
  };

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      // 選択した要素にフォーカスを戻す
      inputRef?.current[indexRef.current]?.focus();
    }
  });

  return (
    <div id="gantt-grid-container__tasks">
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>
      {tasks &&
        tasks.map((task, i) => (
          <div
            key={`${i}-${task?.id}-${task.name}`}
            className={'gantt-task-row'}
          >
            <input
              type="text"
              data-task-id={task?.id}
              value={task?.name}
              onChange={(e) => handleOnChange(e, i)}
              ref={(el) => (inputRef.current[i] = el)}
            />
            <button
              type={'button'}
              data-task-id={task?.id}
              onClick={handleDelete}
            >
              X
            </button>
          </div>
        ))}

      <style jsx>{`
        #gantt-grid-container__tasks {
          outline: 0.5px solid var(--color-outline);
        }

        .gantt-task-row {
          display: flex;
          outline: 0.5px solid var(--color-outline);
          text-align: center;
          height: var(--cell-height);
          border: none;
        }

        input {
          width: 127px;
          border: none;
          outline: none;
          background: none;
        }

        button {
          line-height: 0px;
          color: var(--color-orange);
          background: none;
          border-radius: 5px;
          border: none;
          transition: all 0.2s ease;
        }

        button:focus {
          outline: none;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}
