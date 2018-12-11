const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

async function dbGetUser(id){
    let user = await knex.select("username", "email", "phone").from("testusers").where({id:id});
    return {
        ac: user[0].username,
        email: user[0].email,
        phone: user[0].phone
    }
}

module.exports = dbGetUser