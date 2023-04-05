import { PostComment, VisualComments } from 'lib-productivio';

import './feedCommentsBlock.scss';

interface CommentProps {
  name: string;
  imageSrc: string;
  inputText: string;
}

export const FeedCommentsBlock = ({
  commentProps,
  visualCommentsProps,
  onPostClick,
}: {
  commentProps: CommentProps;
  visualCommentsProps: any[];
  onPostClick: () => void;
}) => {
  
  return (
    <div className="comments-container">
      <div className="postComment">
        <PostComment commentProps={commentProps} onClick={onPostClick} />
      </div>
      {visualCommentsProps &&
        visualCommentsProps.map((comments, index) => (
          <div className="visualComment" key={index}>
            <VisualComments
              comment={comments.content}
              imageSrc={comments.userPicUrl}
              username={comments.username}
              photoBorderColor={comments.userColor}
            />
          </div>
        ))}
    </div>
  );
};
