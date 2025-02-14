import app from './server.ts';

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});