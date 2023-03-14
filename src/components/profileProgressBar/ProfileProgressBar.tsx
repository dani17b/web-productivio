import React from 'react';
import './profileProgressBar.scss';

interface ProgressBarProps {
  /**
   * The percentage completed
   */
  completed: number;
  /**
   * The background color of the progress bar
   */
  bgColor: string;
  /**
   * The color of the completed progress bar
   */
  completedColor: string;
}

const ProfileProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  bgColor,
  completedColor,
}) => {
  return (
    <div className="progress-bar" style={{ backgroundColor: bgColor }}>
      <div
        className="progress-bar-completed"
        style={{
          width: `${completed}%`,
          backgroundColor: completedColor,
        }}
      ></div>
    </div>
  );
};

export default ProfileProgressBar;
