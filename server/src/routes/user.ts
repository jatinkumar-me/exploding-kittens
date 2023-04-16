import express, { Request, Response } from "express";
import userRepository from "../models/User";

const router = express.Router();

router.get("/:userId", async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const repository = await userRepository;
		const user = await repository.fetch(userId);
		if (user) res.status(200).json(user);
		else throw new Error("user not found");
	} catch (error) {
		res.status(404).json({ msg: error });
	}
});

router.get("/", async (req: Request, res: Response) => {
	try {
		const repository = await userRepository;
		const users = await repository.search().sortDescending('score').returnAll();
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const { username } = req.body;
		const repository = await userRepository;
		const user = await repository.search().where('username').equalTo(username).returnFirst();
		if(user) {
			return res.status(200).json(user);
		}
		const newUser = await repository.createAndSave({
			username,
			score: 0,
			noOfGamesPlayed: 0,
		});
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.patch("/", async (req: Request, res: Response) => {
	try {
		const { entityId, score, noOfGamesPlayed } = req.body;
		const repository = await userRepository;
		const user = await repository.fetch(entityId);
		user.score = score;
		user.noOfGamesPlayed = noOfGamesPlayed;
		await repository.save(user);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error });
	}
});

export default router;
