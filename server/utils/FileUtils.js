const fs = require('fs-extra');
const path = require('path');

const getComponent = (directory, baseDir, componentName, type) => {
  const dirContent = fs.readdirSync(directory);

  const componentInfo = {
    name: componentName,
    path: `${type}/${baseDir}`,
    files: [],
    type,
  };

  for (let i = 0; i < dirContent.length; i++) {
    let dirContentItem = dirContent[i];

    componentInfo.files.push(dirContentItem);
  }

  return componentInfo;
};

const getFiles = (directory, type) => {
  const components = [];
  const baseDir = path.join(directory, type);
  const dirContent = fs.readdirSync(baseDir);

  for (let i = 0; i < dirContent.length; i++) {
    const dirItem = dirContent[i];
    const componentName = dirItem.slice(0, 1).toUpperCase() + dirItem.slice(1);

    components.push(
      getComponent(path.join(baseDir, dirItem), dirItem, componentName, type)
    );
  }

  return components;
};

module.exports = {
  getFiles,
};
