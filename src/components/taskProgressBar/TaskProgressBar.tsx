import './taskProgressBar.scss';

export interface TaskProgressProps {
    percentage: number,
    time: number
}

const TEXT_LIMIT = 35;

export const TaskProgressBar = (props: TaskProgressProps) => {

    const {percentage, time} = props;
  return (
    <div className="progress_bar_parent">
      <div className="progress_bar_child"  style={{width : percentage + '%'}}>
        {percentage >= TEXT_LIMIT && <span>{percentage}% ({time}h)</span>}
      </div>
      {percentage < TEXT_LIMIT && <span>{percentage}% ({time}h)</span>}
    </div>
  );
};
