import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import './likeAndComments.scss';

export const LikeAndComments = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  const fillAnimation = useSpring({
    opacity: isLiked ? 1 : 0
  });

  const handleClick = () => {
    if (isLiked) {
      setNumberOfLikes(numberOfLikes - 1);
    } else {
      setNumberOfLikes(numberOfLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="like-and-comments-container">
      <div className="like-and-comments" onClick={handleClick}>
        <animated.span
          className={`heart ${isLiked ? '--liked' : ''}`}
          style={{ position: 'relative' }}
        >
          <animated.div className={`fill ${isLiked ? '--filled' : ''}`} style={fillAnimation} />
        </animated.span>
        {numberOfLikes} Likes
      </div>
      <div className="comment-container">
        <span className="comment-icon">💬</span>
        <span className="comment-text">Ver Comentarios</span>
      </div>
    </div>
  );
};




