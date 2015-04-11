// module sytnax
import express from 'express';

// let variables
let app = express();

// fat arrow syntax
app.get('/', (req, res) => {
  res.send('Hello World!');
});

var server = app.listen(3000, () => {
  // destructuring
  let { address, port } = server.address();
  console.log('Example app listening at http://%s:%s', address, port);
});
