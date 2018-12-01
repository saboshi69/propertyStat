
exports.up = function(knex, Promise) {
  return knex.schema.table("bridge_users_address", (table)=>{
      table.dropColumn("address_id")
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table("bridge_users_address", (table)=>{
        table.integer("address_id").unsigned();
      table.foreign("address_id").references("testntw.id")
    })
};
