export const responseToTeamDropdownProps = (response: any, bgColor: string) => {
  return {
    title: response.name,
    userInfoProps: response.workers.map((worker: any) => {
      return {
        user: {
          username: worker.name,
          description: worker.description,
          userColor: worker.userColor,
          userImg: worker.userPicUrl,
        },
        backgroundColor: brightenHex(bgColor),
        textColor: 'black',
      }
    }),
     bgColor: bgColor,
  };
};



function brightenHex(hexColor: string) {
  // parse the hex color to RGB values
  let red = parseInt(hexColor.substring(1, 3), 16);
  let green = parseInt(hexColor.substring(3, 5), 16);
  let blue = parseInt(hexColor.substring(5, 7), 16);

  // calculate the new, brighter RGB values
  let brightenedRed = Math.round(Math.min(255, red * 1.5));
  let brightenedGreen = Math.round(Math.min(255, green * 1.5));
  let brightenedBlue = Math.round(Math.min(255, blue * 1.5));

  // convert the new RGB values back to a hex color string
  let brightenedHex = '#' + brightenedRed.toString(16).padStart(2, '0') + brightenedGreen.toString(16).padStart(2, '0') + brightenedBlue.toString(16).padStart(2, '0');

  return brightenedHex;
}
