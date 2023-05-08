const express = require('express');
const cors = require('cors');
const path = require('path');
const { getFiles, getFilesComponents, getPath } = require('./utils/FileUtils');
const fs = require('fs-extra');

const app = express();
app.use(cors());
app.use(express.json());

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


app.get('/project', (req, res) => {
  // Leer el path pasado como parametro y devolver una respuesta
  const files = getFiles(path.join(req.query.path, 'src'), 'modules');

  res.header('Content-Type', 'application/json');
  res.end(JSON.stringify(files));
});

app.get('/components', (req, res) => {
  // Leer el path pasado como parametro y devolver una respuesta
  const files = getFilesComponents(path.join(req.query.path, 'src'), 'components');

  res.header('Content-Type', 'application/json');
  res.end(JSON.stringify(files));
});

app.get('/projectPath', (req, res) => {
  const path = getPath();
  res.send(path);
})

// Nueva ruta para leer el contenido de un archivo en particular
// Nueva ruta para leer el contenido de un archivo en particular
app.get('/file/:type/:component/:file', (req, res) => {
  const filePath = path.join(__dirname, '..', 'src', req.params.type, req.params.component, req.params.file);
  
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
    } else {
      res.send(data);
    }
  });
});

// Nueva ruta para guardar un archivo
app.post('/save-file', (req, res) => {
  const { filename, content } = req.body;
  const validExtensions = ['.js', '.tsx', '.ts', '.json', '.scss'];
  const fileExtension = path.extname(filename);

  if (!validExtensions.includes(fileExtension)) {
    res.status(400).send('Invalid file extension');
    return;
  }

  const folderName = path.basename(filename, fileExtension);
  const folderPath = path.join(__dirname, '..', 'src', 'components', folderName);
  const filePath = path.join(folderPath, filename);

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating folder');
    } else {
      fs.outputFile(filePath, content, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving file');
        } else {
          res.send('File saved successfully');
        }
      });
    }
  });
});

//Actualizar archivo
app.post('/update-file', (req, res) => {
  const { filename, content } = req.body;
  const validExtensions = ['.js', '.tsx', '.ts', '.json', '.scss'];
  const fileExtension = path.extname(filename);

  if (!validExtensions.includes(fileExtension)) {
    res.status(400).send('Invalid file extension');
    return;
  }

  const folderName = path.basename(filename, fileExtension);
  const folderPath = path.join(__dirname, '..', 'src', 'components', folderName);
  const filePath = path.join(folderPath, filename);

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating folder');
    } else {
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error updating file');
        } else {
          res.send('File updated successfully');
        }
      });
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
