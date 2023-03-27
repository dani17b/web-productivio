import {
  Comments,
  Likes,
  TaskProgressBar,
  TimeAgo,
  UserPhoto,
} from 'lib-productivio';
import './feedBlock.scss';

const date = new Date();

export interface FeedBlockProps {
  imageSrc: string;
  borderColor: string;
  username: string;
  description: string;
  taskProgessBarPercent?: any;
  totalLikes: number;
  comments: { user: string; comment: string }[];
}

export const FeedBlock = ({ feedProps }: { feedProps: FeedBlockProps }) => {
  const {
    imageSrc,
    borderColor,
    username,
    description,
    taskProgessBarPercent,
    totalLikes,
    comments,
  } = feedProps;

  const showProgressBar = () => {
    return taskProgessBarPercent > 0;
  };

  return (
    <div>
      <div className="feedblock">
        <div className="feedblock__user-photo">
          <UserPhoto imageSrc={imageSrc} borderColor={borderColor} />
        </div>
        <div className="feedblock__content">
          <div className="feedblock__content__username">{username}</div>
          <div className="feedblock__content__description">{description}</div>
          {showProgressBar() && (
            <div className="feedblock__content__bar">
              <TaskProgressBar
                percentage={taskProgessBarPercent}
                childBackgroundColor="yellow"
                parentBackgroundColor="black"
              />
            </div>
          )}
        </div>
        <div className="feedblock__time">
          <TimeAgo createdAt={date} />
        </div>
      </div>
      <hr />
      <div className="interactions">
        <div className="interactions__likes">
          <Likes totalLikes={totalLikes} />
        </div>
        <div className="interactions__comments">
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
};
