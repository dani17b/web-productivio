import './userDetails.scss';

export interface UserDetailsProps {
  user: { username: string; description: string; score: number; img: string };
}

export const UserDetails = (props: UserDetailsProps) => {
  const { user } = props;

  return (
    <div className="user-details">
      <img className="user-details__pic" src={user.img} alt="UserImage" />
      <div className="user-details__username">
        <p>{user.username}</p>
      </div>
      <p>{user.description}</p>
      <img className="__user-details-stars" src="" />
    </div>
  );
};
