module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'stocks',
    [
      {
        symbol: 'BBAS3',
        name: 'Banco do Brasil',
        price: 52.00,
        variation: 2.36848,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        symbol: 'SANB11',
        name: 'Santander Brasil',
        price: 31.00,
        variation: 1.5540,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        symbol: 'TRPL4',
        name: 'ISA CTEEP',
        price: 25.00,
        variation: -0.84845,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        symbol: 'KBLN11',
        name: 'Klabin S.A',
        price: 20.00,
        variation: -1.57842,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],

    {},
  ),

  down: () => {},
};

// npx sequelize seed:generate --name insert-stock  - Cria a nova seed
// npx sequelize db:seed:all  - realiza a função da seed
// npx sequelize db:migrate
// npx sequelize migration:create --name=nome
