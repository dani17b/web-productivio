// @ts-nocheck
import { AxiosRequestConfig } from 'axios';
import { AXIOS_MOCK_CONFIG } from 'src/config/Config';
import apiDefinitionYml from '../../config/api.json';
import { IndexedDB } from './indexeddb/IndexedDB';

const GET_RESPONSE_OK = 200;
const POST_RESPONSE_OK = 201;

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
    default:
      return data;
  }
};

const getRefSchema = (refKey: string) => {
  const refKeyParts = refKey.split('/');
  const responseSchema: any =
    apiDefinitionYml.components.schemas[refKeyParts[refKeyParts.length - 1]]
      .properties;

  return responseSchema;
};

const getResponseObject = (responseSchema: any) => {
  return Object.keys(responseSchema).reduce((acc: any, key: string) => {
    const responseSchemaItem = responseSchema[key];
    // TODO extrapolar informacion enviada
    if (responseSchemaItem.$ref) {
      const refSchema = getRefSchema(responseSchemaItem.$ref);
      acc[key] = getResponseObject(refSchema);
      return acc;
    }

    if (responseSchemaItem.enum) {
      acc[key] = responseSchemaItem.enum[0];
      return acc;
    }

    if (responseSchemaItem.type == 'array') {
      if (responseSchemaItem.items.$ref) {
        const refSchema = getRefSchema(responseSchemaItem.items.$ref);
        acc[key] = [getResponseObject(refSchema)];
      }
      return acc;
    }

    acc[key] = responseSchemaItem.example;

    return acc;
  }, {});
};

const getSampleResponse = (url: string, method: string, data: object) => {
  const pathDefinition = apiDefinitionYml.paths[url];
  const methodDefinition: any = pathDefinition[method.toLowerCase()];

  let responseCode;
  switch (method.toLowerCase()){
    case 'get':
      responseCode = GET_RESPONSE_OK;
      break;
    case 'post':
      responseCode = POST_RESPONSE_OK;
      break;
    default:
      responseCode = 400;
  }

  const responseOKContent =
    methodDefinition.responses[responseCode].content['application/json'].schema['$ref'];

  const responseSchema: any = getRefSchema(responseOKContent);

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
        // TODO devolver sin mas la respuesta de ejemplo
        getResponse(url, method, interpolatedResponse).then((res) => {
          setTimeout(() => {
            resolve({
              data: res,
            });
          }, 2000);
        });

        // TODO en este caso se generara un id
      } else {
        setTimeout(() => {
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
