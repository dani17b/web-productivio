const express = require('express');
const fs = require('fs');

const app = express();

app.get('/admin.tsx', (req, res) => {
  fs.readFile('C:\\Users\\enrique.jimenez\\Documents\\formaciónDani\\productivio\\web-productivio', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading file');
    }
    res.send(data);
  });
});

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
