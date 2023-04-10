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
  onClick: () => void;
  likedByMe: boolean;
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
    onClick,
    likedByMe
  } = feedProps;

  const date = new Date(createdAt);

  const showProgressBar = () => {
    return taskProgessBarPercent > 0;
  };

  return (
    <div className="block">
      <div className="feedblock">
        <div className="feedblock__user-photo">
          <UserPhoto imageSrc={imageSrc} borderColor={borderColor}/>
        </div>
        <div className="feedblock__content">
          <div className="feedblock__content__username" data-testid="username">{username}</div>
          <div className="feedblock__content__description" data-testid="user-description">{description}</div>
          {showProgressBar() && (
            <div className="feedblock__content__bar" data-testid="progress-bar">
              <TaskProgressBar percentage={taskProgessBarPercent} />
            </div>
          )}
        </div>
        <div className="feedblock__time">
          <TimeAgo createdAt={date} />
        </div>
      </div>
      <div className="interactions">
        <div className="interactions__likes" data-testid="user-likes">
          <Likes likedByMe={likedByMe} totalLikes={totalLikes} />
        </div>
        <div className="interactions__comments" data-testid="user-comments">
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
            onPostClick={() => onClick()}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};
