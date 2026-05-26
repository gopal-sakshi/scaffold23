const express = require('express');
const app = express();

app.get('/hello', (_req, res) => res.send('HalaMadrid from service24'));
app.get('/getData24', (_req, res) => {
    console.log("req received ");
    res.send({
        time23: new Date().toISOString(),
        players23: [ 'carlsen', 'gukesh', 'caruana' ]
    })
})
const port = 4044;
app.listen(port, () => console.log(`second-app PORTuuu == ${port}`));