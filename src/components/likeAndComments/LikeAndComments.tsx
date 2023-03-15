import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import './likeAndComments.scss';

export const LikeAndComments = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const fillAnimation = useSpring({
    opacity: isLiked ? 1 : 0,
  });

  const handleLikeClick = () => {
    let likes = numberOfLikes;
    if (!isLiked) {
      likes += 1;
    } else {
      likes -= 1;
    }
    setNumberOfLikes(likes);
    setIsLiked(!isLiked);
  };

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="like-and-comments-container">
      <div className="like-and-comments">
        <div className="like-container" onClick={handleLikeClick}>
          <animated.span className={`heart ${isLiked ? '--liked' : ''}`}>
            <animated.div
              className={`fill ${isLiked ? '--filled' : ''}`}
              style={fillAnimation}
            />
          </animated.span>
          {numberOfLikes} Likes
        </div>
        <div className="comment-toggle-container">
          <span className="comment-icon">{showComments ? '🔽' : '💬'}</span>
          <span className="comment-text" onClick={handleCommentToggle}>
            Show Comments
          </span>
        </div>
      </div>
      {showComments && (
        <div className="comments-container">
          {/* Aquí irían los comentarios */}
          <p>Comment 1</p>
          <p>Comment 2</p>
        </div>
      )}
    </div>
  );
};
