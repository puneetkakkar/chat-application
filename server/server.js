const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '/../public');
const app = express();
var port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`server is up at port ${port}`);
});
