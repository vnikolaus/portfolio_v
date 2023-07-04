import app from './app';

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`API is running...   port: ${port}`);
  console.log(`Link: http://localhost:${port}/stocks`);
});
