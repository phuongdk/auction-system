const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;
const buildPath = path.join(__dirname, 'dist');

app.use(express.static(buildPath));

app.get('/health', (req, res) => {
  res.json('Server client is up and running...');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server client started on port ${port}`);
});
