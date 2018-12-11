const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

async function updateUser(id, info) {
	// let result = await knex.select().from("testusers").where("id", id);
	// return result;

	await knex('testusers')
			.where('id', id)
			.update({
				email: info.email,
				username: info.username,
				phone: info.phone
			});
	
	let userInfo = await knex('testuser_info').where('user_id', id);


	if (userInfo.length > 0) {
		await knex('testuser_info')
			.where('user_id', id)
			.update({gender: info.gender, salary: info.salary, district_current: info.district_current });
	} else {
		await knex('testuser_info')
			.insert({user_id: id,gender: info.gender,salary: info.salary, district_current: info.district_current });
	}


}

module.exports = { updateUser };