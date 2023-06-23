// npx sequelize db:migrate

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('stocks', 'name', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // define se o campo é unico e não pode ser igual
  }),

  down: () => {},
};
