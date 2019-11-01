require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const cors = require("cors");

app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.use(express.static("build"));

morgan.token("data", function(req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(morgan(":method :url :status :response-time ms  :data"));

const Person = require("./models/person");

app.get("/api/persons", (req, res) => {
  Person.find({}).then(pers => {
    res.json(pers.map(person => person.toJSON()));
  });
});

app.get("/info", (req, res) => {
  const date = new Date();
  const d = date.toString();
  Person.find({}).then(pers => {
    res.send(`<p>Phonebook has info for ${pers.length} people </p><p>${d}</p>`);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number
  });
  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson);
    })
    .catch(error => next(error));
  console.log(`added ${body.name} number ${body.number} to phonebook`);
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };
  Person.findByIdAndUpdate(request.params.id, person)
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(`person ${request.params.id} removed`);
      response.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
