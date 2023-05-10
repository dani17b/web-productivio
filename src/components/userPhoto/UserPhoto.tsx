import React from 'react';
import './userPhoto.scss';

interface UserPhotoProps {
  imageSrc: string;
  borderColor: string;
}

export const UserPhoto: React.FC<UserPhotoProps> = ({
  imageSrc,
  borderColor,
}) => {
  const circleStyle = {
    borderColor: borderColor,
  };

  return (
    <div className="user-photo">
      <div className="user-photo__circle-image-container">
        <div className="user-photo__circle" style={circleStyle} >
          <img src={imageSrc} alt="User" className="user-photo__circle-image" data-testid="user-photo"/>
        </div>
      </div>
    </div>
  );
};
