import { Header } from 'lib-productivio';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';
import { FeedCommentsBlock } from 'src/components/feedCommentsBlock/FeedCommentsBlock';
import './homeComments.scss';

export const HomeComments = () => {
  const commentProps = {
    name: 'John Doe',
    imageSrc: 'https://album.mediaset.es/eimg/2023/03/05/lluvia-de-memes-tras-el-podio-conseguido-por-fernando-alonso-en-barein_ef74.jpg?w=1200&h=900',
    inputText: '',
  };

  const visualCommentsProps = [
    {
      imageSrc: 'https://album.mediaset.es/eimg/2023/03/05/lluvia-de-memes-tras-el-podio-conseguido-por-fernando-alonso-en-barein_ef74.jpg?w=1200&h=900',
      photoBorderColor: 'red',
      username: 'Jane Smith',
      comment: 'Lorem ipsum dolor sit amet.',
    },
    {
      imageSrc: 'https://album.mediaset.es/eimg/2023/03/05/lluvia-de-memes-tras-el-podio-conseguido-por-fernando-alonso-en-barein_ef74.jpg?w=1200&h=900',
      photoBorderColor: 'blue',
      username: 'Bob Johnson',
      comment: 'Consectetur adipiscing elit.',
    },
  ];

  const handlePostClick = () => {
    console.log('Post clicked!');
  };

  return (
    <div>
      <div className="home">
        <div className="home__header">
          <Header count={0} title="Productivio" />
        </div>

        <div className="home__comments">
          <FeedCommentsBlock
            commentProps={commentProps}
            visualCommentsProps={visualCommentsProps}
            onPostClick={handlePostClick}
          />
        </div>

        <div className="home__navbar">
          <WebNavBar />
        </div>
      </div>

      <div className="home__loading">
        {/* <Loading autoplay={true} loop={true}/> */}
      </div>
    </div>
  );
};
