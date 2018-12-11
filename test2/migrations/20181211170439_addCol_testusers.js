
exports.up = function(knex, Promise) {
  return knex.schema.table("testusers", (table)=>{
    table.string("gender");
    table.integer("salary");
    table.string("district_current");
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table("testusers", (table)=>{
        table.dropColumn("gender");
        table.dropColumn("salary");
        table.dropColumn("district_current");
      })
};
