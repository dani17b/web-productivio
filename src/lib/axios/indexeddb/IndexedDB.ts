import { createIdbDef } from './utils/SchemaUtils';

export const IndexedDB = {
  initialize: (apiDefinition: any) => {
    const IDB_DEFINITION = createIdbDef(apiDefinition);
    console.log('IDB_DEFINITION', IDB_DEFINITION);

    const DB_INFO = {
      name: apiDefinition.info.title,
      version: parseInt(apiDefinition.info.version.replace(/\./g, '')),
    };

    // @ts-ignore
    window.DB_INFO = DB_INFO;

    const dbRequest = indexedDB.open(DB_INFO.name, DB_INFO.version);

    return new Promise((resolve, reject) => {
      dbRequest.onsuccess = (e: any) => {
        const database = dbRequest.result;

        resolve(database);
      };

      dbRequest.onupgradeneeded = (e: any) => {
        const database = e.target.result;

        const objectStoreKeys = Object.keys(IDB_DEFINITION);
        for (let i = 0; i < objectStoreKeys.length; i++) {
          const objectStoreKey = objectStoreKeys[i];
          const objectStoreDef = IDB_DEFINITION[objectStoreKey];

          const objectStore = database.createObjectStore(objectStoreKey, {
            keyPath: objectStoreDef.key,
          });

          objectStore.createIndex('id', 'id', { unique: true });

          for (let j = 0; j < objectStoreDef.indexes.length; j++) {
            const indexKey = objectStoreDef.indexes[j];

            if (indexKey != 'id') {
              objectStore.createIndex(indexKey, indexKey, { unique: false });
            }
          }
        }
      };
    });
  },
  getDB: (name: string, version: number) => {
    return new Promise((resolve, reject) => {
      const dbRequest = indexedDB.open(name, version);

      dbRequest.onsuccess = (e: any) => {
        const database = dbRequest.result;

        resolve(database);
      };
    });
  },
  add: (database: IDBDatabase, name: string, data: object) => {
    const transaction = database.transaction([name], 'readwrite');
    const objectStore = transaction.objectStore(name);
    objectStore.add(data);
  },
  update: (database: IDBDatabase, name: string, data: object) => {
    const transaction = database.transaction([name], 'readwrite');
    const objectStore = transaction.objectStore(name);
    objectStore.put(data);
  },
  getLastKey: (database: IDBDatabase, name: string) => {
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([name], 'readonly');
      const objectStore = transaction.objectStore(name);
      const index = objectStore.index('id');
      var openCursorRequest = index.openCursor(null, 'prev');

      openCursorRequest.onsuccess = function (event: any) {
        let lastId = null;
        if (event.target && event.target.result) {
          lastId = event.target.result.value.id;
        }

        resolve(lastId);
      };
    });
  },
  findByFilters : (database: IDBDatabase, name: string, filters : object) => {
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([name], 'readonly');
      const objectStore = transaction.objectStore(name);

      const getAllRequest = objectStore.getAll();

      const checkFilters = (item : any, filters : any) => {
        let filterKeys = Object.keys(filters);
        for(let i = 0; i < filterKeys.length; i++){
          const filterKey = filterKeys[i];

          if(item[filterKey].toLowerCase().indexOf(filters[filterKey].toLowerCase()) == -1){
            return false;
          }
        }
        
        return true;
      } 

      getAllRequest.onsuccess = function (event: any) {
        let lastId = null;
        if (event.target && event.target.result) {
          resolve(event.target.result.filter((resultItem : any) => {
            return checkFilters(resultItem, filters);
          }));
        }

        resolve(lastId);
      };
    });
  }
};
