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
      };
    }),
    bgColor: bgColor,
  };
};

function brightenHex(hexColor: string) {
  const MAX_COLOR_VALUE = 255;
  const BRIGHTNESS_FACTOR = 1.5;
  const HEX_LENGTH = 2;
  const COLOR_BYTES = 16;

  // parse the hex color to RGB values
  /* eslint-disable */
  let red = parseInt(hexColor.substring(1, 3), COLOR_BYTES);
  let green = parseInt(hexColor.substring(3, 5), COLOR_BYTES);
  let blue = parseInt(hexColor.substring(5, 7), COLOR_BYTES);
  /* eslint-enable */

  // calculate the new, brighter RGB values
  let brightenedRed = Math.round(
    Math.min(MAX_COLOR_VALUE, red * BRIGHTNESS_FACTOR)
  );
  let brightenedGreen = Math.round(
    Math.min(MAX_COLOR_VALUE, green * BRIGHTNESS_FACTOR)
  );
  let brightenedBlue = Math.round(
    Math.min(MAX_COLOR_VALUE, blue * BRIGHTNESS_FACTOR)
  );

  // convert the new RGB values back to a hex color string
  let brightenedHex = `#${brightenedRed
    .toString(COLOR_BYTES)
    .padStart(HEX_LENGTH, '0')}${brightenedGreen
    .toString(COLOR_BYTES)
    .padStart(HEX_LENGTH, '0')}${brightenedBlue
    .toString(COLOR_BYTES)
    .padStart(HEX_LENGTH, '0')}`;

  return brightenedHex;
}
