const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        unsafeAllowModulesOutsideOfSrc: true,
        aliases: {
          react: path.resolve('./node_modules/react'),
        },
      },
    },
  ],
};
