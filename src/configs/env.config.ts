import dotenv from "@dotenvx/dotenvx";

dotenv.config();

const environment = {
	...process.env,
};

export default environment;
