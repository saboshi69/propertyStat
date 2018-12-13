const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

async function dbIsExistUser(id){
    let user = await knex.from("testusers").where({username:id});
  
    return user[0] != undefined ;
}



module.exports = dbIsExistUser