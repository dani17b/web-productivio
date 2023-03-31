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

const PTS_PER_LEVEL = 200;
const PTS_EASY = 50;
const PTS_MEDIUM = 100;
const PTS_HARD = 200;

export const RoadmapParent = (taskList: RoadmapParentProps) => {
  let { tasks } = taskList;
  tasks = tasks.sort(
    (a: Task, b: Task) =>
      new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
  );

  let fullRoadMap: JSX.Element[] = [];
  let totalPoints = 0;
  let level = 1;

  for (let i = 0; i < tasks.length; i++) {
    if (totalPoints >= (level - 1) * PTS_PER_LEVEL || level == 1) {
      fullRoadMap.push(
        <Roadmap
          key={`Level${level}`}
          name={`Nivel ${level}`}
          bigStyle={true}
          date={tasks[i].endDate}
        />
      );
      level++;
    }

    totalPoints += getPoints(tasks[i].difficulty);

    fullRoadMap.push(
      <Roadmap
        key={tasks[i].id}
        name={tasks[i].name}
        difficulty={getPoints(tasks[i].difficulty)}
        bigStyle={false}
        date={tasks[i].endDate}
      />
    );
  }

  return <div className="roadmap-list">{fullRoadMap}</div>;
};

function getPoints(difficulty: string) {
  
  switch (difficulty) {
    case 'Fácil':
      return PTS_EASY;
    case 'Medio':
      return PTS_MEDIUM;
    case 'Difícil':
      return PTS_HARD;
    default:
      return 0;
  }
}
