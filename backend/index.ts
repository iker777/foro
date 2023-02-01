// Lógica principal del proyecto
import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

// Database connection
const sequelize = new Sequelize("db_twitter", "twitter_admin", "", {
  host: "localhost",
  dialect: "mysql",
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
checkConnection();

// Create User model
  const User = sequelize.define("user", {
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

// Create tweet model
  const Tweet = sequelize.define("tweet", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

// Synchronize
sequelize
  .sync()
  .then(() => {
    console.log("User and Tweet table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });


// Create a server with express
const app = express();
const PORT = process.env.PORT || 3030;
  // Use cors to don't restring the requests 
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log("Okey!"))

// GET -> Devolver información
app.get("/", (req, res) =>{
  res.send("Hola Mundo");
});

// Register
app.post("/register", async(req, res) => {
  const { mail, passwordA, passwordB, username } = req.body;

  if( !mail || !passwordA || !passwordB || !username ){
    res.send({ text: `Some data is missing...` });
    return;
  }

  if(passwordA !== passwordB){
    res.send({ text: `Password didn't match...` });
    return;
  }
  const password = passwordA;
  let mailExists = await User.findOne({
    where: {
      mail: mail
    }
  });
  let usernameExists = await User.findOne({
    where: {
      username: username
    }
  });

  if(mailExists){
    res.send({newUserRegisted: false, text: `Email is already created`})
    return;
  }
  if(usernameExists){
    res.send({newUserRegisted: false, text: `Username is already created`})
    return;
  }

  await User.create({
    mail,
    username,
    password,
    name: "",
    bio: ""
  });

  const user = await User.findOne({
    where: {
      mail: mail
    }
  });
  res.send({newUserRegisted: true, user: user})
  return;
});

// LOGIN
app.post("/login", async(req, res) => {
  const { mail, password } = req.body;
  if(!mail || !password){
    res.send({error: true, text: "Data is missing..."})
    return;
  }
  const user = await User.findOne({
    where: {
      mail: mail
    }
  });
  if(!user){
    res.send({error: true, text: 'The user does not exist, please register'})
    return;
  }
  res.send({error: false, user: user});
});

// UPLOAD_USER
app.post("/uploadUser", async(req, res) => {
  const { mail, username, passwordA, passwordB, name, bio } = req.body;
  if (!mail || !username) {
    res.send({ error: true, text: "User is not logged..." });
    return;
  }
  if (passwordA !== passwordB) {
    res.send({ error: true, text: `Password didn't match...` });
    return;
  }
  const password = passwordA;
  if(password){
    await User.update({password}, {
      where: {
        mail: mail
      }
    })
  }
  if(name){
    await User.update({name}, {
      where: {
        mail: mail
      }
    })
  }
  if(bio){
    await User.update({bio}, {
      where: {
        mail: mail
      }
    })
  }
  const user = await User.findOne({
    where: {
      mail: mail
    }
  });
  res.send({ error: false, text:"Your information has been updated", userUpdated: user});
});

// DELETE ACCOUNT
app.post("/deleteAccount", async(req, res) => {
  const { mail, username } = req.body;
  if (!mail || !username) {
    res.send({ error: true, text: "User is not logged, you can't delete anything..." });
    return;
  }
  const user = await User.destroy({
    where: {
      mail: mail
    }
  });
  res.send({error:false, text: `You delete your account successfully!`})
})
