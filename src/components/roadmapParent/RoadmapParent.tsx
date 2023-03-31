import './roadmapParent.scss';
import { Roadmap } from 'lib-productivio';

//TO DO: change endDate (deadline) to finishDate -- API needs to be changed first
interface Task {
  id: number;
  name: string;
  endDate: Date;
  difficulty: string;
}
interface RoadmapParentProps {
  tasks: Task[];
}
export const RoadmapParent = (taskList: RoadmapParentProps) => {
  const PTS_PER_LEVEL = 200;

  /*Esta línea es para evitar el fallo que da al recibir la task vacía de la API*/
  let tasks = taskList.tasks.slice(1);
  tasks = tasks.sort(
    (a: Task, b: Task) => a.endDate.getTime() - b.endDate.getTime()
  );

  let fullRoadMap: JSX.Element[] = [];
  let totalPoints = 0;
  let level = 1;

  for (let i = 0; i < tasks.length; i++) {
    totalPoints += getPoints(tasks[i].difficulty);
    if (totalPoints % PTS_PER_LEVEL == 0 || level == 1) {
      fullRoadMap.push(
        <Roadmap key={`Level${level}`} name={`Level${level}`} bigStyle={true} />
      );
      level++;
    }
    fullRoadMap.push(
      <Roadmap
        key={tasks[i].id}
        name={tasks[i].name}
        difficulty={getPoints(tasks[i].difficulty)}
        bigStyle={false}
      />
    );
  }

  return <div className="roadmap-list">{fullRoadMap}</div>;
};

function getPoints(difficulty: string) {
  let points = 0;
  switch (difficulty) {
    case 'Fácil':
      return 50;
    case 'Medio':
      return 100;
    case 'Difícil':
      return 200;
    default:
      return 0;
  }
}
