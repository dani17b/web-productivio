export const responseToTeamDropdownProps = (response: any, bgColor: string) => {
  return {
    title: response.name,
    data: response.workers.map((worker: any) => {
      return {
        username: worker.name,
        description: worker.description,
        profileColor: worker.userColor,
        userImg: worker.userPicUrl,
      };
    }),
    bgColor: bgColor,
  };
};

export const test = {
  title: 'EQUIPO A',
  data: [
    {
      username: 'JohnDoe',
      description: 'Software Engineer',
      profileColor: '#FF5733',
      userImg:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
    },
    {
      username: 'JaneSmith',
      description: 'Graphic Designer',
      profileColor: '#F5B041',
      userImg:
        'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
    },
    {
      username: 'BobJohnson',
      description: 'Product Manager',
      profileColor: '#48C9B0',
      userImg:
        'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ],
  bgColor: '#86C4D1',
};
