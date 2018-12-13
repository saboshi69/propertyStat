const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

async function dbGetUser(id){
    let user = await knex.from("testusers").where({id:id});
    return user[0];
}

module.exports = dbGetUser