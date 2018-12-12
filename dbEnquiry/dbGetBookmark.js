const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});

async function dbGetBookmark(userid){
    let addressId = await knex.select("address_id").from("bridge_users_address").where({user_id:userid});
    let addids =  addressId.map((u)=>{ return u.address_id })
    let arr = [];
    for (let addid of addids){
        let bookmark = await knex.select("id", "sRegion", "address", "actualArea", "actualPrice", "price").from("alladdress").where({id:addid})
        bookmark = bookmark.map((u)=>{
            let address = Object.values(u.address).filter((a)=>{return a.length > 0}).join(" , ")
            return {
                sRegion: u.sRegion,
                address: address,
                actualArea: u.actualArea,
                actualPrice: u.actualPrice,
                price: u.price
            }
        })
        arr.push(bookmark[0])
    }
    return arr
}

//dbGetBookmark(2).then((data)=>{console.log(data)})

module.exports = dbGetBookmark;