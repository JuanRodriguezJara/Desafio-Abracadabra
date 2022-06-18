// Importando dependencias
const express = require("express");
const app = express();
const fs = require("fs/promises");

// 1. Crear un servidor
const PORT = 3000;

// 2. Definir “assets” como carpeta pública
app.use(express.static("assets"));

// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON
app.get("/abracadabra/usuarios", async (req, res) => {
  let users = JSON.parse(await fs.readFile("usuarios.json", "utf8"));
  res.send(users);
});

// 4. Crear un middleware para validar que el usuario recibido como parámetro “usuario” existe
app.use("/abracadabra/juego/:usuario", async (req, res, next) => {
  let usersData = JSON.parse(await fs.readFile("usuarios.json", "utf8"));
  let users = usersData.usuarios;
  // console.log("users:", users);
  let user = req.params.usuario;
  let findUser = users.find((data) => {
    if (data == user) {
      return true;
    }
  });
// Si es exitoso, permitir el paso a la ruta GET, de lo contrario devolver la imagen “who.jpeg”.
  findUser ? next() : res.sendFile(__dirname + "/assets/who.jpeg");
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 5. Crear una ruta que valide si el parámetro “n” coincide con el número generado de forma aleatoria.
app.get("/abracadabra/conejo/:numero", (req, res) => {
  let randomNumber = Math.floor(Math.random() * 4) + 1;
  let number = req.params.numero;
  randomNumber == number
// si es exitoso, devolver imagen del conejo, de lo contrario devolver imagen de Voldemort.
    ? res.sendFile(__dirname + "/assets/conejito.jpg")
    : res.sendFile(__dirname + "/assets/voldemort.jpg");
});

// Ruta por defecto
app.get("*", (req, res) => {
  res.send(`<center><h1>Esta página no existe</h1></center>
  <center><img src="https://http.cat/404" alt=""></center>`);
});

app.listen(PORT, () => {
  console.log("El servidor está inicializado en el puerto " + PORT);
});
