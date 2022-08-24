const express = require('express');

const app = new express();

app.all('/', (req,res) => {
    res.send('Bot is running!');
});

const keepAlive = () => {
    app.listen(3001, () => {
        console.log('Server is running!');
    })
};

module.exports = keepAlive;