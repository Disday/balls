import Express from 'express';

const app = new Express();
const dirPath = process.cwd();
const jsPath = `${dirPath}/js`;
console.log(dirPath);

app.use('/js', Express.static(jsPath));
app.get('/', function (request, response) {
  response.sendFile(`${dirPath}/index.html`);
});

const port = 443;
app.listen(port, () => {
  console.log(`Server was started on '${port}'`);
});
