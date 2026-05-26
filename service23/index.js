const express = require('express');
const app = express();
const podIp = process.env.POD_IP33 || 'not_running_in_k8s';
app.use(express.json());

/*************************************************************************** */
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',                     
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',      // make sure containers23-postgres45-1 is running
  database: process.env.DB_NAME || 'postgres',
  password: process.env.password || '1258'
});

/*************************************************************************** */

app.get('/hello', (_req, res) => res.send('HalaMadrid'));
app.get('/', (_req, res) => res.send('base path hit chesaavu baabai'));
app.get('/debug', (_req, res) => {
    console.log('logStream autundaa ===> ', Date.now());
    res.json({ status:"success", pod_ip: podIp, time23: new Date().toISOString() });
});

app.get('/db23', async (_req, res) => {
    const result = await pool.query('SELECT NOW() as current_time, version();');
    res.json({
      status: 'Connected to Postgres!',
      dbTime: result.rows[0].current_time,
      dbVersion: result.rows[0].version
    });
});

app.get('/call_service24', async (_req, res) => {
    const response = await fetch(`http://second-app-service-url23:4044/getData24`); // adjust '/data' to your specific sub-route
    const data = await response.json()
    console.log("resp23 ===> ", data );
    res.send(data);
})

const port = 3023;
app.listen(port, () => console.log(`node-app PORTU ==== ${port}`));