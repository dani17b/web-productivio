import './taskProgressBar.scss';

export interface TaskProgressProps {
    percentage: number,
    time: number
}

export const TaskProgressBar = (props: TaskProgressProps) => {

    const {percentage, time} = props;
  return (
    <div className="progress_bar_parent">
      <div className="progress_bar_child"  style={{width : percentage + '%'}}>
        {percentage >= 35 && <span>{percentage}% ({time}h)</span>}
      </div>
      {percentage < 35 && <span>{percentage}% ({time}h)</span>}
    </div>
  );
};
