const mongoose = require("mongoose");
const password = process.argv[2];

const url = `mongodb+srv://fullstack_antti:${password}@cluster0-o5ev5.mongodb.net/
Puh?retryWrites=true&w=majority`;
console.log(url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String
  },
  { collection: "person" }
);

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("wrong number of arguments");
  process.exit(1);
}
