
exports.up = function(knex, Promise) {
  return knex.schema.table("testusers", (table)=>{
      table.string("phone")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("testusers", (table)=>{
      table.dropColumn("phone")
  })
};
