
exports.up = function(knex, Promise) {
    return knex.schema.createTable("alladdress", (table)=>{
        table.increments();
        table.json("address");
        table.string("sRegion");
        table.string("bRegion");
        table.integer("age");
        table.date("date");
        table.integer("actualArea");
        table.integer("grossArea");
        table.float("price");
        table.integer("actualPrice");
        table.integer("grossPrice");
        table.float("lat");
        table.float("lng")
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("alladdress")
};
