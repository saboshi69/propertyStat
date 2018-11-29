// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'chian',
      user: 'chian'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
