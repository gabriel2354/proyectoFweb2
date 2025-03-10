const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Asegúrate de que esté apuntando al archivo db.json
const middlewares = jsonServer.defaults();

// Usamos json-server-auth para manejar la autenticación y encriptación
server.use(middlewares);
server.use(auth);  // Esta línea es crucial
server.use(router);

// Iniciamos el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('JSON Server is running');
});
