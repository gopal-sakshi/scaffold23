const express = require('express');
const app = express();
const podIp = process.env.POD_IP33 || 'not_running_in_k8s';

app.get('/hello', (_req, res) => res.send('HalaMadrid'));
app.get('/', (_req, res) => res.send('base path hit chesaavu baabai'));
app.get('/debug', (_req, res) => {
    console.log('logStream autundaa ===> ', Date.now());
    res.json({ status:"success", pod_ip: podIp, time23: new Date().toISOString() });
});

const port = 3000;
app.listen(port, () => console.log(`example app listening on port ${port}`));