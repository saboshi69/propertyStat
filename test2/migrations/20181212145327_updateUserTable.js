
exports.up = function(knex, Promise) {
  return knex.schema.table("testusers", (table)=>{
      table.string("salary");
      table.string("phone");
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table("testusers", (table)=>{
        table.dropColumn("salary");
        table.dropColumn("phone")
    })
};
