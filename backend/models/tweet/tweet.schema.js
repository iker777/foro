import { sequelize } from "../../db/database";

// En este archivo defines la tabla de la base de datos. Cómo son sus campos
  // Ejemplo:
  const Tweet = sequelize.define("tweet", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  export default Tweet;