exports.up = function(knex, Promise) {
    return knex.schema.table("testTable", (table)=>{
        table.float("lat");
        table.float("lng");
        table.dropColumn("latlng")
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table("testTable", (table)=>{
        table.dropColumn("lat");
        table.dropColumn("lng");
        table.string("latlng");
    })
  };
  