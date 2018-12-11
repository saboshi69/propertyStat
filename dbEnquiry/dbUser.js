const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

async function getUser(id) {
	let result = await knex.select().from("testusers").where("id", id);
	return result;
}

module.exports = getUser;