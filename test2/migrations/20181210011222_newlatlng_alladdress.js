exports.up = function(knex, Promise) {
    return knex.schema.table("alladdress", (table)=>{
        table.string("lat");
        table.string("lng")
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table("alladdress", (table)=>{
        table.dropColumn("lat");
        table.dropColumn("lng");
    })
  };