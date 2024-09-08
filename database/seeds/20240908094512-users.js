'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = Array(10).fill(0).map((_, i) => {
      const sex = ['female', 'male'][(Math.random() * 2) | 0]
      const name = faker.person.fullName({ sex });
      const emailVerifiedAt = [new Date(), null][(Math.random() * 2) | 0];
      return {
        name,
        email: faker.internet.email().toLowerCase(),
        email_verified_at: emailVerifiedAt,
        "password": "$2a$10$cu0RvcHAGsDzsiZj74GGJe99Q7oKqQufIQhpURnlfkVSYSoRHTbvW", // P@ssw0rd
      };
    })
    await queryInterface.bulkInsert('users', data, {}, { coordinate: { type: Sequelize.GEOMETRY('POINT') } });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
