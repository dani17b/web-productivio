import {
  Comments,
  Likes,
  TaskProgressBar,
  TimeAgo,
  UserPhoto,
} from 'lib-productivio';
import './feedBlock.scss';

export interface FeedBlockProps {
  imageSrc: string;
  borderColor: string;
  username: string;
  description: string;
  taskProgessBarPercent?: any;
  totalLikes: number;
  createdAt: string;
  comments: { user: string; comment: string }[];
  onPostClick: () => void;
}

export const FeedBlock = (feedProps: FeedBlockProps) => {
  const {
    imageSrc,
    borderColor,
    username,
    description,
    taskProgessBarPercent,
    totalLikes,
    comments,
    createdAt,
    onPostClick,
  } = feedProps;

  const date = new Date(createdAt);

  const showProgressBar = () => {
    return taskProgessBarPercent > 0;
  };

  return (
    <div className="block">
      <div className="feedblock">
        <div className="feedblock__user-photo">
          <UserPhoto imageSrc={imageSrc} borderColor={borderColor} />
        </div>
        <div className="feedblock__content">
          <div className="feedblock__content__username">{username}</div>
          <div className="feedblock__content__description">{description}</div>
          {showProgressBar() && (
            <div className="feedblock__content__bar">
              <TaskProgressBar percentage={taskProgessBarPercent} />
            </div>
          )}
        </div>
        <div className="feedblock__time">
          <TimeAgo createdAt={date} />
        </div>
      </div>
      <div className="interactions">
        <div className="interactions__comments">
          <Comments
            commentProps={{
              name: username,
              imageSrc,
              inputText: '',
            }}
            visualCommentsProps={comments.map((comment) => ({
              imageSrc,
              photoBorderColor: borderColor,
              username: comment.user,
              comment: comment.comment,
            }))}
            onPostClick={onPostClick}
          />
        </div>
        <div className="interactions__likes">
          <Likes totalLikes={totalLikes} />
        </div>
      </div>
      <hr />
    </div>
  );
};