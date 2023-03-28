// @ts-nocheck
import { AxiosRequestConfig } from 'axios';
import { AXIOS_MOCK_CONFIG } from 'src/config/Config';
import apiDefinitionYml from '../../config/api.json';
import { IndexedDB } from './indexeddb/IndexedDB';

const getResponse = async (url: string, method: string, data: object) => {
  const db = await IndexedDB.getDB(window.DB_INFO.name, window.DB_INFO.version);

  const objectKey = url.split('/')[1];

  switch (method) {
    case 'POST':
      let lastKey = await IndexedDB.getLastKey(db, objectKey);

      const dataToInsert = {
        ...data,
        id: lastKey ? lastKey + 1 : 1,
      };

      IndexedDB.put(db, objectKey, dataToInsert);

      return dataToInsert;
    case 'GET':
      const responseData = await IndexedDB.findByFilters(db, objectKey, {});

      if(responseData.length == 0){
        return [data];
      }

      return responseData;
    default:
      return;
  }
};

const getRefSchema = (componentDefinition: any, refKeyParts: string[]) => {
  if (refKeyParts[0] == '#') {
    return getRefSchema(componentDefinition, refKeyParts.slice(1));
  }

  if (refKeyParts.length > 1) {
    return getRefSchema(
      componentDefinition[refKeyParts[0]],
      refKeyParts.slice(1)
    );
  }

  return componentDefinition[refKeyParts[0]].properties;
};

const getResponseObject = (responseSchema: any) => {
  return Object.keys(responseSchema).reduce((acc: any, key: string) => {
    const responseSchemaItem = responseSchema[key];
    // TODO extrapolar informacion enviada
    if (responseSchemaItem.$ref) {
      const refSchema = getRefSchema(
        apiDefinitionYml,
        responseSchemaItem.$ref.split('/')
      );
      acc[key] = getResponseObject(refSchema);
      return acc;
    }

    if (responseSchemaItem.enum) {
      acc[key] = responseSchemaItem.enum[0];
      return acc;
    }

    if (responseSchemaItem.type == 'array') {
      if (responseSchemaItem.items.$ref) {
        const refSchema = getRefSchema(
          apiDefinitionYml,
          responseSchemaItem.items.$ref.split('/')
        );
        acc[key] = [getResponseObject(refSchema)];
      }
      return acc;
    }

    acc[key] = responseSchemaItem.example;

    return acc;
  }, {});
};

const getResponseCode = (responseCodes: string[], status: string) => {
  for (let i = 0; i < responseCodes.length; i++) {
    let responseCode = responseCodes[i];
    if (responseCode.startsWith('2') && status == 'OK') {
      return responseCode;
    }

    if (responseCode.startsWith('4') && status == 'FAIL') {
      return responseCode;
    }
  }

  return 'default';
};

const getSampleResponse = (url: string, method: string, data: object) => {
  const pathDefinition = apiDefinitionYml.paths[url];
  const methodDefinition: any = pathDefinition[method.toLowerCase()];

  const responseCode = getResponseCode(
    Object.keys(methodDefinition.responses),
    'OK'
  );

  const responseContentSchema =
    methodDefinition.responses[responseCode].content['application/json'].schema;

  const responseOKContent =
    responseContentSchema.type == 'array'
      ? responseContentSchema.items.$ref
      : responseContentSchema.$ref;

  const responseSchema: any = getRefSchema(
    apiDefinitionYml,
    responseOKContent.split('/')
  );

  const response = getResponseObject(responseSchema);

  return response;
};

export default {
  request: (requestConfig: AxiosRequestConfig) => {
    // TODO buscar el path por url
    const { url, method, data } = requestConfig;

    return new Promise((resolve, reject) => {
      let interpolatedResponse = getSampleResponse(url, method, data);
      const ignoredToStore = AXIOS_MOCK_CONFIG.ignoreStore;

      if (ignoredToStore.indexOf(url) == -1) {
        // En caso de que no se ignore el procesado con IndexedDB se gestiona con la BBDD
        getResponse(url, method, interpolatedResponse).then((res) => {
          console.log('--------------------------------------------------------------------');
          console.log(`${method} ${url} ${data ? '\n' + JSON.stringify(data, null, 2) : ''}`);
          console.log(res);
          console.log('--------------------------------------------------------------------');
          
          setTimeout(() => {
            resolve({
              data: res,
            });
          }, 2000);
        });
      } else {
        // En caso se ser ignorado se devuelve la respuesta en plano
        setTimeout(() => {
          console.log(`${method} ${url} ${data ? '\n' + JSON.stringify(data, null, 2) : ''}`);
          resolve({
            data: interpolatedResponse,
          });
        }, 2000);
      }
    });

    // Pasar parametros y crear una promise de respuesta, ver de procesar la url
    // y generar una estructura mock con la respuesta que sea customizable
    // Cargar esta info en indexed db para ser mas agiles y mantener algo en el contexto
    // Si se hace un post a objeto, crear el objeto, un list filtra por los
    // query o el path, el put modifica y el delete borra
    // Permitir volcar la indexeddb a objeto y exportarlo
  },
};
