import React from "react";
import "./userPhoto.scss";

interface UserPhotoProps {
  imageSrc: string;
  borderColor: string;
}

export const UserImage: React.FC<UserPhotoProps> = ({ imageSrc, borderColor }) => {
  const circleStyle = {
    borderColor: borderColor,
  };

  return (
    <div className="square">
    <div className="circle-image-container">
      <div className="circle" style={circleStyle}>
        <img src={imageSrc} alt="User" className="circle-image" />
      </div>
    </div>
    </div>
  );
};


