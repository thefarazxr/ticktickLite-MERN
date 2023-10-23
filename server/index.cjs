const express = require("express"); //simple, flexible Node.js Web App Backend Framework

const cors = require("cors"); 
//Cross-Origin Resource Sharing
// CORS defines a way for client web applications that are loaded in one domain 
//to interact with resources in a different domain.

const mongoose = require("mongoose");
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
// Mongoose makes it easier to interact with DB by avoiding many complexities.
const app = express();
const router = express.Router();
const port = 4000;

const ObjectId = require("mongoose").Types.ObjectId;


// MiddleWare setup using CORS to share data b/w different sources
// app.use(cors(
//   {
//     origin: "https://ticktick-lite-mern-gwms.vercel.app",
//     methods: "GET, POST",
//     credentials: true
//   }
// ));

const allowedOrigins = ['https://ticktick-lite-mern-gwms.vercel.app'];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//   })
// );

// app.options('*', cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // This allows requests from any origin.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// app.use(router);
app.use(express.json());


app.get("/", (req, res) =>{
  res.json("Hello");
}
)

// mongoose.connect("mongodb://127.0.0.1:27017/todo", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// setup MongoDB Atlast connection from server to DB
const MongoURI="mongodb+srv://lightninghermit:Merhaba123@cluster0.6jfk1j4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// MongoDB Schema for 2 collections: Users, ToDo
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});
const Todos = mongoose.model("Todos", todosSchema);


// for user registration, check if user is already registered else create!
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) {
    res.status(500);
    res.json({
      message: "user already exists",
    });
    return;
  }
  await User.create({ username, password });
  res.json({
    message: "success",
  });
});

// Simple Login auth code
app.post("/login", async (req, res) => {

  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid login",
    });
    return;
  }
  res.json({
    message: "success",
  });
});


// POST Request, ToDo List Authentication then => Create or Update based on existence of ToDo Object
app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }

  // Create or Update based on existence of ToDo Object
  const todos = await Todos.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});

// GET request to fetch all existing ToDo list Objects
app.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const result=await Todos.findOne({ userId: user._id }).exec();
  if(result)
  {
    const { todos } = result;
    res.json(todos);
  }
  else{
      console.log(`No document Todos found!`);
  }
});


// Starts express servers conncetion with the DB and communicates with it through the specified port
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

export default app;