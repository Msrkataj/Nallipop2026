const http = require("http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((request, response) => {
    handle(request, response);
  });

  server.listen(process.env.PORT || 3000);
});
