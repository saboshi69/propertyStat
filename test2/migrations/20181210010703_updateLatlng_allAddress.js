
exports.up = function(knex, Promise) {
    return knex.schema.table("alladdress", (table)=>{
        table.dropColumn("lat");
        table.dropColumn("lng")
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table("alladdress", (table)=>{
        table.float("lat");
        table.float("lng");
    })
  };
  