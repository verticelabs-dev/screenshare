exports.seed = async function (knex) {
  return knex("user_relationship_statuses").insert([
    {
      name: "pending",
    },
    {
      name: "friends",
    },
    {
      name: "blocked",
    },
  ]);
};
