const express = require('express');
const cors = require('cors');
const path = require('path');
const { getFiles } = require('./utils/FileUtils');
const fs = require('fs-extra');

const app = express();
app.use(cors());

const port = 8081;

const getMock = (method, url) => {
  var mockData = null;

  try {
    mockData = require(require(`./mocks${url}/${method}.${extension}`));
  } catch (e) {
    console.log(e);
  }

  return mockData;
};

app.get('/modules', (req, res) => {
  const moduleDir = path.join(__dirname, 'mocks');
  const modules = [];

  fs.readdirSync(moduleDir).forEach((moduleName) => {
    const modulePath = path.join(moduleDir, moduleName);
    const moduleStat = fs.statSync(modulePath);

    if (moduleStat.isDirectory()) {
      const moduleFiles = fs.readdirSync(modulePath);
      moduleFiles.forEach((moduleFile) => {
        const moduleFilePath = path.join(modulePath, moduleFile);
        const moduleFileStat = fs.statSync(moduleFilePath);

        if (path.extname(moduleFilePath) === '.json') {
          modules.push({
            name: `${moduleName}-${path.basename(moduleFilePath, '.json')}`,
            path: `/${moduleName}/${path.basename(moduleFilePath, '.json')}`,
            type: 'screen',
          });
        }
      });
    }
  });

  res.json(modules);
});

app.get('/project', (req, res) => {
  // Leer el path pasado como parametro y devolver una respuesta
  const files = getFiles(path.join(req.query.path, 'src'), 'modules');

  res.header('Content-Type', 'application/json');
  res.end(JSON.stringify(files));
});

// Nueva ruta para leer el contenido de un archivo en particular
app.get('/file/:type/:component/:file', (req, res) => {
  const filePath = path.join(
    __dirname,
    '..',
    'src',
    req.params.type,
    req.params.component,
    req.params.file
  );

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
    } else {
      res.send(data);
    }
  });
});

app.all('*', (req, res) => {
  const mockData = getMock(req.method.toLowerCase(), req.originalUrl);

  if (mockData == null) {
    res.status(404);
    res.end();
    return;
  }

  res.send(getMock(req.method.toLowerCase(), req.originalUrl));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
