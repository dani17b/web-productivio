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
          axios: path.resolve('./src/lib/axios'),
          'axios-original': path.resolve('./node_modules/axios'),
        },
      },
    },
  ],
};
