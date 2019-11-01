import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css";

const Person = ({ person, del }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => del(person.name, person.id)}>delete</button>
    </p>
  );
};

const Filter = props => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input value={props.filter} onChange={props.handleFilterChange} />
      </div>
    </form>
  );
};

const PersonForm = props => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = props => {
  const rows = () =>
    props.filteredArray.map(person => (
      <Person key={person.name} person={person} del={props.del} />
    ));

  return <div>{rows()}</div>;
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);

  const filteredArray = persons.filter(value => {
    return value.name.toLowerCase().includes(filter.toLowerCase());
  });

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  const addPerson = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: null
    };

    const len = persons.filter(person => person.name === nameObject.name)
      .length;

    if (len === 0) {
      personService
        .create(nameObject)
        .then(response => {
          console.log("the response", response.data.id);
          nameObject.id = response.data.id;
          setPersons(persons.concat(nameObject));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${nameObject.name}`);

          setTimeout(() => {
            setMessage(null);
          }, 2000);
        })
        .catch(error => {
          console.log(error.response.data);
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 10000);
        });
    } else {
      const person = persons.find(p => p.name === nameObject.name);
      person.number = nameObject.number;
      console.log(person);

      if (
        window.confirm(`${nameObject.name} is already added to the phonebook,
             replace the old number with a new one?`)
      ) {
        personService.update(person.id, person).then(response => {
          console.log(response);

          setNewName("");
          setNewNumber("");

          setMessage(`Changed number of ${nameObject.name}`);

          setTimeout(() => {
            setMessage(null);
          }, 2000);
        });
      }
    }
  };

  const deletePerson = (name, id) => {
    console.log(persons);
    const newPersons = persons.filter(person => person.name !== name);

    if (window.confirm(`Delete ${name} ?`)) {
      console.log(id);
      personService
        .remove(id)
        .then(response => {
          console.log(response);
          setPersons(newPersons);

          setMessage(`Deleted ${name}`);

          setTimeout(() => {
            setMessage(null);
          }, 2000);
        })
        .catch(error => {
          console.log(error);
          setMessage(
            `Information of '${name}' has already been removed from server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(newPersons);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons filteredArray={filteredArray} del={deletePerson} />
    </div>
  );
};

export default App;
