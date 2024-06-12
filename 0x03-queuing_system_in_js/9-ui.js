import kue from 'kue';
import express from 'express';

const app = express();
const port = 3000;

kue.app.listen(3000);
console.log(`Queue UI is running at http://localhost:${port}`);
