const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static(__dirname));

const FILES = {
    'FWmvQqXqYxLv.jpg': 'https://pnam.minamifukun.io.vn/FWmvQqXqYxLv.jpg',
    'FWmvQqXqYxLv.mp4': 'https://pnam.minamifukun.io.vn/FWmvQqXqYxLv.mp4'
};

app.get('/media/:filename', async (req, res) => {
    const url = FILES[req.params.filename];
    if (!url) return res.status(404).send('Not found');
    try {
        const r = await fetch(url);
        const buffer = await r.buffer();
        const base64 = buffer.toString('base64');
        res.send(`data:application/octet-stream;base64,${base64}`);
    } catch (err) {
        res.status(500).send('Error fetching file');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
