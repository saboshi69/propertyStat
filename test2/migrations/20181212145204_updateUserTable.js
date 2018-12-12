
exports.up = function(knex, Promise) {
  return knex.schema.table("testusers", (table)=>{
      table.dropColumn("phone")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("testusers", (table)=>{
      table.integer("phone")
  })
};
