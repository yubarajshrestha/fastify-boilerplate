const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		queryInterface.sequelize.options.logging = false;
		const userId = uuidv4();
		const users = [
			{
				id: userId,
				name: faker.person.fullName(),
				username: faker.internet.username(),
				email: "super@example.com",
				email_verified_at: new Date(),
			},
		];
		const userProfiles = [
			{
				user_id: userId,
				provider: "email",
				provider_identifier: bcrypt.hashSync("capslock", bcrypt.genSaltSync(10), null),
			},
		];

		await queryInterface.bulkInsert("users", users, {});
		await queryInterface.bulkInsert("credentials", userProfiles, {});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
		await queryInterface.bulkDelete("credentials", null, {});
	},
};
