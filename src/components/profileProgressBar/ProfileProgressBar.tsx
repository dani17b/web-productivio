import React from 'react';
import './profileProgressBar.scss';

interface ProgressBarProps {
  completed: number; // The percentage completed
  bgColor: string; // The background color of the progress bar
  completedColor: string; // The color of the completed progress bar
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
