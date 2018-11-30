
exports.up = function(knex, Promise) {
  return knex.schema.createTable("bridge_users_address", (table)=>{
      table.integer("user_id").unsigned;
      table.foreign("user_id").references("testusers.id");
      table.integer("address_id").unsigned();
      table.foreign("address_id").references("testntw.id")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("bridge_users_address")
};
