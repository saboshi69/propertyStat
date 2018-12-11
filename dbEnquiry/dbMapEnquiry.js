//under construction
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "test2",
        user: "test2",
        password: "test2"
    }
});


async function dbMapEnquiry() {
    let result = await knex.select("sRegion", "address", "actualArea", "actualPrice", "lat", "lng").from("alladdress")
  

    let x = result[0]
    return x
}

dbMapEnquiry()
.then((c)=>console.log(c))







module.exports = dbMapEnquiry;
