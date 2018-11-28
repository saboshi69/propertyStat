const fs = require("fs")
exports.seed = async function(knex, Promise) {

  let arr = [];
  await fs.readFile("../../getAddressID/test.json", "utf8", async (err, data)=>{
    if (err) console.log (err)
    let parsed = JSON.parse(data);
    console.log (parsed.length);
    let arr = []
    for (let i=0; i<3; i++){
        parsed[i].id = i+1
        await arr.push (parsed[i])
    }
})

  // Deletes ALL existing entries
  return knex('testTable').del()
    .then(function () {
      return knex('testTable').insert(arr);
    });
};
