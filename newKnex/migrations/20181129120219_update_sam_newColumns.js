exports.up = function(knex, Promise) {
    return knex.schema.table("testTable", (table)=>{
        table.string("sRegion");
        table.string("bRegion");
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table("testTable", (table)=>{
        table.dropColumn("sRegion");
        table.dropColumn("bRegion");
    })
  };
  