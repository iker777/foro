import { sequelize } from "../../db/database";

// En este archivo defines la tabla de la base de datos. Cómo son sus campos
  // Ejemplo:
  const User = sequelize.define("user", {
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paswd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  export default User;