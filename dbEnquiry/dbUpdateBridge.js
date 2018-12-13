const knex = require("knex")({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

async function dbInsertBridge(addressid, userid){
    let obj = {
        address_id: addressid,
        user_id: userid
    }
    await knex("bridge_users_address").insert(obj)
    return true;
}

async function dbCheckBridge(addressid, userid){
    let result = await knex.select().from("bridge_users_address").where("address_id", addressid);
    let user_id = result.filter((u)=>{
        return u.user_id == userid
    })
    if (user_id.length > 0){
        return "done"
    } else {
        return "bad"
    }
}

//dbCheckBridge(120743, 2).then((data)=>{console.log (data)})

module.exports = {
    dbInsertBridge: dbInsertBridge,
    dbCheckBridge: dbCheckBridge
}