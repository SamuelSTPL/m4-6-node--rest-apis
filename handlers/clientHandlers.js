const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

let accessAllClients = (req, res) => {
  return res.json(clients);
};

let accessSingleClient = (req, res) => {
  let id = req.params.id;
  let client = clients.find((client) => {
    return client.id == id;
  });
  return res.json({ status: 200, client });
};

let createNewClient = (req, res) => {
  let newClient = req.body;
  let isExistingUser = clients.some((client) => {
    return client.email == newClient.email;
  });
  if (!newClient) {
    return res.status(400).json("Fill the form");
  } else if (isExistingUser) {
    return res.status(400).json("User already created");
  } else {
    newClient.id = uuidv4();
    console.log(newClient);
    clients.push(req.body);
    return res.status(200).json({ status: 200, message: "Welcome aboard!" });
  }
};

let deleteClient = (req, res) => {
  let indexToDelete = clients.findIndex((client) => {
    return client.id === req.params.id;
  });
  clients.splice(indexToDelete, 1);
  return res.json("We are sorry to see you leave");
};

module.exports = {
  accessAllClients,
  accessSingleClient,
  createNewClient,
  deleteClient,
};
