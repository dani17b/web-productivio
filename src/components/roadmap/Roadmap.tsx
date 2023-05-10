import './roadmap.scss';

// Default variables for tasks' dots
const DOT_TASK_COLOR = '#8394c4';
const DOT_TASK_HEIGHT = 18;
const DOT_TASK_WIDTH = 18;
const SMALL_DOT_POSITION = 3;
// Default variables for levels' dots
const DOT_LEVEL_COLOR = '#1a3891';
const DOT_LEVEL_HEIGHT = 24;
const DOT_LEVEL_WIDTH = 24;
// Default small line's variables
const SMALL_LINE_POSITION = 11;

interface RoadmapProps {
  /**
   * Stores the date in which a task was finished or a level was upped
   */
  date?: string | Date;
  /**
   * Task's name
   */
  name: string;
  /**
   * Number of points the task is worth
   */
  difficulty?: number;
  /**
   * Changes the style depending on whether the element displayed is a task or a level up
   */
  bigStyle: boolean;
}

export const Roadmap = (props: RoadmapProps) => {
  const { date, name, difficulty, bigStyle } = props;

  // Sets the current date of the finished task or level up registered
  const finishDate = () => {
    if (date) {
      let today = new Date(date);
      let day = today.getDate().toString().padStart(2, '0');
      let month = (today.getMonth() + 1).toString().padStart(2, '0');
      let year = today.getFullYear();

      return `${day}/${month}/${year}`;
    } else return '';
  };

  // Sets the dot style depending on whether it is a task or a new level
  const dotType = () => {
    if (!bigStyle) {
      return {
        background: DOT_TASK_COLOR,
        width: DOT_TASK_WIDTH,
        height: DOT_TASK_HEIGHT,
        left: SMALL_DOT_POSITION,
      };
    } else {
      return {
        background: DOT_LEVEL_COLOR,
        width: DOT_LEVEL_WIDTH,
        height: DOT_LEVEL_HEIGHT,
      };
    }
  };

  // Sets the line's positions depending on whether it is for a task or a level
  const lineType = () => {
    if (!bigStyle) {
      return {
        left: SMALL_LINE_POSITION,
      };
    }
  };

  return (
    <div className="roadmap-container">
      <div className="roadmap-container__left-column">
        <div className="roadmap-container__date">{finishDate()}</div>
      </div>
      <div className="roadmap-container__center-column">
        <div className="roadmap-container__dot-line-container">
          <div
            data-testid="dot"
            className="roadmap-container__dot"
            style={dotType()}
          ></div>
          <div
            data-testid="line"
            className="roadmap-container__line"
            style={lineType()}
          ></div>
        </div>
      </div>
      <div className="roadmap-container__right-column">
        <div data-testid="task-name" className="roadmap-container__task-name">
          {name}
          <div className="roadmap-container__difficulty">
            {difficulty && ` ${difficulty} pts`}
          </div>
        </div>
      </div>
    </div>
  );
};
