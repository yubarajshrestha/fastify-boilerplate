const { faker } = require("@faker-js/faker");
// const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, _Sequelize) {
		const users = [];
		for (let i = 0; i < 50; i++) {
			users.push({
				id: uuidv4(),
				name: faker.person.fullName(),
				username: faker.internet.username(),
				email: faker.internet.email(),
				email_verified_at: faker.datatype.boolean() ? new Date() : null,
			});
		}

		await queryInterface.bulkInsert("users", users, {});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
