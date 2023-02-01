"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Lógica principal del proyecto
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var sequelize_1 = require("sequelize");
// Database connection
var sequelize = new sequelize_1.Sequelize("db_twitter", "twitter_admin", "", {
    host: "localhost",
    dialect: "mysql",
});
var checkConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sequelize.authenticate()];
            case 1:
                _a.sent();
                console.log("Connection has been established successfully.");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Unable to connect to the database:", error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
checkConnection();
// Create User model
var User = sequelize.define("user", {
    mail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
// Create tweet model
var Tweet = sequelize.define("tweet", {
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
// Synchronize
sequelize
    .sync()
    .then(function () {
    console.log("User and Tweet table created successfully!");
})
    .catch(function (error) {
    console.error("Unable to create table : ", error);
});
// Create a server with express
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3030;
// Use cors to don't restring the requests 
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(PORT, function () { return console.log("Okey!"); });
// GET -> Devolver información
app.get("/", function (req, res) {
    res.send("Hola Mundo");
});
// Register
app.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mail, passwordA, passwordB, username, password, mailExists, usernameExists, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, mail = _a.mail, passwordA = _a.passwordA, passwordB = _a.passwordB, username = _a.username;
                if (!mail || !passwordA || !passwordB || !username) {
                    res.send({ text: "Some data is missing..." });
                    return [2 /*return*/];
                }
                if (passwordA !== passwordB) {
                    res.send({ text: "Password didn't match..." });
                    return [2 /*return*/];
                }
                password = passwordA;
                return [4 /*yield*/, User.findOne({
                        where: {
                            mail: mail
                        }
                    })];
            case 1:
                mailExists = _b.sent();
                return [4 /*yield*/, User.findOne({
                        where: {
                            username: username
                        }
                    })];
            case 2:
                usernameExists = _b.sent();
                if (mailExists) {
                    res.send({ newUserRegisted: false, text: "Email is already created" });
                    return [2 /*return*/];
                }
                if (usernameExists) {
                    res.send({ newUserRegisted: false, text: "Username is already created" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User.create({
                        mail: mail,
                        username: username,
                        password: password,
                        name: "",
                        bio: ""
                    })];
            case 3:
                _b.sent();
                return [4 /*yield*/, User.findOne({
                        where: {
                            mail: mail
                        }
                    })];
            case 4:
                user = _b.sent();
                res.send({ newUserRegisted: true, user: user });
                return [2 /*return*/];
        }
    });
}); });
// LOGIN
app.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mail, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, mail = _a.mail, password = _a.password;
                if (!mail || !password) {
                    res.send({ error: true, text: "Data is missing..." });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User.findOne({
                        where: {
                            mail: mail
                        }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.send({ error: true, text: 'The user does not exist, please register' });
                    return [2 /*return*/];
                }
                res.send({ error: false, user: user });
                return [2 /*return*/];
        }
    });
}); });
// UPLOAD_USER
app.post("/uploadUser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mail, username, passwordA, passwordB, name, bio, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, mail = _a.mail, username = _a.username, passwordA = _a.passwordA, passwordB = _a.passwordB, name = _a.name, bio = _a.bio;
                if (!mail || !username) {
                    res.send({ error: true, text: "User is not logged..." });
                    return [2 /*return*/];
                }
                if (passwordA !== passwordB) {
                    res.send({ error: true, text: "Password didn't match..." });
                    return [2 /*return*/];
                }
                password = passwordA;
                if (!password) return [3 /*break*/, 2];
                return [4 /*yield*/, User.update({ password: password }, {
                        where: {
                            mail: mail
                        }
                    })];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                if (!name) return [3 /*break*/, 4];
                return [4 /*yield*/, User.update({ name: name }, {
                        where: {
                            mail: mail
                        }
                    })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                if (!bio) return [3 /*break*/, 6];
                return [4 /*yield*/, User.update({ bio: bio }, {
                        where: {
                            mail: mail
                        }
                    })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, User.findOne({
                    where: {
                        mail: mail
                    }
                })];
            case 7:
                user = _b.sent();
                res.send({ error: false, text: "Your information has been updated", userUpdated: user });
                return [2 /*return*/];
        }
    });
}); });
// DELETE ACCOUNT
app.post("/deleteAccount", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mail, username, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, mail = _a.mail, username = _a.username;
                if (!mail || !username) {
                    res.send({ error: true, text: "User is not logged, you can't delete anything..." });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User.destroy({
                        where: {
                            mail: mail
                        }
                    })];
            case 1:
                user = _b.sent();
                res.send({ error: false, text: "You delete your account successfully!" });
                return [2 /*return*/];
        }
    });
}); });
