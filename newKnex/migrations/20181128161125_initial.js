exports.up = function(knex, Promise) {
  return knex.schema.createTable("testTable", (table)=>{
      table.increments();
      table.string("address");
      table.string("age");
      table.string("date");
      table.string("actualArea");
      table.string("grossArea");
      table.string("price");
      table.string("actualPrice");
      table.string("latlng");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("testTable")
};
