import http from "http";
import fs from "fs";

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    return response.end("Hello from earth");
  } else if (request.url === "/methods") {
    return response.end("Hello to get method");
  }

  if (request.method === "POST") {
    return response.end("Hello to the post method");
  }

  if (request.method === "PUT") {
    return response.end("Hello to put method");
  }

  response.writeHead(404, "ERROR");
  return response.end("404 page not found");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
