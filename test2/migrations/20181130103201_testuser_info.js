
exports.up = function (knex, Promise) {
    return knex.schema.createTable("testuser_info", (table) => {
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("testusers.id");
        table.increments();
        table.string("gender");
        table.integer("salary");
        table.string("district_current");
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable("testuser_info")
};
