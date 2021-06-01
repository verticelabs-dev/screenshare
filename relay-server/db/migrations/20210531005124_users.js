exports.up = async (knex) => {
  await knex.schema.dropTableIfExists("users");
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username", 255).notNull().unique();
    table.string("password", 1000).notNull();
    table.string("email", 255).notNull().unique();
    table.string("first_name", 255).notNull();
    table.string("last_name", 255).notNull();
    table.string("full_name", 255).notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNull();
    table.timestamp("deleted_at");
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("users");
};
