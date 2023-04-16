import { Schema, Entity } from "redis-om";
import redisClient from "../redisClient";

class User extends Entity {
	username: string | undefined;
	score: number | undefined;
	noOfGamesPlayed: number | undefined; // Add a property for noOfGamesPlayed
}

export const userSchema = new Schema(
	User,
	{
		username: { type: "string" },
		score: { type: "number", sortable: true },
		noOfGamesPlayed: { type: "number" },
	},
	{ dataStructure: "JSON" }
);

const createUserRepository = async () => {
	const client = await redisClient;
	const repository = client.fetchRepository(userSchema);
	// await repository.createIndex();
	return repository;
};

export default createUserRepository();
