// const { Sequelize } = require("sequelize");

// // Create connection between database and backend

// const sequelize = new Sequelize("db_twitter", "twitter_admin", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

// const checkConnection = async() => {
//   try {
//     await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }
checkConnection();

// module.exports = { sequelize };
// Lógica conexión de base de datos }

























  // El disconnect casi no lo utilizaremos... docker, prácticas antiguas..
  // const disconnect = () => { // Lógica de desconexión de base de datos }