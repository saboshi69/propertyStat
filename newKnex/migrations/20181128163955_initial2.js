
exports.up = function(knex, Promise) {
  return knex.schema.table("testTable", (table)=>{
      table.string("grossPrice");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("testTable", (table)=>{
      table.dropColumn("grossPrice")
  })
};
