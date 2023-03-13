const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 8081;

const getMock = (method, url) => {
  
  var mockData = null;

  try{
    mockData = require(`./mocks${url}/${method}.json`);
  }catch(e){
    console.log(e);
  }

  return mockData;
}

app.all('*', (req, res) => {
  const mockData = getMock(req.method.toLowerCase(), req.originalUrl);

  if(mockData == null){
    res.status(404);
    res.end();
    return;
  }

  res.send(getMock(req.method.toLowerCase(), req.originalUrl));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})