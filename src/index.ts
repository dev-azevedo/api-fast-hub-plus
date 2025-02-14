import app from './server';

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});