import { Schema, Entity } from "redis-om";
import redisClient from "../redisClient";

class User extends Entity {
	username: string | undefined;
	score: number | undefined;
	noOfGamesPlayed: number | undefined;
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
	/* Uncomment this code for one time only. This will create indexes. */
	// await repository.createIndex();
	return repository;
};

export default createUserRepository();
