const express = require('express');
const app = express();
const path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'));
})
app.use(express.static(path.join(__dirname, '/src')));

app.listen(3000, () => {
    console.log('listening on port 3000')
})
