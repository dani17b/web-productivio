import { PostComment, VisualComments } from 'lib-productivio';

import './feedCommentsBlock.scss';

interface CommentProps {
  name: string;
  imageSrc: string;
  inputText: string;
}

interface VisualCommentsProps {
  imageSrc: string;
  photoBorderColor: string;
  username: string;
  comment: string;
}

export const FeedCommentsBlock = ({
  commentProps,
  visualCommentsProps,
  onPostClick,
}: {
  commentProps: CommentProps;
  visualCommentsProps: VisualCommentsProps[];
  onPostClick: () => void;
}) => {
  return (
    <div className="comments-container">
      <div className="postComment">
        <PostComment commentProps={commentProps} onClick={onPostClick} />
      </div>
      {visualCommentsProps && visualCommentsProps.map((visualCommentProps, index) => (
        <div className="visualComment" key={index}>
          <VisualComments commentProps={visualCommentProps} />
        </div>
      ))}
    </div>
  );
};
