import { useState } from 'react';
import AddButton from './AddButton';

export default function AddTask() {
  const [task, setTask] = useState('');

  function onChange(e) {
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTask('');
  }

  return (
    <form id="add-task" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input value={task} onChange={onChange} placeholder="add task name" />
      <AddButton />
      <style jsx>{`
        #add-task {
          margin-right: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
        }

        h2 {
          font-size: 1.5rem;
        }

        form {
          padding: 1rem;
        }

        form > * {
          display: flex;
          align-items: center;
        }

        input {
          height: var(--cell-height);
          padding: 5px 7px;
          margin: 1rem 0;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-family: Lato, 'Open Sans', Helvetica, Arial, sans-serif;
          font-size: 13px;
        }
      `}</style>
    </form>
  );
}
