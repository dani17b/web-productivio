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