import './userDetails.scss';

export interface UserDetailsProps {
  user: {
    username: string;
    description: string;
    score: number;
    img: string;
  };
}

export const UserDetails = (props: UserDetailsProps) => {
  const { user } = props;

  return (
    <div className="user-details">
      {/* TODO implementar el componente de la foto de prefil */}
      <div className="user-details__pic">
        <img src="../../../logo.svg" alt="UserImage" />
      </div>
      <div className="user-details__info">
        <div className="user-details__info__top">
          <div className="user-details__info__top__username-star">
            <p>{user.username}</p>
            <p>estrellas</p>
          </div>
          <div className="user-details__info__bottom">
            <p>{user.description}</p>
          </div>
        </div>

        <img className="__user-details-stars" src="" />
      </div>
    </div>
  );
};
