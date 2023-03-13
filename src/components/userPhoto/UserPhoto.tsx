import React from "react";
import "./UserPhoto.scss";

interface Props {
  imageSrc: string;
  borderColor: string;
}

export const UserImage: React.FC<Props> = ({ imageSrc, borderColor }) => {
  const circleStyle = {
    borderColor: borderColor,
  };

  return (
    <div className="Cuadrado">
    <div className="circle-image-container">
      <div className="circle" style={circleStyle}>
        <img src={imageSrc} alt="User" className="circle-image" />
      </div>
    </div>
    </div>
  );
};


