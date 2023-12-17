import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import FlowerRoute from "./routes/FlowerRoute.js";

dotenv.config();

const app = express();

// Set trust proxy for secure cookies behind a proxy
app.set('trust proxy', 1);

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async()=> { await db.sync(); } ) ();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // set to production if using https
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    }
}));


const origin = process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'http://localhost:3000';

app.use(cors({
    credentials: true,
    origin: origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(FlowerRoute);

// Root route handler
app.get('/', (req, res) => {
    res.send('Bungaku-API Built By CH2-PR618');
});

const port = process.env.APP_PORT || 3000;
app.listen(port, ()=> {
    console.log(`Bungaku-Api Berjalan Pada Port ${port}`);
});
