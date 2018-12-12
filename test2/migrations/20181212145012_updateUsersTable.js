
exports.up = function(knex, Promise) {
    return knex.schema.table("testusers", (table)=>{
        table.dropColumn("salary");
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table("testusers", (table)=>{
        table.integer("salary");
    })
};
