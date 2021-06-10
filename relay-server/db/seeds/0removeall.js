exports.seed = async function (knex) {
  await knex("users").del();
  await knex("user_relationship_statuses").del();
  await knex("user_relationships").del();
};
