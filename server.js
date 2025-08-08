const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

app.get('/media/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'private', req.params.filename);
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        const base64 = data.toString('base64');
        res.send(`data:application/octet-stream;base64,${base64}`);
    } else {
        res.status(404).send('Not found');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
