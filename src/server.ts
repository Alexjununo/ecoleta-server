import express from 'express';

const app = express();

app.get('/users', (req, res) => res.json({ message: 'Hello batata' }));

app.listen(3333);
