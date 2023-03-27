import React from 'react';
import { Header, NavBar } from 'lib-productivio';
import { FeedBlock, FeedBlockProps } from 'src/components/feedBlock/FeedBlock';
import './home.scss';

export const Home = () => {
  const feedProps1: FeedBlockProps = {
    imageSrc:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    borderColor: 'red',
    username: 'Juanito33',
    description: 'Crear FeedPage',
    taskProgessBarPercent: 70,
    totalLikes: 10,
    comments: [
      { user: 'usuario1', comment: 'comentario 1' },
      { user: 'usuario2', comment: 'comentario 2' },
    ],
  };

  const feedProps2: FeedBlockProps = {
    imageSrc:
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    borderColor: 'blue',
    username: 'FulanitoGUAUGUAU',
    description: 'Que hay!!',
    totalLikes: 10,
    comments: [
      { user: 'usuario3', comment: 'comentario 3' },
      { user: 'usuario4', comment: 'comentario 4' },
    ],
  };

  const feedPropsArray = [
    feedProps1,
    feedProps2,
    feedProps1,
    feedProps2,
    feedProps2,
    feedProps2,
    feedProps1,
    feedProps2,
    feedProps2,
  ];

  return (
    <>
      <Header title="Productivio" count={0} />
      <div className="content">
        {feedPropsArray.map((feedProps, index) => (
          <FeedBlock key={index} feedProps={feedProps} />
        ))}
      </div>
      <NavBar />
    </>
  );
};
