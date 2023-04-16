import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/user";
import redisClient from "./redisClient";

/* CONFIG */
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("short"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ROUTES */
app.use("/users", userRoutes);

const port = process.env.PORT || 3000;

redisClient.then(() => {
	app.listen(port, () => {
		console.log("Server running on Port", port);
	});

}).catch((error) => {
	console.log("Didn't connect", error)
})
