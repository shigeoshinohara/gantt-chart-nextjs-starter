import { useState, useEffect } from 'react';
import { client } from '../../utils/fetchWrapper';
import { error } from 'next/dist/build/output/log';
import Grid from './Grid';
import Tasks from './Tasks';
import TimeTable from './TimeTable';
import Settings from './Settings';
import AddTask from './AddTask';
import AddTaskDuration from './AddTaskDuration';
import TimeRange from './TimeRange';
export default function GanttChart() {
  const [tasks, setTasks] = useState(null);
  const [taskDurations, setTaskDurations] = useState(null);
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: '2023',
    toSelectMonth: 1,
    toSelectYear: '2023',
  });

  useEffect(() => {
    client('data.json').then(
      (data) => {
        setTasks(data?.tasks);
        setTaskDurations(data?.taskDurations);
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }, []);

  return (
    <div id="gantt-container">
      <style jsx>{`
        #gantt-container {
          --color-text: #272a2e;
          --color-primary-dark: #0195e4;
          --color-primary-light: #9ddcff;
          --color-secondary: #4be35a;
          --color-tertiary: #f7f7f7;
          --color-orange: #ef5350;
          --color-outline: #e9eaeb;
          --border-radius: 5px;
          --cell-height: 40px;
          padding: 1rem;
        }
      `}</style>
      <Grid>
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setTaskDurations={setTaskDurations}
        />
        <TimeTable
          timeRange={timeRange}
          tasks={tasks}
          taskDurations={taskDurations}
          setTaskDurations={setTaskDurations}
        />
      </Grid>
      <Settings>
        <AddTask setTasks={setTasks} />
        <AddTaskDuration tasks={tasks} setTaskDurations={setTaskDurations} />
        <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      </Settings>
    </div>
  );
}
