const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

let dummy = { email: '',
  username: '',
  phone: '',
  gender: 'Female',
  salary: '1000000',
  district_current: 'Diamond Hill' }

async function dbUpdateUser(id, data) {
	let x
	let cleanData = filterObj(data)
	let check = await knex.select("email", "username", "phone").from("testusers")
	.where("email", `${cleanData.email}`)
	.orWhere("email", `${cleanData.username}`)
	.orWhere("email", `${cleanData.phone}`)

	.orWhere("username", `${cleanData.email}`)
	.orWhere("username", `${cleanData.phone}`)
	.orWhere("username", `${cleanData.username}`)

	.orWhere("phone", `${cleanData.phone}`)
	
	if (check.length > 0){
		return "duplicated"
	} else if (check.length == 0) {
		await knex('testusers').update(cleanData).where("id", `${id}`)
		return "updated"
	}
}

// dbUpdateUser(2, dummy).then((data)=>{
//  	console.log (data)
//  })

function filterObj(obj){
	let keys = Object.keys(obj);
	for (let key of keys){
		if (obj[`${key}`].length == 0){
			delete obj[`${key}`]
		}
	}
	return obj
}

module.exports = dbUpdateUser;