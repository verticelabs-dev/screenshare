exports.up = async (knex) => {
  await knex.schema.dropTableIfExists("user_relationships");

  return knex.schema.createTable("user_relationships", (table) => {
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNull();
    table.timestamp("updated_at");
    table.integer("status").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.integer("friend_id").unsigned().notNullable();

    table.foreign("status").references("user_relationship_statuses.id");
    table.foreign("user_id").references("users.id");
    table.foreign("friend_id").references("users.id");
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("user_relationships");
};
