import express from "express";
import dotenv from "dotenv"
import passport from "passport";
import session from "express-session";
import path from "path"; // comes from node
import "./passport/github.auth.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.route.js";
import connectMongoDB from "./db/connectMongoDB.js";

console.log("Server is on.")

// configures path to env file
// used for environment variables - process.env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const __dirname = path.resolve();

// determines how long user can be logged in after inactivity
app.use(session(
    { 
        secret: "s0m3s0rTOf5EcR3T", 
        resave: false, 
        saveUninitialized: false 
    }
));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up middleware
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// where to find static files - web pages, audio, images
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// send everything from the folder above and render it to our page
// add it to DOM
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
    connectMongoDB();
});