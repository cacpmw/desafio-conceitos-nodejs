const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4')

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const newRepository = request.body
  newRepository.likes = 0
  console.log(newRepository);
  newRepository.id = uuid()
  repositories.push(newRepository)
  return response.status(201).json(newRepository)

});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json()
  }
  const { title, url, techs } = request.body
  const likes = repositories[repositoryIndex].likes
  repositoryData = {
    id, title, url, techs, likes
  }
  repositories[repositoryIndex] = repositoryData
  return response.status(200).json(repositories[repositoryIndex])
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json()
  }
  repositories.splice(repositoryIndex, 1)
  return response.status(204).json({
    message: "Resource succesfully deleted"
  })
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json()
  }
  repositories[repositoryIndex].likes++
  return response.status(201).json(repositories[repositoryIndex])
});

module.exports = app;
