const React = require('react');
const NotFound = require('../notFound/NotFound').NotFound;
const LibProductivio = require('lib-productivio');

interface ComponentListItem {
  name: string;
  component: JSX.Element;
}

export const componentList: ComponentListItem[] = [
  {
    name: 'Not Found',
    component: React.createElement(NotFound, {
      key: 1,
      message: 'Hello World',
    }),
  },
  {
    name: 'Likes',
    component: React.createElement(LibProductivio.Likes, {
      totalLikes: 10,
      likedByMe: true,
    }),
  },
  {
    name: 'Comments',
    component: React.createElement(LibProductivio.Comments, { 
      postId: 1,
    }),
  },
  {
    name: 'TaskProgressBar',
    component: React.createElement(LibProductivio.TaskProgressBar),
  },
];

