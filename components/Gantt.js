import { BryntumGantt } from '@bryntum/gantt-react';

import React from 'react';

const Gantt = ({ ganttRef, ...props }) => {
  return <BryntumGantt {...props} ref={ganttRef}></BryntumGantt>;
};

export default Gantt;

// export default function Gantt({ ganttRef, ...props }) {
//   return <BryntumGantt {...props} ref={ganttRef} />;
// }
