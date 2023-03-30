import { pathToRegexp } from 'path-to-regexp';

export const getQueryParams = (url: string) => {
  const urlParts = url.split('?');
  if (urlParts.length > 1) {
    const queryPath = urlParts[1];
    const queryPathParams = queryPath.split('&');

    const params: any = {};
    for (let i = 0; i < queryPathParams.length; i++) {
      const queryPathParam = queryPathParams[i].split('=');

      params[queryPathParam[0]] = queryPathParam[1];
    }

    return params;
  }

  return {};
};

export const extractPathParams = (url: string, urlWithParams: string) => {
  let params: any = {};
  const urlParts = url.split('/');
  const urlWithParamsParts = urlWithParams.split('/');

  for (let i = 0; i < urlParts.length; i++) {
    let urlPart = urlParts[i];
    let urlWithParamsPart = urlWithParamsParts[i];

    if (urlPart.startsWith('{')) {
      const paramName = urlPart.substring(1, urlPart.length - 1);
      params[paramName] = urlWithParamsPart;
    }
  }
  
  return params;
};

export const getPathDefinition = (url: string, pathsDefinitions: any) => {
  const pathKeys = Object.keys(pathsDefinitions);

  for (let i = 0; i < pathKeys.length; i++) {
    const pathKey = pathKeys[i];

    const regexp = pathToRegexp(
      pathKey
        .replace(new RegExp('{', 'g'), ':')
        .replace(new RegExp('}', 'g'), ''),
      []
    );
    if (regexp.exec(url)) {
      return {
        params: extractPathParams(pathKey, url),
        definition: pathsDefinitions[pathKey],
      };
    }
  }

  return null;
};

export const getResponseCode = (responseCodes: string[], status: string) => {
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
