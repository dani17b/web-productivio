export const createIdbDef = (apiDefinition: any) => {
  const IDB_DEFINITION: any = {};

  const pathsKeys = Object.keys(apiDefinition.paths);
  for (let i = 0; i < pathsKeys.length; i++) {
    const pathKey = pathsKeys[i];
    const objectKey = pathKey.split('/')[1];
    const pathDefinition = apiDefinition.paths[pathKey];

    let objectDefinition = IDB_DEFINITION[objectKey] || {
      key: 'id',
      indexes: [],
    };

    if (pathDefinition.get && pathDefinition.get.parameters) {
      for (let j = 0; j < pathDefinition.get.parameters.length; j++) {
        const pathDefinitionParameter = pathDefinition.get.parameters[j];

        if (
          objectDefinition.indexes.indexOf(pathDefinitionParameter.name) === -1
        ) {
          objectDefinition.indexes = objectDefinition.indexes.concat(
            pathDefinitionParameter.name
          );
        }
      }
    }

    IDB_DEFINITION[objectKey] = objectDefinition;
  }

  return IDB_DEFINITION;
};
