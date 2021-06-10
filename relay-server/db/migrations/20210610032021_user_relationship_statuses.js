exports.up = async (knex) => {
  await knex.schema.dropTableIfExists("user_relationship_statuses");

  return knex.schema.createTable("user_relationship_statuses", (table) => {
    table.increments("id");
    table.string("name", 255).notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNull();
    table.timestamp("updated_at");
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("user_relationship_statuses");
};
