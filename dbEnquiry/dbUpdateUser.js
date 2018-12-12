const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

async function updateUser(id, info) {

	
	
	//let userInfo = await knex('testusers').where('user_id', id);


	//if (userInfo.length > 0) {
		// await knex('testusers')
		// 	.where('id', id)
		// 	.update(cleanInfo);
	//} else {
	// 	await knex('testusers')
	// 		.insert({gender: info.gender,salary: info.salary, district_current: info.district_current });
	// }


}

module.exports = { updateUser };