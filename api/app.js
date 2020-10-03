import express from 'express';
import socketio from 'socket.io';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/public', express.static(path.join(__dirname, '../public')));

export const server = app.listen(PORT, () => process.stdout.write(`Server is running on http://localhost:${PORT}/api`));

const io = socketio(server);

io.use(async (socket, next) => {
//   ioMiddleware(socket);
  next();
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: res.send('<h1>Welcome to GitStart Project API</h1>'),
  });
});

app.use((req, res) => res.status(404).send({ status: 404, error: res.send('Route %s not found', req.url) }));

app.use((err, req, res) => res.status(500).send({ status: 500, error: res.send('server error') }));

export default app;
