const express = require('express');
const cors = require('cors');
const path = require('path');
const { getFiles } = require('./utils/FileUtils');

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
})

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
